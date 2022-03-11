export enum matchType {
	lobby,
	payload,
	domination,
	controllPoint,
}

export enum mapName {
	lobby,
	lauchpad,
	canyon,
	abyss,
	waterway,
	quarry,
	stadium,
}

export enum teams {
	none,
	blue,
	red,
}

export interface payloadInfo {
	blueTeamPercent: number;
	redTeamPercent: number;
	secondRound: boolean;
	checkPoint: boolean;
	cartBlockedByRed: boolean;
	amountBlueOnCart: number;
}

export interface dominationInfo {
	pointA: teams;
	pointB: teams;
	pointC: teams;
	teamCountDown: teams;
	countDownTimer: Number;
}

export interface controllPointInfo {
	TeamScoringPoints: teams;
	blueScore: number;
	redScore: number;
}

export interface matchInfo {
	matchtype: matchType;
	map: mapName;
	timer: number;

	payload: payloadInfo;
	domination: dominationInfo;
	controllPoint: controllPointInfo;
}

export default matchInfo;
