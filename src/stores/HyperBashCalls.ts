import {
	AnnouncerMessage,
	KillFeedMessage,
	LoadoutUpdateMessage,
	PlayerJoinsMessage,
	playerPositionMessage,
} from "@/interfaces/HyperBashMessages.interface";
import { Teams } from "@/interfaces/StoreInterfaces/MatchInfo";
import { getImage } from "@/Util/UtilFunctions";
import { useMatchStateStore } from "@/stores/MatchStateStore";

type storeType = ReturnType<typeof useMatchStateStore>;
let state: storeType;

export function initStore() {
	state = useMatchStateStore();
}

function playerJoins(socketData: PlayerJoinsMessage) {
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
		deads: 0,
		kills: 0,
		ping: 0,

		feetPosition: { X: 0, Y: 0, Z: 0 },
		feetRotation: 0,
	};
}

function playerLeaves(socketData: any) {
	state.PlayerData[socketData.playerID].isActive = false;
}

function switchTeam(socketData: any) {
	state.PlayerData[socketData.playerID].team = socketData.team;
}

function playerPos(socketData: playerPositionMessage) {
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

function respawn(socketData: any) {
	state.PlayerData[socketData.playerID].isDead = false;
}
function healthUpdate(socketData: any) {
	state.PlayerData[socketData.playerID].health = socketData.health;
}

function loadoutUpdate(socketData: LoadoutUpdateMessage) {
	state.PlayerData[socketData.playerID].leftWeapon = {
		imageSource: getImage(socketData.leftHand),
		weaponName: socketData.leftHand,
	};

	state.PlayerData[socketData.playerID].rightWeapon = {
		imageSource: getImage(socketData.rightHand),
		weaponName: socketData.rightHand,
	};
}

function dashUpdate(socketData: any) {
	if (state.PlayerData[socketData.playerID].isActive == true) {
		state.PlayerData[socketData.playerID].dash = socketData.dashAmount;
		state.PlayerData[socketData.playerID].dashPickup =
			socketData.hasDashUpgrade;
	}
}

function killFeed(socketData: KillFeedMessage) {
	state.PlayerData[socketData.victim].isDead = true;
}

function CurrentlySpectating(socketData: any) {
	state.SelectedPlayerIndex = socketData.playerID;
}

function scoreboard(socketData: any) {
	for (let i = 0; i < state.PlayerData.length; i++) {
		if (state.PlayerData[i].isActive == true) {
			state.PlayerData[i].deads = socketData.deads[i];
			state.PlayerData[i].kills = socketData.kills[i];
			state.PlayerData[i].score = socketData.scores[i];
		}
	}
}

function status(socketData: any) {}

function sceneChange(socketData: any) {}

function matchStart(socketData: any) {
	state.MatchInfo.matchType = socketData.matchType;
	state.MatchInfo.mapName = socketData.mapName;
}

function timer(socketData: any) {
	state.MatchInfo.timer = socketData.time;
}

function teamScore(socketData: any) {
	state.MatchInfo.blueScore = socketData.blueTeam;
	state.MatchInfo.redScore = socketData.redTeam;
}

function announcer(socketData: { type: string; message: AnnouncerMessage }) {}

function payload(socketData: any) {
	state.MatchInfo.payload.amountBlueOnCart = socketData.amountBlueOnCart;
	state.MatchInfo.payload.cartBlockedByRed = socketData.cartBlockedByRed;
	state.MatchInfo.payload.checkPoint = socketData.checkPoint;
	state.MatchInfo.payload.secondRound = socketData.secondRound;
	state.MatchInfo.payload.precisePayloadDistance =
		socketData.precisePayloadDistance;
}

function domination(socketData: any) {
	state.MatchInfo.domination.countDownTimer = socketData.countDownTimer;
	state.MatchInfo.domination.pointA = socketData.scores[0];
	state.MatchInfo.domination.pointB = socketData.scores[1];
	state.MatchInfo.domination.pointC = socketData.scores[2];
	state.MatchInfo.domination.teamCountDown = socketData.isScoring
		? socketData.scores[0]
		: Teams.none;
}

function controlPoint(socketData: any) {
	state.MatchInfo.controlPoint.TeamScoringPoints = socketData.controllingTeam;
}

function version(socketData: any) {
	console.log(`HyperBash: ${socketData.HyperBashVersion}`);
	// state.version = socketData.HyperBashVersion;
}

export let hyperBashCalls = {
	playerJoins,
	playerLeaves,
	switchTeam,
	playerPos,
	respawn,
	healthUpdate,
	loadoutUpdate,
	dashUpdate,
	killFeed,
	CurrentlySpectating,
	scoreboard,
	status,
	sceneChange,
	matchStart,
	timer,
	teamScore,
	announcer,
	payload,
	domination,
	controlPoint,
	version,
};
