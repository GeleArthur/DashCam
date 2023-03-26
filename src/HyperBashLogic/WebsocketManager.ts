import { HOST, PORT } from "../Util/ConstVars";
import { WebsocketStatusTypes } from "../interfaces/StoreInterfaces/StoreState";
import { hyperBashCalls } from "@/HyperBashLogic/HyperBashCalls";
import { useSettingStore } from "../stores/SettingsStore";
import { useMatchStateStore } from "../stores/MatchStateStore";

type storeType = ReturnType<typeof useMatchStateStore>;
let state: storeType;

let websocketClient: WebSocket;
let retryID: number;

let prevConnected = false;

export function createWebsocketManager() {
	state = useMatchStateStore();

	setUpEvents();
	tryToConnect();
}

function setUpEvents() {
	window.addEventListener("focus", tryToConnect);
	retryID = setInterval(tryToConnect, 5000);
}

function cleanUpEvents() {
	window.removeEventListener("focus", tryToConnect);
	clearInterval(retryID);
}

function tryToConnect() {
	if (websocketClient != null) websocketClient.close();

	websocketClient = new WebSocket(`ws://${HOST}:${PORT}`);

	state.WebsocketStatus = WebsocketStatusTypes.connecting;

	websocketClient.addEventListener("error", onDisconnect);
	websocketClient.addEventListener("close", onDisconnect);
	websocketClient.addEventListener("open", onOpen);
	websocketClient.addEventListener("message", onMessage);
}

function onDisconnect() {
	state.WebsocketStatus = WebsocketStatusTypes.disconnected;

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

	state.$patch({ WebsocketStatus: WebsocketStatusTypes.connected });
}

// Magic
const HyperBashCalls: { [key: string]: (socketData: any) => void } =
	hyperBashCalls;

function onMessage(ev: MessageEvent<string>) {
	var socketData = JSON.parse(ev.data) as { type: string };

	if (HyperBashCalls[socketData.type] == undefined) {
		console.error(socketData.type);
		return;
	}

	HyperBashCalls[socketData.type].call(undefined, socketData);
}
