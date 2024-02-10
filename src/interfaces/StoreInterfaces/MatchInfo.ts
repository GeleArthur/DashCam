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
	specialCondition: SpecialCondition;
	mapName: string;
	timer: number;

	blueScore: number;
	redScore: number;

	payload: PayloadInfo;
	domination: DominationInfo;
	controlPoint: ControlPointInfo;
}

export enum AnnouncerTypes {
	match_1m_remaining = 0,
	match_countdown_1,
	match_countdown_2,
	match_countdown_3,
	match_countdown_4,
	match_countdown_5,
	match_countdown_6,
	match_countdown_7,
	match_countdown_8,
	match_countdown_9,
	match_countdown_10,
	match_start_321_go,
	mlg,
	team_blue_captured,
	team_blue_winning,
	team_blue_won,
	team_red_captured,
	team_red_winning,
	team_red_won,
	take_off_headset,
	match_end,
	match_tie,
	firstBlood,
	team_blue_scores_in,
	team_red_scores_in,
	countered,
	resetting_game,
	team_blue_captured_point_a,
	team_blue_captured_point_b,
	team_blue_captured_point_c,
	team_red_captured_point_a,
	team_red_captured_point_b,
	team_red_captured_point_c,
	matchpoint,
	team_blue_wins_in,
	team_red_wins_in,
	prepare_your_defences,
	prepare_to_start,
	checkpoint,
	switching_sides,
	overtime,
	team_blue_wins_round,
	team_red_wins_round,
	go,
	time_up,
	match_start_321,
	team_blue_scores,
	team_red_scores,
	dm_1_kill_remaining,
	dm_2_kills_remaining,
	dm_3_kills_remaining,
	dm_10_kills_remaining,
	dm_red_lead,
	dm_blue_lead,
	dm_yellow_lead,
	dm_green_lead,
	dm_purple_lead,
	dm_orange_lead,
	dm_black_lead,
	dm_white_lead,
	dm_cyan_lead,
	dm_pink_lead,
	dm_grey_lead,
	dm_red_wins,
	dm_blue_wins,
	dm_yellow_wins,
	dm_green_wins,
	dm_purple_wins,
	dm_orange_wins,
	dm_black_wins,
	dm_white_wins,
	dm_cyan_wins,
	dm_pink_wins,
	dm_grey_wins,
	suddendeath,
	el_2_points_red_win,
	el_3_points_red_win,
	el_2_points_blue_win,
	el_3_points_blue_win,
	el_2_points_win,
	el_3_points_win,
	el_match_point_red,
	el_match_point_blue,
	el_match_0,
	el_match_1,
	el_match_2,
	el_match_3,
	el_match_4,
	el_match_5,
	el_match_6,
	el_match_7,
	el_match_8,
	el_match_9,
	el_match_10,
	el_match_11,
	el_match_12,
	el_match_13,
	el_match_14,
	el_match_15,
	el_match_16,
	el_match_17,
	el_match_18,
	el_match_19,
	el_match_20,
	el_match_21,
	ctf_flag_stolen_red,
	ctf_flag_stolen_blue,
	ctf_flag_returned_red,
	ctf_flag_returned_blue,
	ctf_flag_dropped_red,
	ctf_flag_dropped_blue,
	el_ace,
}

export enum SpecialCondition{
	None,
	OneVOne
}