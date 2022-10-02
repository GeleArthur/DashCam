<template>
	<div id="admin" v-if="$store.state.connection">
		<a>{{ $store.state.connection }}</a>
		<button @click="AddFakeData">Fake Data</button>
		<button @click="showHelp">Help</button>
		<button @click="switchTeam">switchTeams</button>
		<button @click="writeDataToLocalStorage">LocalStorage</button>
		<button @click="writeDataToLocalStorage">Save in Local Storage</button>
		<button @click="writeDataToLocalStorage">Write data to file</button>
	</div>

	<!-- <div id="PayloadTracker">
		<canvas id="myChart" width="400" height="400"></canvas>
    </div> -->
	<!-- <BarChart width="50" height="50" /> -->
	<layout />
	<instructions v-if="openHelp" />
	<versionCheck />
</template>

<!-- <a id='a' download='Download.csv' type='text'>Download CSV</a>
<script>
    var csv = 'Big json data';
    var data = new Blob([csv]);
    var a = document.getElementById('a');
    a.href = URL.createObjectURL(data);
</script> -->

<script lang="ts">
import { defineComponent } from "vue";
import { HOST, PORT } from "./Util/ConstVars";
import Player from "./components/Player.vue";
import { mapMutations } from "vuex";
import Layout from "./components/Layout.vue";
import playerJoins from "./models/HyperBashModels/playerJoins";
import { getRandomArbitrary, getRandomInt } from "./Util/UtilFunctions";
import { matchType } from "./models/matchInfo";
import Instructions from "./components/Instructions.vue";
import versionCheck from "./components/VersionCheck.vue";
import payloadTrackingData from "./models/HyperBashModels/payloadTrackingData";




