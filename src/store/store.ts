import { PlayerStateInfo, DashCamSettings, TeamInfo } from "@/interfaces/StoreInterfaces/StoreState";
import { createStore } from "vuex";

import { MatchInfo, MatchType, Teams } from "@/interfaces/StoreInterfaces/MatchInfo";
import { State } from "vue";
import * as PlayerManagement from "@/store/HyperBashCalls/PlayerManagement";
import * as GameStateManagement from "./HyperBashCalls/GameStateManagement";
import { AnnouncerMessage } from "@/interfaces/HyperBashMessages.interface";

export default createStore<State>({
	state: {
		websocket: {} as WebSocket,
		connection: "Failed",
		selectedIndex: -1,
		PlayerData: [] as PlayerStateInfo[],
		matchInfo: {} as MatchInfo,
		version: "",

		settings: {} as DashCamSettings,
		teamData: { red: {} as TeamInfo, blue: {} as TeamInfo },
	},
	mutations: {
		...PlayerManagement,
		...GameStateManagement,

		dashUpdate(state, socketData: any) {
			if (state.PlayerData[socketData.playerID].isActive == true) {
				state.PlayerData[socketData.playerID].dash = socketData.dashAmount;
				state.PlayerData[socketData.playerID].dashPickup =
					socketData.hasDashUpgrade;
			}
		},
		matchStart(state, socketData: any) {
			state.matchInfo.matchType = socketData.matchType;
			state.matchInfo.mapName = socketData.mapName;
		},

		timer(state, socketData: any) {
			state.matchInfo.timer = socketData.time;
		},

		teamScore(state, socketData: any) {
			state.matchInfo.blueScore = socketData.blueTeam;
			state.matchInfo.redScore = socketData.redTeam;
		},

		announcer(
			state,
			socketData: { type: string; message: AnnouncerMessage }
		) {},

		payload(state, socketData: any) {
			state.matchInfo.payload.amountBlueOnCart = socketData.amountBlueOnCart;
			state.matchInfo.payload.cartBlockedByRed = socketData.cartBlockedByRed;
			state.matchInfo.payload.checkPoint = socketData.checkPoint;
			state.matchInfo.payload.secondRound = socketData.secondRound;
			state.matchInfo.payload.precisePayloadDistance =
				socketData.precisePayloadDistance;
		},

		domination(state, socketData: any) {
			state.matchInfo.domination.countDownTimer = socketData.countDownTimer;
			state.matchInfo.domination.pointA = socketData.scores[0];
			state.matchInfo.domination.pointB = socketData.scores[1];
			state.matchInfo.domination.pointC = socketData.scores[2];
			state.matchInfo.domination.teamCountDown = socketData.isScoring
				? socketData.scores[0]
				: Teams.none;
		},

		controlPoint(state, socketData: any) {
			state.matchInfo.controlPoint.TeamScoringPoints =
				socketData.controllingTeam;
		},

		version(state, socketData: any) {
			console.log(`HyperBash: ${socketData.HyperBashVersion}`);
			state.version = socketData.HyperBashVersion;
		},

		// Will not be called by hyperBash
		init(state, payload) {
			for (let i = 0; i < 11; i++) {
				state.PlayerData[i] = {
					isActive: false,
					playerID: 0,
					name: "",
					clan: "",
					team: Teams.none,
					leftWeapon: {
						imageSource: "",
						weaponName: "",
					},
					rightWeapon: {
						imageSource: "",
						weaponName: "",
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
						Z: 0,
					},
					feetRotation: 0,
				};
			}

			state.matchInfo = {
				payload: {
					amountBlueOnCart: 0,
					cartBlockedByRed: false,
					checkPoint: false,
					secondRound: false,
					precisePayloadDistance: 0,
				},
				domination: {
					countDownTimer: 0,
					teamCountDown: Teams.none,
					pointA: Teams.none,
					pointB: Teams.none,
					pointC: Teams.none,
				},
				controlPoint: {
					TeamScoringPoints: Teams.none,
				},
				blueScore: 0,
				redScore: 0,
				mapName: "",
				matchType: MatchType.None,
				timer: 0,
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
					precisePayloadDistance: socketData.payload.precisePayloadDistance,
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
				mapName: socketData.mapName,
				matchType: socketData.matchtype,
				timer: socketData.timer,
			};
		},

		settingsChangeIcon(
			state,
			teamIconSetting: number /*would use enum but vue :(*/
		) {
			state.settings.iconMode = teamIconSetting;
		},

		setCustomLogo(state, payload: { isRedTeam: boolean; imageURL: string }) {
			if (payload.isRedTeam) {
				state.settings.customRedIcon = payload.imageURL;
			} else {
				state.settings.customBlueIcon = payload.imageURL;
			}
		},

		setTeamData(state, payload: { isRedTeam: boolean; teamData: TeamInfo }) {
			if (payload.isRedTeam) {
				state.teamData.red = payload.teamData;
			} else {
				state.teamData.blue = payload.teamData;
			}
		},
	},
	actions: {},
	modules: {},
	getters: {
		blueTeamName(state) {
			for (let i = 0; i < state.PlayerData.length; i++) {
				if (state.PlayerData[i].isActive == true) {
					if (
						state.PlayerData[i].team == Teams.blue &&
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
						state.PlayerData[i].team == Teams.red &&
						state.PlayerData[i].clan != "" &&
						state.PlayerData[i].clan != "BOT"
					) {
						return state.PlayerData[i].clan;
					}
				}
			}

			return "Red";
		},
		getTeam: (state) => (team: Teams) => {
			switch (team) {
				case Teams.none:
					return undefined;
				case Teams.red:
					return state.teamData.red;
				case Teams.blue:
					return state.teamData.blue;
			}
		},
	},
});
