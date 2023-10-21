import {
	PlayerJoinsLayout,
	AnnouncerLayout,
	ControlPointLayout,
	CurrentlySpectatingLayout,
	DashUpdateLayout,
	DominationLayout,
	ErrorLayout,
	HealthUpdateLayout,
	KillFeedLayout,
	LoadoutUpdateLayout,
	MatchStartLayout,
	PayloadLayout,
	PlayerLeavesLayout,
	RespawnLayout,
	SceneChangeLayout,
	ScoreboardLayout,
	StatusLayout,
	SwitchTeamLayout,
	TeamScoreLayout,
	TimerLayout,
	VersionLayout,
    PlayerPositionLayout,
} from "@/interfaces/HyperBashMessages.interface";
import { HBEvent } from "@/Util/EventSystem";

const EventAnnouncer = new HBEvent<AnnouncerLayout>("announcer");
const EventControlPoint = new HBEvent<ControlPointLayout>("controlPoint");
const EventCurrentlySpectating = new HBEvent<CurrentlySpectatingLayout>("currentlySpectating");
const EventDashUpdate = new HBEvent<DashUpdateLayout>("dashUpdate");
const EventDomination = new HBEvent<DominationLayout>("domination");
const EventError = new HBEvent<ErrorLayout>("error");
const EventHealthUpdate = new HBEvent<HealthUpdateLayout>("healthUpdate");
const EventKillFeed = new HBEvent<KillFeedLayout>("killFeed");
const EventLoadoutUpdate = new HBEvent<LoadoutUpdateLayout>("loadoutUpdate");
const EventMatchStart = new HBEvent<MatchStartLayout>("matchStart");
const EventPayload = new HBEvent<PayloadLayout>("payload");
const EventPlayerJoins = new HBEvent<PlayerJoinsLayout>("playerJoins");
const EventPlayerLeaves = new HBEvent<PlayerLeavesLayout>("playerLeaves");
const EventPlayerPosition = new HBEvent<PlayerPositionLayout>("playerPos");
const EventRespawn = new HBEvent<RespawnLayout>("respawn");
const EventSceneChange = new HBEvent<SceneChangeLayout>("sceneChange");
const EventScoreboard = new HBEvent<ScoreboardLayout>("scoreboard");
const EventStatus = new HBEvent<StatusLayout>("status");
const EventSwitchTeam = new HBEvent<SwitchTeamLayout>("switchTeam");
const EventTeamScore = new HBEvent<TeamScoreLayout>("teamScore");
const EventTimer = new HBEvent<TimerLayout>("timer");
const EventVersion = new HBEvent<VersionLayout>("version");

export {
	EventAnnouncer,
	EventControlPoint,
	EventCurrentlySpectating,
	EventDashUpdate,
	EventDomination,
	EventError,
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
	EventStatus,
	EventSwitchTeam,
	EventTeamScore,
	EventTimer,
	EventVersion,
};