export default defineComponent({
	name: "App",
	components: {
    Player,
    Layout,
    Instructions,
    versionCheck
	//BarChart,
	//testChart,
},
	data() {		
		return {
			openHelp: false,
			websocket: null as unknown as WebSocket,
			fakeDataInterval: 0,
			writeData: [],
			payloadTrackingData: {} as payloadTrackingData,
		};
	},
	methods: {
		updateData(data: string) {
			var socketData = JSON.parse(data);
			this.$store.commit(socketData.type, socketData);
		},
		writeDataToLocalStorage() {
			// single player data, one instance for each player
			for (let i = 0; i < this.$store.state.PlayerData.length; i++) 
			{
				if (this.$store.state.PlayerData[i] != undefined)
				{	
					localStorage.setItem(JSON.stringify(this.$store.state.PlayerData[i]), "playerData");
				}
			}		
			
			//localStorage.setItem("Blue data time: " + JSON.stringify(this.$store.state.payloadTrackBlueTime), JSON.stringify(this.$store.state.payloadTrackBlueProgress))			
			//localStorage.setItem("Red data time: " + JSON.stringify(this.$store.state.payloadTrackRedTime), JSON.stringify(this.$store.state.payloadTrackRedProgress))		

			// //only need one of these two blocks 
			// if (this.$store.state.payloadTrackBlueTime.length > 0){
			// 	if (this.$store.state.payloadTrackBlueProgress.length > 0){				
			// 		localStorage.setItem("blue data time values (arr), ", JSON.stringify(this.$store.state.payloadTrackBlueTime))
			// 		localStorage.setItem("blue data progress values (arr), ", JSON.stringify(this.$store.state.payloadTrackBlueProgress))
			// 	}
			// }
			// if (this.$store.state.payloadTrackRedTime.length > 0) { 
			// 	if (this.$store.state.payloadTrackRedProgress.length > 0){
			// 		localStorage.setItem("red data time values (arr), ", JSON.stringify(this.$store.state.payloadTrackRedTime))
			// 		localStorage.setItem("red data progress values (arr), ", JSON.stringify(this.$store.state.payloadTrackRedProgress))
			// 	}
			// }
		},

		showHelp() {
			this.openHelp = !this.openHelp;
		},
		switchTeam() {
			for (let i = 0; i < this.$store.state.PlayerData.length; i++) {
				if (this.$store.state.PlayerData[i] != null) {
					this.$store.commit("switchTeam", {
						playerID: i,
						team: !this.$store.state.PlayerData[i].team, // Invert
					});
				}
			}
		},

		AddFakeData() {
			clearInterval(this.fakeDataInterval);

			for (let i = this.$store.state.PlayerData.length - 1; i >= 0; i--) {
				this.$store.commit("playerLeaves", {
					playerID: i,
					type: "playerLeaves",
				});
			}

			var teams = ["TIMO", "BNDT", "LOOP", "THE", "NOOB", "VOX"];
			var redTeam = teams[Math.floor(Math.random() * teams.length)];
			teams.splice(teams.indexOf(redTeam), 1);
			var blueTeam = teams[Math.floor(Math.random() * teams.length)];

			for (let teamIndex = 0; teamIndex < 2; teamIndex++) {
				var currentTeam = teamIndex == 0 ? redTeam : blueTeam;

				for (let i = 0; i < 5; i++) {
					this.$store.commit("playerJoins", {
						type: "playerJoins",
						playerID: i + teamIndex * 5,
						name: Math.random().toString(16).substr(2, 16),
						clanTag: currentTeam,
						team: teamIndex,
						id: "3h5gf7vb65k4iuytfd7cv6b5",
						level: getRandomInt(0, 100),
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
			var matchtype = [1, 2, 5][Math.floor(Math.random() * 3)],
				redScore = getRandomInt(0, 3),
				blueScore = getRandomInt(0, 3);

			if (matchtype == matchType.Payload) {
				redScore = getRandomInt(0, 101);
				blueScore = getRandomInt(0, 101);
			} else if (matchtype == matchType.ControlPoint) {
				redScore = getRandomInt(0, 301);
				blueScore = getRandomInt(0, 301);
			}

			this.$store.commit("matchInfo", {
				timer: getRandomInt(60, 1500),
				blueScore: blueScore,
				redScore: redScore,
				controlPoint: {
					TeamScoringPoints: getRandomInt(1, 3),
				},
				domination: {
					countDownTimer: getRandomInt(0, 5),
					pointA: getRandomInt(0, 3),
					pointB: getRandomInt(0, 3),
					pointC: getRandomInt(0, 3),
					teamCountDown: getRandomInt(0, 3),
				},
				payload: {
					amountBlueOnCart: getRandomInt(0, 4),
					cartBlockedByRed: getRandomInt(0, 2),
					checkPoint: getRandomInt(0, 1),
					secondRound: getRandomInt(0, 1),
				},
				matchtype: matchtype,
			});

			this.$store.commit("CurrentlySpectating", {
				playerID: getRandomInt(0, 9),
				type: "CurrentlySpectating",
			});

			for (let i = 0; i < 2; i++) {
				this.$store.commit("killFeed", {
					victim: getRandomInt(0, 9),
				});
			}

			for (let i = 0; i < 10; i++) {
				if(this.$store.state.PlayerData[i] != null){
					var dashPickup = getRandomArbitrary(0, 1) > 0.5;
					this.$store.commit("dashUpdate", {
						type: "dashUpdate",
						playerID: i,
						dashAmount: getRandomArbitrary(0, dashPickup ? 5 : 3),
						dashPickUp: dashPickup,
					});

					this.$store.commit("healthUpdate", {
						type: "healthUpdate",
						playerID: i,
						health: getRandomArbitrary(0, 101),
					});
				}
			}

			this.fakeDataInterval = setInterval(() => {
				

				// let feetArray = [];
				// for (let i = 0; i < this.$store.state.PlayerData.length; i++) {
				// 	feetArray.push(
				// 		this.$store.state.PlayerData[i].feetPosition.X +
				// 			getRandomArbitrary(-1, 1)
				// 	);
				// 	feetArray.push(
				// 		this.$store.state.PlayerData[i].feetPosition.Y +
				// 			getRandomArbitrary(-1, 1)
				// 	);
				// 	feetArray.push(
				// 		this.$store.state.PlayerData[i].feetPosition.Z +
				// 			getRandomArbitrary(-1, 1)
				// 	);

				// 	var dash = this.$store.state.PlayerData[i].dash * .7;

				// 	// this.$store.commit("dashUpdate", {
				// 	// 	type:"dashUpdate",
				// 	// 	playerID:i,
				// 	// 	dashAmount: dash <= 0.5 ? (this.$store.state.PlayerData[i].dashPickup ? 5 : 3) : dash,
				// 	// 	dashPickUp: dashPickup
				// 	// })

				// 	// this.$store.commit("healthUpdate", {
				// 	// 	type:"healthUpdate",
				// 	// 	playerID:i,
				// 	// 	health: getRandomArbitrary(0, 101)
				// 	// })
				// }

				// this.$store.commit("playerPos", {
				// 	type: "playerPos",
				// 	feetDirection: [...Array(10).keys()].map(() => 0),
				// 	feetPos: feetArray,
				// } as playerPos);
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

			this.websocket = new WebSocket(`ws://${HOST}:${PORT}`);
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
	grid-template-columns: auto repeat(6, 100px) ;
	left: 0;
	padding: 1em;
	position: fixed;
	right: 0;
	z-index: 10;
	white-space: nowrap;
}
/* #PayloadTracker {
	background-color: rgba(255, 169, 169, 0.5);
	bottom: 0;
	color: #fff;
	display: grid;
	grid-template-columns: auto 100px 100px 100px;
	left: 0;
	padding: 1em;
	position: relative;
	right: 0;
	z-index: 10;
} */
body {
	background: rgba(100, 100, 100, 1);
	margin: 0px;
	padding: 0px;
}
</style>
