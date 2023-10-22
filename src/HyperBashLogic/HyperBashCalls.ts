import {
	KillFeedLayout,
	LoadoutUpdateLayout,
	PlayerJoinsLayout,
	PlayerPositionLayout,
	SceneChangeLayout,
} from "@/interfaces/HyperBashMessages.interface";
import {
	AnnouncerTypes,
	MatchType,
	Teams,
} from "@/interfaces/StoreInterfaces/MatchInfo";
import { getImage } from "@/Util/UtilFunctions";
import {
	useMatchStateFreezeStore,
	useMatchStateStore,
} from "@/stores/MatchStateStore";
import { useSettingStore } from "../stores/SettingsStore";
import {
	EventAnnouncer,
	EventControlPoint,
	EventCurrentlySpectating,
	EventDashUpdate,
	EventDomination,
	EventHealthUpdate,
	EventKillFeed,
	EventLoadoutUpdate,
	EventMatchStart,
	EventPayload,
	EventPlayerJoins,
	EventPlayerLeaves,
	EventPlayerPosition,
	EventRespawn,
	EventSceneChange,
	EventScoreboard,
	EventSwitchTeam,
	EventTeamScore,
	EventTimer,
	EventVersion,
} from "./HyperBashEvents";
import cloneDeep from "lodash.clonedeep";

let state: ReturnType<typeof useMatchStateStore>;
let stateSettings: ReturnType<typeof useSettingStore>;
let freezeStore: ReturnType<typeof useMatchStateFreezeStore>;

export function initStore() {
	state = useMatchStateStore();
	stateSettings = useSettingStore();
	freezeStore = useMatchStateFreezeStore();
}

EventPlayerJoins.subscribe(playerJoins);

