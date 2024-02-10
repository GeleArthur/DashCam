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
type ListenerPriority<T extends HyperBashMessage> = {
	listener: Listener<T>;
	priority: number;
};
class HBEvent<T extends HyperBashMessage> {
	constructor(public type: EventTypes) {}

	private listeners: ListenerPriority<T>[] = [];

	subscribe(listener: Listener<T>) {
		this.subscribePriority(listener, 0);
	}

	subscribePriority(listener: Listener<T>, priority: number) {
		this.listeners.push({ listener, priority });

		this.listeners.sort((a, b) => {
			if (a.priority === b.priority) return 0;
			else if (a.priority > b.priority) return -1;
			else return 1;
		});
	}

	unsubscribe(listener: Listener<T>) {
		for (let i = 0; i < this.listeners.length; i++) {
			if (this.listeners[i].listener == listener) {
				this.listeners.splice(i, 1);
			}
		}
	}

	invoke(payload: T) {
		for (let i = 0; i < this.listeners.length; i++) {
			try {
				this.listeners[i].listener(payload);
			} catch (error) {
				console.log(error);
			}
		}
	}
}

export { HBEvent };
