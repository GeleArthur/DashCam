import { playerInfo } from "../models/playerInfo";
import { createStore } from "vuex";
import { getImage } from "../Util/UtilFunctions";

import matchInfo, { mapName, matchType, teams } from "../models/matchInfo";
import playerJoins from "../models/HyperBashModels/playerJoins";
import playerPos from "../models/HyperBashModels/playerPos";
import LoadoutUpdate from "../models/HyperBashModels/LoadoutUpdate";
import killFeedData from "../models/HyperBashModels/killFeedData";
import { State } from "vue";
import matchReplay from "@/models/matchReplay/matchReplay";
import settings from "@/models/settings";
import teamInfo from "@/models/teamInfo";

export default createStore<State>({
	state: {
		connection: "Failed",
		selectedIndex: -1,
		PlayerData: [] as playerInfo[],
		matchInfo: {} as matchInfo,
		version: "",
		matchReplayData: {} as matchReplay,
		matchReplayRaw: [],

		settings: {} as settings,
		teamData: { red: {} as teamInfo, blue: {} as teamInfo }
	},
	mutations: {
		playerJoins(state, socketData: playerJoins) {
			state.matchReplayRaw.push(socketData);
			state.PlayerData[socketData.playerID] = {
				isActive: true,

				playerID: socketData.playerID,
				name: socketData.name,
				clan: socketData.clanTag,
				team: socketData.team,
				leftWeapon: {
					imageSource: "./assets/gun-pistol.png", // This doesnt work should be removed
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
		},
		playerLeaves(state, socketData: any) {
			state.matchReplayRaw.push(socketData);
			state.PlayerData[socketData.playerID].isActive = false;
		},

		loadoutUpdate(state, socketData: LoadoutUpdate) {
			state.matchReplayRaw.push(socketData);
			state.PlayerData[socketData.playerID].leftWeapon = {
				imageSource: getImage(socketData.leftHand),
				weaponName: socketData.leftHand,
			};

			state.PlayerData[socketData.playerID].rightWeapon = {
				imageSource: getImage(socketData.rightHand),
				weaponName: socketData.rightHand,
			};
		},
		switchTeam(state, socketData: any) {
			state.matchReplayRaw.push(socketData);
			state.PlayerData[socketData.playerID].team = socketData.team;
		},
		killFeed(state, socketData: killFeedData) {
			state.matchReplayRaw.push(socketData);
			state.PlayerData[socketData.victim].isDead = true;
		},
		respawn(state, socketData: any) {
			state.matchReplayRaw.push(socketData);
			state.PlayerData[socketData.playerID].isDead = false;
		},
		healthUpdate(state, socketData: any) {
			state.matchReplayRaw.push(socketData);
			state.PlayerData[socketData.playerID].health = socketData.health;
		},
		CurrentlySpectating(state, socketData: any) {
			state.matchReplayRaw.push(socketData);
			state.selectedIndex = socketData.playerID;
		},
		scoreboard(state, socketData: any) {
			state.matchReplayRaw.push(socketData);
			for (let i = 0; i < state.PlayerData.length; i++) {
				if (state.PlayerData[i].isActive == true) {
					state.PlayerData[i].deads = socketData.deads[i];
					state.PlayerData[i].kills = socketData.kills[i];
					state.PlayerData[i].score = socketData.scores[i];
				}
			}
		},
		playerPos(state, socketData: playerPos) {
			state.matchReplayRaw.push(socketData);
			for (let i = 0; i < socketData.feetPos.length / 3; i++) {
				if (state.PlayerData[i].isActive == true) {
					state.PlayerData[i].feetPosition = {
						X: socketData.feetPos[i * 3 + 0],
						Y: socketData.feetPos[i * 3 + 1],
						Z: socketData.feetPos[i * 3 + 2],
					};

					state.PlayerData[i].feetRotation = socketData.feetDirection[i];
				}
			}
		},
		status(state, socketData: any) {
			state.matchReplayRaw.push(socketData);
		},
		dashUpdate(state, socketData: any) {
			state.matchReplayRaw.push(socketData);
			if (state.PlayerData[socketData.playerID].isActive == true) {
				state.PlayerData[socketData.playerID].dash = socketData.dashAmount;
				state.PlayerData[socketData.playerID].dashPickup =
					socketData.hasDashUpgrade;
			}
		},
		matchStart(state, socketData: any) {
			state.matchReplayRaw.push(socketData);
			state.matchInfo.matchtype = socketData.matchType;
			state.matchInfo.mapname = socketData.mapName;
		},

		timer(state, socketData: any) {
			state.matchReplayRaw.push(socketData);
			state.matchInfo.timer = socketData.time;
			console.log(socketData.time)
		},

		teamScore(state, socketData: any) {
			state.matchReplayRaw.push(socketData);
			state.matchInfo.blueScore = socketData.blueTeam;
			state.matchInfo.redScore = socketData.redTeam;
		},

		payload(state, socketData: any) {
			state.matchReplayRaw.push(socketData);
			state.matchInfo.payload.amountBlueOnCart = socketData.amountBlueOnCart;
			state.matchInfo.payload.cartBlockedByRed = socketData.cartBlockedByRed;
			state.matchInfo.payload.checkPoint = socketData.checkPoint;
			state.matchInfo.payload.secondRound = socketData.secondRound;
		},

		domination(state, socketData: any) {
			state.matchReplayRaw.push(socketData);
			state.matchInfo.domination.countDownTimer = socketData.countDownTimer;
			state.matchInfo.domination.pointA = socketData.scores[0];
			state.matchInfo.domination.pointB = socketData.scores[1];
			state.matchInfo.domination.pointC = socketData.scores[2];
			state.matchInfo.domination.teamCountDown = socketData.isScoring
				? socketData.scores[0]
				: teams.none;
		},

		controlPoint(state, socketData: any) {
			state.matchReplayRaw.push(socketData);
			state.matchInfo.controlPoint.TeamScoringPoints = socketData.controllingTeam;
		},

		version(state, socketData: any) {
			state.matchReplayRaw.push(socketData);
			console.log(`HyperBash: ${socketData.HyperBashVersion}`);
			state.version = socketData.HyperBashVersion;
		},

		// Will not be called by hyperBash
		init(state, payload) {
			for (let i = 0; i < 10; i++) {
				state.PlayerData[i] = {
					isActive: false,
					playerID: 0,
					name: "",
					clan: "",
					team: teams.none,
					leftWeapon: {
						imageSource: "",
						weaponName: ""
					},
					rightWeapon: {
						imageSource: "",
						weaponName: ""
					},
					health: 0,
					dash: 0,
					dashPickup: false,
					isDead: false,
					deads: 0,
					kills: 0,
					score: 0,
					ping: 0,
					feetPosition: {
						X: 0,
						Y: 0,
						Z: 0
					},
					feetRotation: 0
				};
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

			state.settings.iconMode = 0;
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

		settingsChangeIcon(state, teamIconSetting: number /*would use enum but vue :(*/) {
			state.settings.iconMode = teamIconSetting;
		},

		setCustomLogo(state, payload: { isRedTeam: boolean, imageURL: string }) {
			if (payload.isRedTeam) {
				state.settings.customRedIcon = payload.imageURL;
			} else {
				state.settings.customBlueIcon = payload.imageURL;
			}
		},

		setTeamData(state, payload: { isRedTeam: boolean, teamData: teamInfo }) {
			if (payload.isRedTeam) {
				state.teamData.red = payload.teamData;
			} else {
				state.teamData.blue = payload.teamData;
			}
		}
	},
	actions: {},
	modules: {},
	getters: {
		blueTeamName(state) {
			for (let i = 0; i < state.PlayerData.length; i++) {
				if (state.PlayerData[i].isActive == true) {
					if (
						state.PlayerData[i].team == teams.blue &&
						state.PlayerData[i].clan != "" &&
						state.PlayerData[i].clan != "BOT"
					) {
						return state.PlayerData[i].clan;
					}
				}
			}

			return "Blue";
		},
		redTeamName(state) {
			for (let i = 0; i < state.PlayerData.length; i++) {
				if (state.PlayerData[i].isActive == true) {
					if (
						state.PlayerData[i].team == teams.red &&
						state.PlayerData[i].clan != "" &&
						state.PlayerData[i].clan != "BOT"
					) {
						return state.PlayerData[i].clan;
					}
				}
			}

			return "Red";
		},
		getTeam: (state) => (team: teams) => {
			switch (team) {
				case teams.none:
					return undefined;
				case teams.red:
					return state.teamData.red;
				case teams.blue:
					return state.teamData.blue;
			}
		}
	},
});
