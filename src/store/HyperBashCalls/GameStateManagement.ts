import killFeedData from "@/models/HyperBashModels/killFeedData";
import { State } from "vue";

export function killFeed(state: State, socketData: killFeedData) {
	state.PlayerData[socketData.victim].isDead = true;
}

export function CurrentlySpectating(state: State, socketData: any) {
	state.selectedIndex = socketData.playerID;
}

export function scoreboard(state: State, socketData: any) {
	for (let i = 0; i < state.PlayerData.length; i++) {
		if (state.PlayerData[i].isActive == true) {
			state.PlayerData[i].deads = socketData.deads[i];
			state.PlayerData[i].kills = socketData.kills[i];
			state.PlayerData[i].score = socketData.scores[i];
		}
	}
}

export function status(state: State, socketData: any) {}

export function sceneChange(state: State, socketData: any) {}
