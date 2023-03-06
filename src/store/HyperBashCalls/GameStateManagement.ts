import {
	AnnouncerMessage,
	KillFeedMessage,
} from "@/interfaces/HyperBashMessages.interface";
import { Teams } from "@/interfaces/StoreInterfaces/MatchInfo";
import { State } from "vue";

export function killFeed(state: State, socketData: KillFeedMessage) {
	state.PlayerData[socketData.victim].isDead = true;
}

export function CurrentlySpectating(state: State, socketData: any) {
	state.selectedIndex = socketData.playerID;
}

export function scoreboard(state: State, socketData: any) {
	for (let i = 0; i < state.PlayerData.length; i++) {
		if (state.PlayerData[i].isActive == true) {
			state.PlayerData[i].deads = socketData.deads[i];
			state.PlayerData[i].kills = socketData.kills[i];
			state.PlayerData[i].score = socketData.scores[i];
		}
	}
}

export function status(state: State, socketData: any) {}

export function sceneChange(state: State, socketData: any) {}

export function matchStart(state: State, socketData: any) {
	state.matchInfo.matchType = socketData.matchType;
	state.matchInfo.mapName = socketData.mapName;
}

export function timer(state: State, socketData: any) {
	state.matchInfo.timer = socketData.time;
}

export function teamScore(state: State, socketData: any) {
	state.matchInfo.blueScore = socketData.blueTeam;
	state.matchInfo.redScore = socketData.redTeam;
}

export function announcer(
	state: State,
	socketData: { type: string; message: AnnouncerMessage }
) {}

export function payload(state: State, socketData: any) {
	state.matchInfo.payload.amountBlueOnCart = socketData.amountBlueOnCart;
	state.matchInfo.payload.cartBlockedByRed = socketData.cartBlockedByRed;
	state.matchInfo.payload.checkPoint = socketData.checkPoint;
	state.matchInfo.payload.secondRound = socketData.secondRound;
	state.matchInfo.payload.precisePayloadDistance =
		socketData.precisePayloadDistance;
}

export function domination(state: State, socketData: any) {
	state.matchInfo.domination.countDownTimer = socketData.countDownTimer;
	state.matchInfo.domination.pointA = socketData.scores[0];
	state.matchInfo.domination.pointB = socketData.scores[1];
	state.matchInfo.domination.pointC = socketData.scores[2];
	state.matchInfo.domination.teamCountDown = socketData.isScoring
		? socketData.scores[0]
		: Teams.none;
}

export function controlPoint(state: State, socketData: any) {
	state.matchInfo.controlPoint.TeamScoringPoints =
		socketData.controllingTeam;
}

export function version(state: State, socketData: any) {
	console.log(`HyperBash: ${socketData.HyperBashVersion}`);
	state.version = socketData.HyperBashVersion;
}
