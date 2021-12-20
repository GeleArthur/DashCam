import { HOSt, PORT } from "./ConstVars";
import { AddData, ChangeConnectionType } from "./FrontendWorker";

let ws: WebSocket;

StartWebSocket();

function StartWebSocket() {
  if (ws != null) {
    ws.removeEventListener("error", failed);
    ws.removeEventListener("close", failed);
    ws.removeEventListener("open", onConnected);
    ws.removeEventListener("message", onMessage);
  }

  ws = new WebSocket(`ws://${HOSt}:${PORT}`);
  ChangeConnectionType("Connecting")

  ws.addEventListener("error", failed);
  ws.addEventListener("close", failed);
  ws.addEventListener("open", onConnected);
  ws.addEventListener("message", onMessage);
}

// Examples of commands
// {"Type":"Teleport","X":40,"Y":10,"Z":15,"RotX":0,"RotY":0,"RotZ":0}
// {"Type":"IDKWHATCANITYPEHERE"}
export function sendData(data: string) {
  if (ws.readyState == 1) ws.send(data);
}

// retrey to connect when user switches site because they did something
document.body.onfocus = ()=>{
  if(ws == null || ws.readyState != 1)StartWebSocket();
}

function failed(){
  ChangeConnectionType("Failed. Enable websocket and restart HyperDash")
}

function onConnected() {
  ChangeConnectionType("Connected")
}

function onMessage(ev: MessageEvent<any>) {
  AddData(ev.data);
}


