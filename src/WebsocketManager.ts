import { HOST, PORT } from "./Util/ConstVars";
import store from "./store/store";
import { WebsocketStatusTypes } from "./interfaces/StoreInterfaces/StoreState";

let websocketClient: WebSocket;
let retryID: number;

export function createWebsocketManager() {
	tryToConnect();
}

function cleanUpEvents() {
	document.body.removeEventListener("focus", tryToConnect);
	clearInterval(retryID);
	// Websocket events gets cleared by browser
}

function tryToConnect() {
	websocketClient = new WebSocket(`ws://${HOST}:${PORT}`);

	websocketClient.addEventListener("error", onDisconnect);
	websocketClient.addEventListener("close", onDisconnect);
	websocketClient.addEventListener("open", onOpen)
	websocketClient.addEventListener("message", onMessage)

	store.commit("changeConnectionStatus", WebsocketStatusTypes.connecting);
}

function onDisconnect() {
	cleanUpEvents();

	document.body.addEventListener("focus", tryToConnect);

	retryID = setInterval(tryToConnect, 10000);

	store.commit("changeConnectionStatus", WebsocketStatusTypes.disconnected);
}

function onOpen(){

	store.commit("init");
	store.commit("changeConnectionStatus", WebsocketStatusTypes.connected);
}

function onMessage(ev: MessageEvent<string>) {
	var socketData = JSON.parse(ev.data);
	store.commit(socketData.type, socketData);
}
