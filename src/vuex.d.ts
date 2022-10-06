import { Store } from "vuex";
import { playerInfo } from "./models/playerInfo";
import { matchInfo } from "./models/matchInfo";
import payloadTrackingData from "./models/HyperBashModels/payloadTrackingData";
import matchReplay from "./models/matchReplay/matchReplay";

declare module "@vue/runtime-core" {
	// You have to declare your new values also here :)))))

	interface State {
		PlayerData: (playerInfo)[]; //There should be an isactive bool
		connection: string;
		selectedIndex: number;
		matchInfo: matchInfo;
		version: string;

		matchReplayData: matchReplay;
	}

	interface ComponentCustomProperties {
		$store: Store<State>;
	}
}
