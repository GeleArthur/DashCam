import { PlayerStateInfo, DashCamSettings, TeamInfo, WebsocketStatusTypes } from "@/interfaces/StoreInterfaces/StoreState";
import { createStore } from "vuex";

import { MatchInfoType, MatchType, Teams } from "@/interfaces/StoreInterfaces/MatchInfo";
import { State } from "vue";
import * as PlayerManagement from "@/store/HyperBashCalls/PlayerManagement";
import * as GameStateManagement from "./HyperBashCalls/GameStateManagement";
import * as InternalCalls from "./InternalCalls";
import { AnnouncerMessage } from "@/interfaces/HyperBashMessages.interface";

export default createStore<State>({
	state: {
		// WebsocketStatus: WebsocketStatusTypes.disconnected,
		selectedIndex: -1,
		PlayerData: [] as PlayerStateInfo[],
		matchInfo: {} as MatchInfoType,
		version: "",

		settings: {} as DashCamSettings,
		teamData: { red: {} as TeamInfo, blue: {} as TeamInfo },
	},
	mutations: {
		...PlayerManagement,
		...GameStateManagement,
		...InternalCalls,
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
