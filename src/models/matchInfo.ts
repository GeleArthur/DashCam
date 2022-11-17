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

export enum sceneIds {
	Boot = 0,
	Startup_Client = 1,
	Startup_Spectator = 2,
	Startup_Error = 3,
	MainMenu = 4,
	ReconnectToServer = 5,
	GameOver = 6,
	Lobby = 7,
	Payload_Orange_Art = 8,
	Payload_Blue_Art = 9,
	Domination_Grey = 10,
	Domination_Yellow = 11,
	Sandbox = 12,
	ControlPoint_Stadium = 13,
	Deathmatch_Teal_Art = 14,
	SandboxPerformance = 15,
	Tutorial_Intro = 16,
	CTF_Volcano = 17,
	Aim_Sahara = 18,
	Elimination_Lunar = 19,
	DeathMatch_Crater = 20,
	DeathMatch_Crater_Halloween = 21,
	Payload_Red = 22,
	BallMatch_Arena = 23,
}

//TODO Should reflect scene id
// export enum mapName {
// 	lobby,
// 	lauchpad,
// 	canyon,
// 	abyss,
// 	waterway,
// 	quarry,
// 	stadium,
// }

export enum teams {
	none = -1,
	red = 0,
	blue = 1,
}

export interface payloadInfo {
	secondRound: boolean;
	checkPoint: boolean;
	cartBlockedByRed: boolean;
	amountBlueOnCart: number;
	precisePayloadDistance: number;
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
	mapname: string;
	timer: number;

	blueScore: number;
	redScore: number;

	payload: payloadInfo;
	domination: dominationInfo;
	controlPoint: controlPointInfo;
}

export default matchInfo;
