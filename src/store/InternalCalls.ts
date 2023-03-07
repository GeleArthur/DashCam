import { MatchType, Teams } from "@/interfaces/StoreInterfaces/MatchInfo";
import { TeamInfo, WebsocketStatusTypes } from "@/interfaces/StoreInterfaces/StoreState";
import { State } from "vue";

// Will not be called by hyperBash

export function init(state: State, payload: any) {
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
}

export function changeConnectionStatus(state: State, status: WebsocketStatusTypes) {
	state.WebsocketStatus = status;
}

export function matchInfo(state: State, socketData: any) {
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
}

export function settingsChangeIcon(
	state: State,
	teamIconSetting: number /*would use enum but vue :(*/
) {
	state.settings.iconMode = teamIconSetting;
}

export function setCustomLogo(
	state: State,
	payload: { isRedTeam: boolean; imageURL: string }
) {
	if (payload.isRedTeam) {
		state.settings.customRedIcon = payload.imageURL;
	} else {
		state.settings.customBlueIcon = payload.imageURL;
	}
}

export function setTeamData(
	state: State,
	payload: { isRedTeam: boolean; teamData: TeamInfo }
) {
	if (payload.isRedTeam) {
		state.teamData.red = payload.teamData;
	} else {
		state.teamData.blue = payload.teamData;
	}
}
