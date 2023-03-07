import { Store } from "vuex";
import { PlayerStateInfo, WebsocketStatusTypes } from "@/interfaces/StoreInterfaces/StoreState";
import { MatchInfo } from "@/interfaces/StoreInterfaces/MatchInfo";
import payloadTrackingData from "@/interfaces/HyperBashModels/payloadTrackingData";
import matchReplay from "@/interfaces/matchReplay/matchReplay";
import settings from "@/interfaces/StoreInterfaces/Settings";
import TeamInfo from "@/interfaces/StoreInterfaces/TeamInfo";

declare module "@vue/runtime-core" {
	// You have to declare your new values also here :)))))

	interface State {
		WebsocketStatus: WebsocketStatusTypes;
		PlayerData: (PlayerStateInfo)[];
		selectedIndex: number;
		matchInfo: MatchInfo;
		version: string;

		settings: settings;
		teamData:{red:TeamInfo, blue:TeamInfo}
	}

	interface ComponentCustomProperties {
		$store: Store<State>;
	}
}
