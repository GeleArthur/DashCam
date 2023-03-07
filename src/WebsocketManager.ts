import { HOST, PORT } from "./Util/ConstVars";
import store from "./store/store";
import { WebsocketStatusTypes } from "./interfaces/StoreInterfaces/StoreState";

let websocketClient: WebSocket;
let retryID: number;

export function createWebsocketManager() {
	setUpEvents();
	tryToConnect();
}

function setUpEvents(){
	window.addEventListener("focus", tryToConnect);
	retryID = setInterval(tryToConnect, 5000);
}

function cleanUpEvents() {
	window.removeEventListener("focus", tryToConnect);
	clearInterval(retryID);
}


function tryToConnect() {
	if(websocketClient != null) websocketClient.close();

	websocketClient = new WebSocket(`ws://${HOST}:${PORT}`);

	store.commit("changeConnectionStatus", WebsocketStatusTypes.connecting);

	websocketClient.addEventListener("error", onDisconnect);
	websocketClient.addEventListener("close", onDisconnect);
	websocketClient.addEventListener("open", onOpen)
	websocketClient.addEventListener("message", onMessage)

}

function onDisconnect() {
	store.commit("changeConnectionStatus", WebsocketStatusTypes.disconnected);
}

function onOpen(){
	cleanUpEvents();

	store.commit("init");
	store.commit("changeConnectionStatus", WebsocketStatusTypes.connected);
}

function onMessage(ev: MessageEvent<string>) {
	var socketData = JSON.parse(ev.data);
	store.commit(socketData.type, socketData);
}
