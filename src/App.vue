<template>
	<!-- $store.state.WebsocketStatus == WebsocketStatusTypes.connected -->
	<div id="admin" v-if=ShouldDisplayDebugMenu>
		<a>{{ ConnectingMessage }}</a>
		<button @click="AddFakeData">Fake Data</button>
		<button @click="showHelp">Help</button>
		<button @click="switchTeam">switchTeams</button>
	</div>
	<layout />
	<instructions v-if="openHelp" />
	<versionCheck />
	<Settings />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { HOST, PORT } from "./Util/ConstVars";
import Player from "./components/Player.vue";
import { mapMutations } from "vuex";
import Layout from "./components/Layout.vue";
import { getRandomArbitrary, getRandomInt } from "./Util/UtilFunctions";
import { MatchType } from "@/interfaces/StoreInterfaces/MatchInfo";
import Instructions from "./components/Instructions.vue";
import versionCheck from "./components/VersionCheck.vue";
import Settings from "./components/Settings.vue";
import store from "./store/store";
import { PlayerJoinsMessage } from "./interfaces/HyperBashMessages.interface";
import { createWebsocketManager } from "@/WebsocketManager"
import { WebsocketStatusTypes } from "./interfaces/StoreInterfaces/StoreState";

export default defineComponent({
	name: "App",
	components: {
		Player,
		Layout,
		Instructions,
		versionCheck,
		Settings
	},
	data() {
		return {
			openHelp: false,
			fakeDataInterval: 0,
		};
	},
	methods: {
		showHelp() {
			this.openHelp = !this.openHelp;
		},
		switchTeam() {
			for (let i = 0; i < store.state.PlayerData.length; i++) {
				if (store.state.PlayerData[i].isActive) {
					store.commit("switchTeam", {
						playerID: i,
						team: !store.state.PlayerData[i].team, // Invert
					});
				}
			}
		},

		AddFakeData() {
			clearInterval(this.fakeDataInterval);

			for (let i = store.state.PlayerData.length - 1; i >= 0; i--) {
				store.commit("playerLeaves", {
					playerID: i,
					type: "playerLeaves",
				});
			}

			var teams = ["UNSC", "D", "ARC", "F1R3", "HHI", "DARK"];
			var redTeam = teams[Math.floor(Math.random() * teams.length)];
			teams.splice(teams.indexOf(redTeam), 1);
			var blueTeam = teams[Math.floor(Math.random() * teams.length)];

			for (let teamIndex = 0; teamIndex < 2; teamIndex++) {
				var currentTeam = teamIndex == 0 ? redTeam : blueTeam;

				for (let i = 0; i < 5; i++) {
					store.commit("playerJoins", {
						type: "playerJoins",
						playerID: i + teamIndex * 5,
						name: Math.random().toString(16).substr(2, 16),
						clanTag: currentTeam,
						team: teamIndex,
						id: "3h5gf7vb65k4iuytfd7cv6b5",
						level: getRandomInt(0, 100),
					} as PlayerJoinsMessage);
				}
			}

			store.commit("scoreboard", {
				type: "scoreboard",
				deads: [...Array(11).keys()].map(() => getRandomInt(0, 40)),
				kills: [...Array(11).keys()].map(() => getRandomInt(0, 40)),
				scores: [...Array(11).keys()].map(() => getRandomInt(0, 100000)),
			});

			// TODO needs to be like how the game will call it
			var matchTypeValue = [1, 2, 5][Math.floor(Math.random() * 3)],
				redScore = getRandomInt(0, 3),
				blueScore = getRandomInt(0, 3);

			if (matchTypeValue == MatchType.Payload) {
				redScore = getRandomInt(0, 101);
				blueScore = getRandomInt(0, 101);
			} else if (matchTypeValue == MatchType.ControlPoint) {
				redScore = getRandomInt(0, 301);
				blueScore = getRandomInt(0, 301);
			}

			store.commit("matchInfo", {
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
					precisePayloadDistance: getRandomArbitrary(0, 1),
				},
				matchtype: matchTypeValue,
			});

			store.commit("CurrentlySpectating", {
				playerID: getRandomInt(0, 9),
				type: "CurrentlySpectating",
			});

			for (let i = 0; i < 2; i++) {
				store.commit("killFeed", {
					victim: getRandomInt(0, 9),
				});
			}

			for (let i = 0; i < 11; i++) {
				if (store.state.PlayerData[i] != null) {
					var dashPickup = getRandomArbitrary(0, 1) > 0.5;
					store.commit("dashUpdate", {
						type: "dashUpdate",
						playerID: i,
						dashAmount: getRandomArbitrary(0, dashPickup ? 5 : 3),
						dashPickUp: dashPickup,
					});

					store.commit("healthUpdate", {
						type: "healthUpdate",
						playerID: i,
						health: getRandomArbitrary(0, 101),
					});
				}
			}

			this.fakeDataInterval = setInterval(() => {


				// let feetArray = [];
				// for (let i = 0; i < store.state.PlayerData.length; i++) {
				// 	feetArray.push(
				// 		store.state.PlayerData[i].feetPosition.X +
				// 			getRandomArbitrary(-1, 1)
				// 	);
				// 	feetArray.push(
				// 		store.state.PlayerData[i].feetPosition.Y +
				// 			getRandomArbitrary(-1, 1)
				// 	);
				// 	feetArray.push(
				// 		store.state.PlayerData[i].feetPosition.Z +
				// 			getRandomArbitrary(-1, 1)
				// 	);

				// 	var dash = store.state.PlayerData[i].dash * .7;

				// 	// store.commit("dashUpdate", {
				// 	// 	type:"dashUpdate",
				// 	// 	playerID:i,
				// 	// 	dashAmount: dash <= 0.5 ? (store.state.PlayerData[i].dashPickup ? 5 : 3) : dash,
				// 	// 	dashPickUp: dashPickup
				// 	// })

				// 	// store.commit("healthUpdate", {
				// 	// 	type:"healthUpdate",
				// 	// 	playerID:i,
				// 	// 	health: getRandomArbitrary(0, 101)
				// 	// })
				// }

				// store.commit("playerPos", {
				// 	type: "playerPos",
				// 	feetDirection: [...Array(10).keys()].map(() => 0),
				// 	feetPos: feetArray,
				// } as playerPos);
			}, 10);
		},
	},
	mounted() {
		store.commit("init");
		createWebsocketManager();
	},
	computed: {
		ConnectingMessage() {
			switch (store.state.WebsocketStatus) {
				case WebsocketStatusTypes.connected:
					return "";
				case WebsocketStatusTypes.connecting:
					return "Connecting";
				case WebsocketStatusTypes.disconnected:
					return "Failed. Enable websocket and restart HyperDash";

				default:
					return "Something broke????";
			}
		},
		ShouldDisplayDebugMenu() {
			return store.state.WebsocketStatus != WebsocketStatusTypes.connected;
		}
	}
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
	grid-template-columns: auto repeat(3, 100px);
	left: 0;
	padding: 1em;
	position: fixed;
	right: 0;
	z-index: 10;
	white-space: nowrap;
}

body {
	background: rgba(100, 100, 100, 1);
	margin: 0px;
	padding: 0px;
}
</style>
