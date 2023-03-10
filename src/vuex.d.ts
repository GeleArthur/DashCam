import { Store } from "vuex";
import {
	PlayerStateInfo,
	WebsocketStatusTypes,
	DashCamSettings,
	TeamInfo,
} from "@/interfaces/StoreInterfaces/StoreState";
import { MatchInfo } from "@/interfaces/StoreInterfaces/MatchInfo";

declare module "@vue/runtime-core" {
	// You have to declare your new values also here :)))))

	interface State {
		// WebsocketStatus: WebsocketStatusTypes;
		PlayerData: PlayerStateInfo[];
		selectedIndex: number;
		matchInfo: MatchInfo;
		version: string;

		settings: DashCamSettings;
		teamData: { red: TeamInfo; blue: TeamInfo };
	}

	interface ComponentCustomProperties {
		$store: Store<State>;
	}
}
