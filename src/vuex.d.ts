import { Store } from "vuex";
import { playerInfo } from "./models/playerInfo";
import { matchInfo } from "./models/matchInfo";
import payloadTrackingData from "./models/HyperBashModels/payloadTrackingData";
import matchReplay from "./models/matchReplay/matchReplay";
import settings from "./models/settings";
import teamInfo from "./models/teamInfo";

declare module "@vue/runtime-core" {
	// You have to declare your new values also here :)))))

	interface State {
		websocket: WebSocket;
		PlayerData: (playerInfo)[];
		connection: string;
		selectedIndex: number;
		matchInfo: matchInfo;
		version: string;

		matchReplayData: matchReplay;
		matchReplayRaw: any[];
		settings: settings;
		teamData:{red:teamInfo, blue:teamInfo}
	}

	interface ComponentCustomProperties {
		$store: Store<State>;
	}
}
