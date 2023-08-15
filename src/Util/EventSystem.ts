import { HyperBashMessage } from "@/interfaces/HyperBashMessages.interface";

export type EventTypes =
	| "announcer"
	| "controlPoint"
	| "currentlySpectating"
	| "domination"
	| "dashUpdate"
	| "error"
	| "healthUpdate"
	| "killFeed"
	| "loadoutUpdate"
	| "matchStart"
	| "payload"
	| "playerJoins"
	| "playerLeaves"
	| "playerPos"
	| "respawn"
	| "sceneChange"
	| "scoreboard"
	| "status"
	| "switchTeam"
	| "teamScore"
	| "timer"
	| "version";

type Listener<T extends HyperBashMessage> = (payload: T) => void;
class HBEvent<T extends HyperBashMessage> {
	constructor(public type: EventTypes) {}

	private listeners: Listener<T>[] = [];

	subscribe(listener: Listener<T>) {
		this.listeners.push(listener);
	}

	unsubscribe(listener: Listener<T>) {
		const index = this.listeners.indexOf(listener);
		if (index > -1) {
			this.listeners.splice(index, 1);
		}
	}

	invoke(payload: T) {
		this.listeners.forEach((listener) => {
			try {
				listener(payload);
			} catch (error) {
				console.log(error);
			}
		});
	}
}

export { HBEvent };
