export enum MatchType {
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

export enum SceneIds {
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

export enum Teams {
	none = -1,
	red = 0,
	blue = 1,
}

export interface PayloadInfo {
	secondRound: boolean;
	checkPoint: boolean;
	cartBlockedByRed: boolean;
	amountBlueOnCart: number;
	precisePayloadDistance: number;
}

export interface DominationInfo {
	pointA: Teams;
	pointB: Teams;
	pointC: Teams;
	teamCountDown: Teams;
	countDownTimer: Number;
}

export interface ControlPointInfo {
	TeamScoringPoints: Teams;
}

export interface MatchInfoType {
	matchType: MatchType;
	mapName: string;
	timer: number;

	blueScore: number;
	redScore: number;

	payload: PayloadInfo;
	domination: DominationInfo;
	controlPoint: ControlPointInfo;
}
