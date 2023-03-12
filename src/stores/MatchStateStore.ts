import {
	MatchInfoType,
	MatchType,
	Teams,
} from "@/interfaces/StoreInterfaces/MatchInfo";
import {
	DashCamSettings,
	PlayerStateInfo,
	TeamInfo,
	WebsocketStatusTypes,
} from "@/interfaces/StoreInterfaces/StoreState";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useMatchStateStore = defineStore("matchState", () => {
	const WebsocketStatus = ref(WebsocketStatusTypes.disconnected);

	const SelectedPlayerIndex = ref(-1);
	const PlayerData = ref([] as PlayerStateInfo[]);

	const MatchInfo = ref({
		matchType: MatchType.None,
		mapName: "",
		timer: 0,

		blueScore: 0,
		redScore: 0,

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
	} as MatchInfoType);

	const TeamData = ref({
		red: {
			name: "red",
			extrasFound: false,
			logo: "",
			logoFound: false,
			losses: 0,
			matches: 0,
			players: [],
			wins: 0,
		} as TeamInfo,
		blue: {
			name: "blue",
			extrasFound: false,
			logo: "",
			logoFound: false,
			losses: 0,
			matches: 0,
			players: [],
			wins: 0,
		} as TeamInfo,
	});

	for (let i = 0; i < 11; i++) {
		PlayerData.value[i] = {
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

	return {
		WebsocketStatus,
		SelectedPlayerIndex,
		PlayerData,
		MatchInfo,
		TeamData,
	};
});
