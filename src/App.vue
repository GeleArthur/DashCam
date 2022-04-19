<template>
	<div id="admin" v-if="$store.state.connection">
		<a>{{ $store.state.connection }}</a>
		<button @click="AddFakeData">Fake Data</button>
	</div>
	<player-layout />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { HOSt, PORT } from "./ConstVars";
import NewPlayerTab from "./components/NewPlayerTab.vue";
import { mapMutations } from "vuex";
import PlayerLayout from "./components/PlayerLayout.vue";
import playerJoins from "./models/HyperBashModels/playerJoins";
import playerPos from "./models/HyperBashModels/playerPos";
import { getRandomArbitrary, getRandomInt } from "./Util/GetImage";

export default defineComponent({
	name: "App",
	components: {
		NewPlayerTab,
		PlayerLayout,
	},
	data() {
		return {
			websocket: null as unknown as WebSocket,
			fakeDataInterval: 0,
		};
	},
	methods: {
		updateData(data: string) {
			var socketData = JSON.parse(data);
			this.$store.commit(socketData.type, socketData);
		},
		AddFakeData() {
			clearInterval(this.fakeDataInterval);
			
			for (let i = this.$store.state.PlayerData.length - 1; i >= 0; i--) {
				this.$store.commit("playerLeaves", {
					playerID: i,
					type: "playerLeaves",
				});
			}
			
			var teams = ['UNSC', 'D', 'ARC', 'F1R3', 'HHI', 'DARK'];
			
			for (let teamIndex = 0; teamIndex < 2; teamIndex++) {
				var team = teams[Math.floor(Math.random() * teams.length)];
				
				for (let i = 0; i < 5; i++) {
					this.$store.commit("playerJoins", {
						type: "playerJoins",
						playerID: i + teamIndex * 5,
						name: Math.random().toString(16).substr(2, 16),
						clanTag: team,
						team: teamIndex,
						id: "3h5gf7vb65k4iuytfd7cv6b5",
						level: getRandomInt(0,100),
					} as playerJoins);
				}
			}
			
			this.$store.commit("scoreboard", {
				type: "scoreboard",
				deads: [...Array(10).keys()].map(() => getRandomInt(0, 40)),
				kills: [...Array(10).keys()].map(() => getRandomInt(0, 40)),
				scores: [...Array(10).keys()].map(() => getRandomInt(0, 100000)),
			});
			
			// TODO needs to be like how the game will call it
			this.$store.commit("matchInfo", {
				timer: getRandomInt(1000, 9999)
			});
			
			this.$store.commit("CurrentlySpectating", {
				playerID: getRandomInt(0, 9),
				type: "CurrentlySpectating",
			});
			
			this.$store.commit("playerPos", {
				type: "playerPos",
				feetDirection: [...Array(10).keys()].map(() =>
					getRandomArbitrary(0, 360)
				),
				feetPos: [...Array(10 * 3).keys()].map(() =>
					getRandomArbitrary(-200, 200)
				),
			} as playerPos);
			
			for (let i = 0; i < 10; i++) {
				var dashPickup = getRandomArbitrary(0,1) > 0.5;
				
				this.$store.commit("dashUpdate", {
					type:"dashUpdate",
					playerID:i,
					dashAmount: getRandomArbitrary(0, (dashPickup ? 5 : 3)),
					dashPickUp: dashPickup
				})
				
				this.$store.commit("healthUpdate", {
					type:"healthUpdate",
					playerID:i,
					health: getRandomArbitrary(0, 101)
				})
			}
			
			this.fakeDataInterval = setInterval(() => {
				let feetArray = [];
				for (let i = 0; i < this.$store.state.PlayerData.length; i++) {
					feetArray.push(
						this.$store.state.PlayerData[i].feetPosition.X +
							getRandomArbitrary(-1, 1)
					);
					feetArray.push(
						this.$store.state.PlayerData[i].feetPosition.Y +
							getRandomArbitrary(-1, 1)
					);
					feetArray.push(
						this.$store.state.PlayerData[i].feetPosition.Z +
							getRandomArbitrary(-1, 1)
					);
					
					var dash = this.$store.state.PlayerData[i].dash * .7;
					
					// this.$store.commit("dashUpdate", {
					// 	type:"dashUpdate",
					// 	playerID:i,
					// 	dashAmount: dash <= 0.5 ? (this.$store.state.PlayerData[i].dashPickup ? 5 : 3) : dash,
					// 	dashPickUp: dashPickup
					// })
					
					// this.$store.commit("healthUpdate", {
					// 	type:"healthUpdate",
					// 	playerID:i,
					// 	health: getRandomArbitrary(0, 101)
					// })
				}
				
				this.$store.commit("playerPos", {
					type: "playerPos",
					feetDirection: [...Array(10).keys()].map(() => 0),
					feetPos: feetArray,
				} as playerPos);
			}, 10);

		},
		...mapMutations(["changeConnection"]),
	},
	mounted() {
		this.$store.commit("init");

		const StartWebSocket = () => {
			if (this.websocket != null) {
				this.websocket.removeEventListener("error", failed);
				this.websocket.removeEventListener("close", failed);
				this.websocket.removeEventListener("open", onConnected);
				this.websocket.removeEventListener("message", onMessage);
			}

			this.websocket = new WebSocket(`ws://${HOSt}:${PORT}`);
			this.changeConnection("Connecting");

			this.websocket.addEventListener("error", failed);
			this.websocket.addEventListener("close", failed);
			this.websocket.addEventListener("open", onConnected);
			this.websocket.addEventListener("message", onMessage);
		};

		document.body.onfocus = () => {
			if (this.websocket == null || this.websocket.readyState != 1)
				StartWebSocket();
		};

		const failed = () => {
			this.changeConnection("Failed. Enable websocket and restart HyperDash");
		};

		const onConnected = () => {
			this.changeConnection("");
		};

		const onMessage = (ev: MessageEvent<string>) => {
			this.updateData(ev.data);
		};

		StartWebSocket();
	},
});
</script>

<style>
#app {
	font-family: "Roboto", sans-serif;
}
#admin {
	background-color: rgba(0, 0, 0, 0.5);
	bottom: 0;
	color: #fff;
	display: grid;
	grid-template-columns: auto 100px;
	left: 0;
	padding: 1em;
	position: fixed;
	right: 0;
	z-index:10;
}
body {
	background: rgba(100, 100, 100, 1);
	margin: 0px;
	padding: 0px;
}
</style>
