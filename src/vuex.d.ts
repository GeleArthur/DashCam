import { Store } from "vuex";
import { playerInfo } from "./models/playerInfo";
import { matchInfo } from "./models/matchInfo";
import payloadTrackingData from "./models/HyperBashModels/payloadTrackingData";

declare module "@vue/runtime-core" {
	// You have to declare your new values also here :)))))

	interface State {
		PlayerData: (playerInfo)[];
		connection: string;
		selectedIndex: number;
		matchInfo: matchInfo;
		version: string;
		matchHistory:matchHistory;
	}

	interface ComponentCustomProperties {
		$store: Store<State>;
	}
}
