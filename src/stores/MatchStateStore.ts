import {
	MatchInfoType,
	MatchType,
	Teams,
} from "@/interfaces/StoreInterfaces/MatchInfo";
import {
	PlayerStateInfo,
	TeamInfo,
} from "@/interfaces/StoreInterfaces/StoreState";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useMatchStateStore = defineStore("matchState", () => {
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
			logo: "",
			logoFound: false,
		} as TeamInfo,
		blue: {
			name: "blue",
			logo: "",
			logoFound: false,
		} as TeamInfo,
	});

	const GetPlayers = computed(() => {
		const freezeState = useMatchStateFreezeStore();
		if(freezeState.showFreezeData) 
			return freezeState.PlayerData
		else 
			return PlayerData.value;
	});

	const GetSelectedPlayerIndex = computed(() => {
		return SelectedPlayerIndex.value;
	});

	const GetSelectedPlayer = computed(() => {
		return PlayerData.value[GetSelectedPlayerIndex.value];
	});

	const GetMatchInfo = computed(() => {
		const freezeState = useMatchStateFreezeStore();
		if(freezeState.showFreezeData) 
			return freezeState.MatchInfo
		else 
			return MatchInfo.value;
	});

	const GetTeamData = computed(()=>{
		const freezeState = useMatchStateFreezeStore();
		if(freezeState.showFreezeData) 
			return freezeState.TeamData
		else 
			return TeamData.value;
	})

	const GetOneVOne = computed(()=>{
		let playerArray = [] as PlayerStateInfo[] ;
		for (let i = 0; i < PlayerData.value.length; i++) {
			if(PlayerData.value[i].isActive){
				playerArray.push(PlayerData.value[i]);
			}
			if(playerArray.length > 2) break;
		}

		return playerArray;
	})

	function $reset() {
		SelectedPlayerIndex.value = -1;

		MatchInfo.value = {
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
		} ;

		TeamData.value = {
			red: {
				name: "red",
				logo: "",
				logoFound: false,
			},
			blue: {
				name: "blue",
				logo: "",
				logoFound: false,
			},
		};

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
				deaths: 0,
				kills: 0,
				killStreak: 0,
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
	}

	return {
		SelectedPlayerIndex,
		PlayerData,
		MatchInfo,
		TeamData,
		GetTeamData,
		GetPlayers,
		GetSelectedPlayerIndex,
		GetSelectedPlayer,
		GetMatchInfo,
		GetOneVOne,
		$reset,
	};
});


export const useMatchStateFreezeStore = defineStore("matchStateFreeze", () => {
	const showFreezeData = ref(false);
	const doWeHaveData = ref(false);
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
			logo: "",
			logoFound: false,
		} as TeamInfo,
		blue: {
			name: "blue",
			logo: "",
			logoFound: false,
		} as TeamInfo,
	});

	function $reset() {
		SelectedPlayerIndex.value = -1;

		MatchInfo.value = {
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
		} ;

		TeamData.value = {
			red: {
				name: "red",
				logo: "",
				logoFound: false,
			},
			blue: {
				name: "blue",
				logo: "",
				logoFound: false,
			},
		};

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
				deaths: 0,
				kills: 0,
				killStreak: 0,
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
	}

	return {
		showFreezeData,
		doWeHaveData,
		SelectedPlayerIndex,
		PlayerData,
		MatchInfo,
		TeamData,
		$reset,
	};
});

