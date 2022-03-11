<template>
	<div v-if="$store.state.connection">
		<a>{{ $store.state.connection }}</a>
		<button @click="AddFakeData">fakeData</button>
	</div>
	<div class="container">
		<mini-map />

		<div class="teamContainer">
			<div class="redTeam">
				<new-player-tab
					v-for="(item, index) in redTeamList"
					:key="index"
					:spectatorIndex="$store.state.PlayerData.indexOf(item)"
				/>
			</div>
			<div class="blueTeam">
				<new-player-tab
					v-for="(item, index) in blueTeamList"
					:key="index"
					:spectatorIndex="$store.state.PlayerData.indexOf(item)"
				/>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { HOSt, PORT } from "./ConstVars";
import NewPlayerTab from "./components/NewPlayerTab.vue";
import playerInfo from "./models/playerInfo";
import { mapMutations, mapState } from "vuex";
import MiniMap from "./components/MiniMap.vue";

export default defineComponent({
	name: "App",
	components: {
		NewPlayerTab,
		MiniMap,
	},
	data() {
		return {};
	},
	computed: mapState({
		redTeamList() {
			let data = this.$store.state.PlayerData as playerInfo[];
			return data.filter((e: playerInfo) => {
				return e.team == 0;
			});
		},
		blueTeamList() {
			let data = this.$store.state.PlayerData as playerInfo[];
			return data.filter((e: playerInfo) => {
				return e.team == 1;
			});
		},
	}),
	methods: {
		updateData(data: string) {
			var socketData = JSON.parse(data);
			this.$store.commit(socketData.type, socketData);
		},
		AddFakeData() {
			for (let teamIndex = 0; teamIndex < 2; teamIndex++) {
				for (let i = 0; i < 5; i++) {
					this.$store.commit("playerJoins", {
						specatorIndex: i + teamIndex * 5,
						name: Math.random().toString(16).substr(2, 16),
						clan: Math.random().toString(16).substr(2, 2),
						team: teamIndex,
						leftWeapon: {
							imageSource: "./assets/gun-pistol.png",
							weaponName: "pistol",
						},
						rightWeapon: {
							imageSource: "./assets/gun-pistol.png",
							weaponName: "pistol",
						},
						health: 100,
						dash: 100,
						isDead: false,
						deads: 42,
						kills: 69,
						score: 420,
						ping: 0,

						feetPosition: { X: 0, Y: 0, Z: 0 },
						feetRotation: 0,
					});
				}

				// state.matchInfo = {
				//   controllPoint: {
				//     TeamScoringPoints: teams.none,
				//     blueScore: 0,
				//     redScore: 0,
				//   },
				//   domination: {
				//     countDownTimer: 5,
				//     teamCountDown: teams.none,
				//     pointA: teams.none,
				//     pointB: teams.none,
				//     pointC: teams.none,
				//   },
				//   payload: {
				//     amountBlueOnCart: 0,
				//     blueTeamPercent: 0,
				//     cartBlockedByRed: false,
				//     checkPoint: false,
				//     redTeamPercent: 0,
				//     secondRound: false,
				//   },

				//   map: mapName.lobby,
				//   matchtype: matchType.lobby,
				//   timer: 99999
				// }
				this.$store.commit("CurrentlySpectating", 0);
			}
		},
		...mapMutations(["changeConnection"]),
	},
	mounted() {
		let ws: WebSocket;

		const StartWebSocket = () => {
			if (ws != null) {
				ws.removeEventListener("error", failed);
				ws.removeEventListener("close", failed);
				ws.removeEventListener("open", onConnected);
				ws.removeEventListener("message", onMessage);
			}

			ws = new WebSocket(`ws://${HOSt}:${PORT}`);
			this.changeConnection("Connecting");

			ws.addEventListener("error", failed);
			ws.addEventListener("close", failed);
			ws.addEventListener("open", onConnected);
			ws.addEventListener("message", onMessage);
		};

		document.body.onfocus = () => {
			if (ws == null || ws.readyState != 1) StartWebSocket();
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

<style scoped>
.blueTeam {
	justify-self: end;
}
.redTeam {
	justify-self: start;
}
.teamContainer {
	display: grid;
	grid-template-columns: auto auto;
}
</style>

<style>
#app {
	font-family: Arial;
}

body {
	margin: 0px;
	padding: 0px;
	background: rgba(100, 100, 100, 1);
}
</style>
