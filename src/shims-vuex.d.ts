import { Store } from "vuex";
import { playerInfo } from "./models/playerInfo";
import { matchInfo } from "./models/matchInfo";
import payloadTrackingData from "./models/HyperBashModels/payloadTrackingData";


export interface State {
	PlayerData: playerInfo[];
	connection: string;
	selectedIndex: number;
	matchInfo: matchInfo;
	version: string;
	payloadTrackingData: payloadTrackingData;
	payloadTrackBlueTime: number[];
	payloadTrackRedTime: number[];
	payloadTrackBlueProgress: number[];
	payloadTrackRedProgress: number[];
}

declare module "@vue/runtime-core" {
	// You have to declare your new values also here :)))))

	interface ComponentCustomProperties {
		$store: Store<State>;
	}
}
