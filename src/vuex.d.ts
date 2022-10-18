import { Store } from "vuex";
import { playerInfo } from "./models/playerInfo";
import { matchInfo } from "./models/matchInfo";
import payloadTrackingData from "./models/HyperBashModels/payloadTrackingData";
import matchReplay from "./models/matchReplay/matchReplay";
import settings from "./models/settings";

declare module "@vue/runtime-core" {
	// You have to declare your new values also here :)))))

	interface State {
		PlayerData: (playerInfo)[]; //There should be an isactive bool
		connection: string;
		selectedIndex: number;
		matchInfo: matchInfo;
		version: string;

		matchReplayData: matchReplay;
		settings: settings;
		teamData:{red:teamInfo, blue:teamInfo}
	}

	interface ComponentCustomProperties {
		$store: Store<State>;
	}
}
