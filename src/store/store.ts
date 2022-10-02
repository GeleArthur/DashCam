import { playerInfo } from "../models/playerInfo";
import { createStore, Store } from "vuex";
import { getImage } from "../Util/UtilFunctions";
import { payloadTrackingData } from "../models/HyperBashModels/payloadTrackingData";

import matchInfo, { mapName, matchType, teams } from "../models/matchInfo";
import playerJoins from "../models/HyperBashModels/playerJoins";
import playerPos from "../models/HyperBashModels/playerPos";
import LoadoutUpdate from "../models/HyperBashModels/LoadoutUpdate";
import killFeedData from "../models/HyperBashModels/killFeedData";
import { State } from "vue";
//import payloadTrackingData from "../models/HyperBashModels/payloadTrackingData";
//import payloadTrackingTeam0 from "../models/HyperBashModels/payloadTrackingData";
//import payloadTrackingTeam1 from "../models/HyperBashModels/payloadTrackingData";

export default createStore<State>({
	state: {
		connection: "Failed",
		selectedIndex: -1,
		PlayerData: [] as (playerInfo | undefined)[],
		matchInfo: {} as matchInfo,
		version: "",
		previousTime: 0
		//payloadTrackingData: {} as (payloadTrackingTeam0 | payloadTrackingTeam1),
		// payloadTrackBlueTime: [] as ( number )[],
		// payloadTrackRedTime: [] as ( number )[],
		// payloadTrackBlueProgress: [] as ( number )[],
		// payloadTrackRedProgress: [] as ( number )[]
	},
	mutations: {
		playerJoins(state, socketData: playerJoins) {
			state.PlayerData[socketData.playerID] = {
				playerID: socketData.playerID,
				name: socketData.name,
				clan: socketData.clanTag,
				team: socketData.team,
				leftWeapon: {
					imageSource: "./assets/gun-pistol.png",
					weaponName: "DefaultPistol",
				},
				rightWeapon: {
					imageSource: "./assets/gun-pistol.png",
					weaponName: "DefaultPistol",
				},
				health: 100,
				dash: 3,
				dashPickup: false,
				isDead: false,
				score: 0,
				deads: 0,
				kills: 0,
				ping: 0,

				feetPosition: { X: 0, Y: 0, Z: 0 },
				feetRotation: 0,
			};
			//localStorage.setItem("player joined: ", JSON.stringify(state.PlayerData[socketData.playerID]?.))
		},
		playerLeaves(state, socketData: any) {
			state.PlayerData[socketData.playerID] = undefined;
			//localStorage.setItem("player left: ", JSON.stringify(state.PlayerData[socketData.playerID]?.playerID))
		},


		loadoutUpdate(state, socketData: LoadoutUpdate) {
			state.PlayerData[socketData.playerID]!.leftWeapon = {
				imageSource: getImage(socketData.leftHand),
				weaponName: socketData.leftHand,
			};

			state.PlayerData[socketData.playerID]!.rightWeapon = {
				imageSource: getImage(socketData.rightHand),
				weaponName: socketData.rightHand,
			};
		},
		switchTeam(state, socketData: any) {
			state.PlayerData[socketData.playerID]!.team = socketData.team;
		},
		killFeed(state, socketData: killFeedData) {
			state.PlayerData[socketData.victim]!.isDead = true;		
			
			// gman added
			//localStorage.setItem(JSON.stringify(socketData), "killFeedData");
		},
		respawn(state, socketData: any) {
			state.PlayerData[socketData.playerID]!.isDead = false;
		},
		healthUpdate(state, socketData: any) {
			state.PlayerData[socketData.playerID]!.health = socketData.health;
		},
		CurrentlySpectating(state, socketData: any) {
			state.selectedIndex = socketData.playerID;
		},
		scoreboard(state, socketData: any) {
			for (let i = 0; i < state.PlayerData.length; i++) {
				if (state.PlayerData[i] != undefined) {
					state.PlayerData[i]!.deads = socketData.deads[i];
					state.PlayerData[i]!.kills = socketData.kills[i];
					state.PlayerData[i]!.score = socketData.scores[i];
				}
			}
		},
		playerPos(state, socketData: playerPos) {
			for (let i = 0; i < socketData.feetPos.length / 3; i++) {
				if (state.PlayerData[i] != undefined) {
					state.PlayerData[i]!.feetPosition = {
						X: socketData.feetPos[i * 3 + 0],
						Y: socketData.feetPos[i * 3 + 1],
						Z: socketData.feetPos[i * 3 + 2],
					};

					state.PlayerData[i]!.feetRotation = socketData.feetDirection[i];
				}
			}
		},
		status(state, socketData: any) {
			1 + 1;
		},
		dashUpdate(state, socketData: any) {
			if (state.PlayerData[socketData.playerID] != undefined) {
				state.PlayerData[socketData.playerID]!.dash = socketData.dashAmount;
				state.PlayerData[socketData.playerID]!.dashPickup =
					socketData.hasDashUpgrade;
			}
		},

		matchStart(state, socketData: any) {
			state.matchInfo.matchtype = socketData.matchType;
			state.matchInfo.mapname = socketData.mapName;
		},

		timer(state, socketData: any) {
			state.matchInfo.timer = socketData.time;			
			var shortNum = state.matchInfo.timer.toFixed(0)
			var timeNow = Number.parseInt(shortNum)
			
			// if (state.previousTime != timeNow){
			// 	state.previousTime = timeNow;
			// 	console.log(timeNow)
			// }
			// // gman added
			// if (state.matchInfo.payload.secondRound){
			// 	var shortNum = state.matchInfo.timer.toFixed(0)
			// 	//state.payloadTrackRedAll.push(Number.parseInt(shortNum), state.matchInfo.blueScore)
			// 	//localStorage.setItem("red time " + shortNum, JSON.stringify(state.matchInfo.blueScore));
			// 	state.payloadTrackRedTime.push(parseFloat(shortNum))
			// 	state.payloadTrackRedProgress.push(state.matchInfo.blueScore);
			// }
			// else {
			// 	var shortNum = state.matchInfo.timer.toFixed(0)
			// 	//state.payloadTrackBlueAll.push(Number.parseInt(shortNum), state.matchInfo.blueScore)
			// 	//localStorage.setItem("blue time " + shortNum, JSON.stringify(state.matchInfo.blueScore));
			// 	state.payloadTrackBlueTime.push(parseFloat(shortNum))
			// 	state.payloadTrackBlueProgress.push(state.matchInfo.blueScore);
			// }
		},

		teamScore(state, socketData: any) {
			state.matchInfo.blueScore = socketData.blueTeam;
			state.matchInfo.redScore = socketData.redTeam;
		},

		payload(state, socketData: any) {
			state.matchInfo.payload.amountBlueOnCart = socketData.amountBlueOnCart;
			state.matchInfo.payload.cartBlockedByRed = socketData.cartBlockedByRed;
			state.matchInfo.payload.checkPoint = socketData.checkPoint;
			state.matchInfo.payload.secondRound = socketData.secondRound;
		},
		domination(state, socketData: any) {
			state.matchInfo.domination.countDownTimer = socketData.countDownTimer;
			state.matchInfo.domination.pointA = socketData.scores[0];
			state.matchInfo.domination.pointB = socketData.scores[1];
			state.matchInfo.domination.pointC = socketData.scores[2];
			state.matchInfo.domination.teamCountDown = socketData.isScoring
				? socketData.scores[0]
				: teams.none;
		},

		controlPoint(state, socketData: any) {
			state.matchInfo.controlPoint.TeamScoringPoints = socketData.controllingTeam;
		},

		version(state, socketData: any) {
			console.log(`HyperBash: ${socketData.HyperBashVersion}`);
			state.version = socketData.HyperBashVersion;
		},

		// Will not be called by hyperBash
		init(state, payload) {
			for (let i = 0; i < 10; i++) {
				state.PlayerData[i] = undefined;
			}

			state.matchInfo.payload = {
				amountBlueOnCart: 0,
				cartBlockedByRed: false,
				checkPoint: false,
				secondRound: false,
			};

			state.matchInfo.domination = {
				countDownTimer: 0,
				teamCountDown: teams.none,
				pointA: teams.none,
				pointB: teams.none,
				pointC: teams.none,
			};

			state.matchInfo.controlPoint = {
				TeamScoringPoints: teams.none,
			};
		},

		changeConnection(state, connectionType) {
			state.connection = connectionType;
		},

		matchInfo(state, socketData: any) {
			state.matchInfo = {
				payload: {
					amountBlueOnCart: socketData.payload.amountBlueOnCart,
					cartBlockedByRed: socketData.payload.cartBlockedByRed,
					checkPoint: socketData.payload.checkPoint,
					secondRound: socketData.payload.secondRound,
				},
				domination: {
					countDownTimer: socketData.domination.countDownTimer,
					teamCountDown: socketData.domination.teamCountDown,
					pointA: socketData.domination.pointA,
					pointB: socketData.domination.pointB,
					pointC: socketData.domination.pointC,
				},
				controlPoint: {
					TeamScoringPoints: socketData.controlPoint.TeamScoringPoints,
				},
				blueScore: socketData.blueScore,
				redScore: socketData.redScore,
				mapname: mapName.lauchpad,
				matchtype: socketData.matchtype,
				timer: socketData.timer,
			};
		},
	},
	actions: {},
	modules: {},
	getters: {
		blueTeamName(state) {
			for (let i = 0; i < state.PlayerData.length; i++) {
				if (state.PlayerData[i] != undefined) {
					if (
						state.PlayerData[i]?.team == teams.blue &&
						state.PlayerData[i]?.clan != "" &&
						state.PlayerData[i]?.clan != "BOT"
					) {
						return state.PlayerData[i]?.clan;
					}
				}
			}

			return "Blue";
		},
		redTeamName(state) {
			for (let i = 0; i < state.PlayerData.length; i++) {
				if (state.PlayerData[i] != undefined) {
					if (
						state.PlayerData[i]?.team == teams.red &&
						state.PlayerData[i]?.clan != "" &&
						state.PlayerData[i]?.clan != "BOT"
					) {
						return state.PlayerData[i]?.clan;
					}
				}
			}

			return "Red";
		},
	},
});
