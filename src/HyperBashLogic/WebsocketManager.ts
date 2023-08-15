import { HOST, PORT } from "../Util/ConstVars";
import { WebsocketStatusTypes } from "../interfaces/StoreInterfaces/StoreState";
// import { hyperBashCalls } from "@/HyperBashLogic/HyperBashCalls";
import * as HyperBashEvents from "@/HyperBashLogic/HyperBashEvents";
import { useSettingStore } from "../stores/SettingsStore";
import { useMatchStateStore } from "../stores/MatchStateStore";
import { HyperBashMessage, PlayerJoinsLayout } from "@/interfaces/HyperBashMessages.interface";
import { EventTypes, HBEvent } from "@/Util/EventSystem";

type storeSettingType = ReturnType<typeof useSettingStore>;
let settingState: storeSettingType;

type storeType = ReturnType<typeof useMatchStateStore>;
let state: storeType;

let websocketClient: WebSocket;
let retryID: number;

let prevConnected = false;

// Dont ask why
// const HBEventsStriped = HyperBashEvents as { [key: string]: HBEvent<HyperBashMessage> };
const HBEventsStriped = HyperBashEvents as unknown as Record<string, HBEvent<HyperBashMessage>>;// { [key: string]: HBEvent<HyperBashMessage> };
const HBEvents = {} as Record<EventTypes, HBEvent<HyperBashMessage>>;

for (const key in HBEventsStriped) {
	if (Object.prototype.hasOwnProperty.call(HBEventsStriped, key)) {
		const eventName = HBEventsStriped[key].type;
		HBEvents[eventName] = HBEventsStriped[key];
	}
}


export function createWebsocketManager() {
	settingState = useSettingStore();
	state = useMatchStateStore();

	setUpEvents();
	tryToConnect();
}

function setUpEvents() {
	cleanUpEvents();
	window.addEventListener("focus", tryToConnect);
	retryID = setInterval(tryToConnect, 5000);
}

function cleanUpEvents() {
	window.removeEventListener("focus", tryToConnect);
	clearInterval(retryID);
}

function tryToConnect() {
	if (websocketClient != null) {
		websocketClient.removeEventListener("error", onDisconnect);
		websocketClient.removeEventListener("close", onDisconnect);
		websocketClient.removeEventListener("open", onOpen);
		websocketClient.removeEventListener("message", onMessage);

		websocketClient.close();
	}

	websocketClient = new WebSocket(`ws://${HOST}:${PORT}`);

	websocketClient.addEventListener("error", onDisconnect);
	websocketClient.addEventListener("close", onDisconnect);
	websocketClient.addEventListener("open", onOpen);
	websocketClient.addEventListener("message", onMessage);
	
	settingState.WebsocketStatus = WebsocketStatusTypes.connecting;
}

function onDisconnect() {
	settingState.WebsocketStatus = WebsocketStatusTypes.disconnected;

	if (prevConnected) {
		state.$reset();
		setUpEvents();
		prevConnected = false;
	}
}

function onOpen() {
	cleanUpEvents();
	state.$reset();

	prevConnected = true;

	settingState.$patch({ WebsocketStatus: WebsocketStatusTypes.connected });
}

function onMessage(ev: MessageEvent<string>) {
	var socketData = JSON.parse(ev.data) as { type: EventTypes };

	if (HBEvents[socketData.type] == undefined) {
		console.error(socketData.type);
		return;
	}

	HBEvents[socketData.type].invoke(socketData);
}