function playerJoins(socketData: PlayerJoinsLayout) {
	state.PlayerData[socketData.playerID] = {
		isActive: true,

		playerID: socketData.playerID,
		name: socketData.name,
		clan: socketData.clanTag,
		team: socketData.team,
		leftWeapon: {
			imageSource: "./assets/gun-pistol.png", // This doesn't work should be removed
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
		deaths: 0,
		kills: 0,
		killStreak: 0,
		ping: 0,

		feetPosition: { X: 0, Y: 0, Z: 0 },
		feetRotation: 0,
	};

	getClanName();
}

EventPlayerLeaves.subscribe(playerLeaves);

function playerLeaves(socketData: any) {
	state.PlayerData[socketData.playerID].isActive = false;
	getClanName();
}

EventSwitchTeam.subscribe(switchTeam);

function switchTeam(socketData: any) {
	state.PlayerData[socketData.playerID].team = socketData.team;
	getClanName();
}

function getClanName() {
	var redPlayers = state.PlayerData.filter((player) => {
		return (
			player.isActive &&
			player.team == Teams.red &&
			player.clan != "" &&
			player.clan != "BOT"
		);
	}).map((v) => v.clan);

	const redPlayersCount = {} as { [key: string]: number };
	let redMaxCount = 0;
	let redMaxString = "red";

	for (let i = 0; i < redPlayers.length; i++) {
		if (redPlayersCount[redPlayers[i]]) {
			redPlayersCount[redPlayers[i]]++;
		} else {
			redPlayersCount[redPlayers[i]] = 1;
		}

		if (redPlayersCount[redPlayers[i]] > redMaxCount) {
			redMaxCount = redPlayersCount[redPlayers[i]];
			redMaxString = redPlayers[i];
		}
	}

	if (state.TeamData.red.name != redMaxString) {
		state.TeamData.red.name = redMaxString;
	}

	var bluePlayers = state.PlayerData.filter((player) => {
		return (
			player.isActive &&
			player.team == Teams.blue &&
			player.clan != "" &&
			player.clan != "BOT"
		);
	}).map((e) => e.clan);

	const bluePlayersCount = {} as { [key: string]: number };
	let blueMaxCount = 0;
	let blueMaxString = "blue";

	for (let i = 0; i < bluePlayers.length; i++) {
		if (bluePlayersCount[bluePlayers[i]]) {
			bluePlayersCount[bluePlayers[i]]++;
		} else {
			bluePlayersCount[bluePlayers[i]] = 1;
		}

		if (bluePlayersCount[bluePlayers[i]] > blueMaxCount) {
			blueMaxCount = bluePlayersCount[bluePlayers[i]];
			blueMaxString = bluePlayers[i];
		}
	}

	if (state.TeamData.blue.name != blueMaxString) {
		state.TeamData.blue.name = blueMaxString;
	}
}

EventPlayerPosition.subscribe(playerPos);

function playerPos(socketData: PlayerPositionLayout) {
	for (let i = 0; i < socketData.headPos.length / 3; i++) {
		if (state.PlayerData[i].isActive == true) {
			state.PlayerData[i].feetPosition = {
				X: socketData.rootTransform[i * 3 + 0],
				Y: socketData.rootTransform[i * 3 + 1],
				Z: socketData.rootTransform[i * 3 + 2],
			};

			state.PlayerData[i].feetRotation = socketData.headRot[i + 1];
		}
	}
}

EventRespawn.subscribe(respawn);

function respawn(socketData: any) {
	state.PlayerData[socketData.playerID].isDead = false;
}

EventHealthUpdate.subscribe(healthUpdate);

function healthUpdate(socketData: any) {
	state.PlayerData[socketData.playerID].health = socketData.health;
}

EventLoadoutUpdate.subscribe(loadoutUpdate);

function loadoutUpdate(socketData: LoadoutUpdateLayout) {
	state.PlayerData[socketData.playerID].leftWeapon = {
		imageSource: getImage(socketData.leftHand),
		weaponName: socketData.leftHand,
	};

	state.PlayerData[socketData.playerID].rightWeapon = {
		imageSource: getImage(socketData.rightHand),
		weaponName: socketData.rightHand,
	};
}

EventDashUpdate.subscribe(dashUpdate);

function dashUpdate(socketData: any) {
	if (state.PlayerData[socketData.playerID].isActive == true) {
		state.PlayerData[socketData.playerID].dash = socketData.dashAmount;
		state.PlayerData[socketData.playerID].dashPickup =
			socketData.hasDashUpgrade;
	}
}

EventKillFeed.subscribe(killFeed);

function killFeed(socketData: KillFeedLayout) {
	state.PlayerData[socketData.victim].isDead = true;
}

EventCurrentlySpectating.subscribe(CurrentlySpectating);

function CurrentlySpectating(socketData: any) {
	state.SelectedPlayerIndex = socketData.playerID;
}

EventScoreboard.subscribe(scoreboard);

function scoreboard(socketData: any) {
	for (let i = 0; i < state.PlayerData.length; i++) {
		if (state.PlayerData[i].isActive == true) {
			state.PlayerData[i].deaths = socketData.deads[i];
			state.PlayerData[i].kills = socketData.kills[i];
			state.PlayerData[i].score = socketData.scores[i];
		}
	}
}

EventMatchStart.subscribe(matchStart);

function matchStart(socketData: any) {
	state.MatchInfo.matchType = socketData.matchType;
	state.MatchInfo.mapName = socketData.mapName;
}

EventTimer.subscribe(timer);

function timer(socketData: any) {
	state.MatchInfo.timer = socketData.time;
}

EventTeamScore.subscribe(teamScore);

function teamScore(socketData: any) {
	state.MatchInfo.blueScore = socketData.blueTeam;
	state.MatchInfo.redScore = socketData.redTeam;
}

EventPayload.subscribe(payload);

function payload(socketData: any) {
	state.MatchInfo.payload.amountBlueOnCart = socketData.amountBlueOnCart;
	state.MatchInfo.payload.cartBlockedByRed = socketData.cartBlockedByRed;
	state.MatchInfo.payload.checkPoint = socketData.checkPoint;
	state.MatchInfo.payload.secondRound = socketData.secondRound;
	state.MatchInfo.payload.precisePayloadDistance =
		socketData.precisePayloadDistance;
}

EventDomination.subscribe(domination);

function domination(socketData: any) {
	state.MatchInfo.domination.countDownTimer = socketData.countDownTimer;
	state.MatchInfo.domination.pointA = socketData.scores[0];
	state.MatchInfo.domination.pointB = socketData.scores[1];
	state.MatchInfo.domination.pointC = socketData.scores[2];
	state.MatchInfo.domination.teamCountDown = socketData.isScoring
		? socketData.scores[0]
		: Teams.none;
}

EventControlPoint.subscribe(controlPoint);

function controlPoint(socketData: any) {
	state.MatchInfo.controlPoint.TeamScoringPoints = socketData.controllingTeam;
}

EventVersion.subscribe(version);

function version(socketData: any) {
	console.log(`HyperBash: ${socketData.HyperBashVersion}`);
	stateSettings.Version = socketData.HyperBashVersion;
}

EventAnnouncer.subscribe((socketData) => {
	console.log(AnnouncerTypes[socketData.message]);
	if (state.MatchInfo.matchType == MatchType.Payload) {
		if (state.MatchInfo.payload.secondRound) {
			if (
				socketData.message == AnnouncerTypes.team_red_won ||
				socketData.message == AnnouncerTypes.team_blue_won
			) {
				SetupFreezeStore();
			}
		}
	} 
	else if (state.MatchInfo.matchType == MatchType.Domination) {
		if (
			socketData.message == AnnouncerTypes.team_red_won ||
			socketData.message == AnnouncerTypes.team_blue_won
		) {
			SetupFreezeStore();
		}
	} 
	else if (state.MatchInfo.matchType == MatchType.ControlPoint) {
		if (
			socketData.message == AnnouncerTypes.team_red_won ||
			socketData.message == AnnouncerTypes.team_blue_won ||
			socketData.message == AnnouncerTypes.match_tie
		) {
			SetupFreezeStore();
		}
	}
});

function SetupFreezeStore(){
	freezeStore.PlayerData = cloneDeep(state.PlayerData);
	freezeStore.MatchInfo = cloneDeep(state.MatchInfo);
	freezeStore.TeamData = cloneDeep(state.TeamData);
	freezeStore.MatchInfo.domination.teamCountDown = Teams.none;
	freezeStore.showFreezeData = true;
}

EventSceneChange.subscribe(cleanData);

function cleanData(socketData: SceneChangeLayout) {
	state.$reset();

	if (socketData.sceneIndex > 7) {
		freezeStore.showFreezeData = false;
	}
}
