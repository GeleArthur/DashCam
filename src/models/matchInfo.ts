export enum matchType {
	None,
	ControlPoint,
	Payload,
	Lobby,
	GameOver,
	Domination,
	Sandbox,
	Deathmatch,
	TutorialIntro,
	Ball,
	CaptureTheFlag,
	Elimination,
	TeamDeathmatch,
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

export interface controlPointInfo {
	TeamScoringPoints: teams;
}

export interface matchInfo {
	matchtype: matchType;
	mapname: mapName;
	timer: number;

	blueScore: number;
	redScore: number;

	blueTeamName: string;
	redTeamName: string;

	payload: payloadInfo;
	domination: dominationInfo;
	controlPoint: controlPointInfo;
}

export default matchInfo;
