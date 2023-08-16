import { MatchType, AnnouncerTypes, SceneIds } from "./StoreInterfaces/MatchInfo";

export interface HyperBashMessage {
	type: string;
}

export interface AnnouncerLayout extends HyperBashMessage {
	message: AnnouncerTypes;
}

export interface ControlPointLayout extends HyperBashMessage {
	controllingTeam: number;
}

export interface CurrentlySpectatingLayout extends HyperBashMessage {
	playerID: number;
}

export interface DashUpdateLayout extends HyperBashMessage {
	playerID: number;
	dashAmount: number;
	hasDashUpgrade: boolean;

	isDashing: boolean;
	isSprinting: boolean;
	isFalling: boolean;
}

export interface DominationLayout extends HyperBashMessage {
	scores: number[];
	countDownTimer: number;
	isScoring: boolean;
}

export interface ErrorLayout extends HyperBashMessage {
	errorText: string;
}

export interface HealthUpdateLayout extends HyperBashMessage {
	playerID: number;
	health: number;
}

export interface KillFeedLayout extends HyperBashMessage {
	killer: number;
	victim: number;
	headShot: boolean;
	isAltFire: boolean;
	weaponType: number;
	killStreak: number;
}

export interface LoadoutUpdateLayout extends HyperBashMessage {
	playerID: number;
	leftHand: string;
	rightHand: string;
}

export interface MatchStartLayout extends HyperBashMessage {
	matchType: MatchType;
	redTeamName: string;
	blueTeamName: string;
	mapName: string;
}

export interface PayloadLayout extends HyperBashMessage {
	secondRound: boolean;
	checkPoint: boolean;
	cartBlockedByRed: boolean;
	amountBlueOnCart: number;
	precisePayloadDistance: number;
}

export interface PlayerJoinsLayout extends HyperBashMessage {
	name: string;
	clanTag: string;
	team: number;
	playerID: number;
	level: number;
	id: string;
}

export interface PlayerLeavesLayout extends HyperBashMessage {
	playerID: number;
}

export interface PlayerPositionLayout extends HyperBashMessage {
	rootTransform: number[];

	headPos: number[];
	headRot: number[];

	leftHandPos: number[];
	leftHandRot: number[];

	rightHandPos: number[];
	rightHandRot: number[];
}

export interface RespawnLayout extends HyperBashMessage {
	playerID: number;
}

export interface SceneChangeLayout extends HyperBashMessage {
	sceneIndex: SceneIds;
}

export interface ScoreboardLayout extends HyperBashMessage {
	kills: number[];
	deads: number[];
	scores: number[];
	pings: number[];
}

export interface StatusLayout extends HyperBashMessage {
	runStatus: string;
	currentScene: string;
}

export interface SwitchTeamLayout extends HyperBashMessage {
	playerID: number;
	team: number;
}

export interface TeamScoreLayout extends HyperBashMessage {
	blueTeam: number;
	redTeam: number;
}

export interface TimerLayout extends HyperBashMessage {
	time: number;
}

export interface VersionLayout extends HyperBashMessage {
	HyperBashVersion: string;
}
