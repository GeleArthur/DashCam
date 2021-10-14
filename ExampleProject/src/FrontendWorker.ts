// Will set data on the html page

import { sendData } from "./wsConnection";

const outputPart = document.getElementById("output") as HTMLElement;
const connectionType = document.getElementById("conType") as HTMLElement;

export function AddData(data: string) {
  //   outputPart.innerText = insert(outputPart.innerText,0, data)
  outputPart.innerText = data;
}

export function ChangeConnectionType(con:string){
  connectionType.innerText = con;
}

const InputField = document.getElementById("inputField") as HTMLInputElement;

const SendButton = document.getElementById("send") as HTMLButtonElement;
SendButton.addEventListener("click", () => {
  if (sendData != null) {
    sendData(InputField.value);
  }

  // InputField.value = "";
});

function insert(stringInput: string, index: number, string: string) {
  if (index > 0) {
    return stringInput.substring(0, index) + string + stringInput.substr(index);
  }

  return string + stringInput;
}
