import { Store } from "vuex";
import { playerInfo } from "./models/playerInfo";
import { matchInfo } from "./models/matchInfo";
import payloadTrackingData from "./models/HyperBashModels/payloadTrackingData";

declare module "@vue/runtime-core" {
	// You have to declare your new values also here :)))))

	interface State {
		PlayerData: (playerInfo | undefined)[]; //There should be an isactive bool
		connection: string;
		selectedIndex: number;
		matchInfo: matchInfo;
		version: string;
		previousTime: number,
		// payloadTrackingData: payloadTrackingData;
		// payloadTrackBlueTime: number[];
		// payloadTrackRedTime: number[];
		// payloadTrackBlueProgress: number[];
		// payloadTrackRedProgress: number[];
	}

	interface ComponentCustomProperties {
		$store: Store<State>;
	}
}
