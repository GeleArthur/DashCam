import { HOST, PORT } from "./Util/ConstVars";
import store from "./store/store";
import { WebsocketStatusTypes } from "./interfaces/StoreInterfaces/StoreState";
import { hyperBashCalls } from "@/stores/HyperBashCalls";
import { useSettingStore } from "./stores/SettingsStore";
import { useMatchStateStore } from "./stores/MatchStateStore";

type storeType = ReturnType<typeof useMatchStateStore>;
let state: storeType;

let websocketClient: WebSocket;
let retryID: number;

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
	// TODO retry to connect
	state.WebsocketStatus = WebsocketStatusTypes.disconnected;
}

function onOpen() {
	cleanUpEvents();

	store.commit("init");
	state.WebsocketStatus = WebsocketStatusTypes.connected;
}

// Magic
const HyperBashCalls: { [key: string]: (socketData: any) => void } = hyperBashCalls;

function onMessage(ev: MessageEvent<string>) {
	var socketData = JSON.parse(ev.data) as { type: string };
	store.commit(socketData.type, socketData);

	if(HyperBashCalls[socketData.type] == undefined){
		// console.log(socketData.type )
		return;
	}

	HyperBashCalls[socketData.type].call(undefined, socketData);
}
