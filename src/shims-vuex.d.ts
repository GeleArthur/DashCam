import { Store } from "vuex";
import { playerInfo } from "./models/playerInfo";
import { matchInfo } from "./models/matchInfo";

export interface State {
	PlayerData: playerInfo[];
	connection: string;
	selectedIndex: number;
	matchInfo: matchInfo;
}

declare module "@vue/runtime-core" {
	// You have to declare your new values also here :)))))

	interface ComponentCustomProperties {
		$store: Store<State>;
	}
}
