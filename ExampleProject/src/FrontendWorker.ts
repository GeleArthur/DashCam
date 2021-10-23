// Will set data on the html page

import { sendData } from "./wsConnection";

const outputPart = document.getElementById("output") as HTMLElement;
const outputHelp = document.getElementById("outputHelp") as HTMLElement;
const connectionType = document.getElementById("conType") as HTMLElement;

export function AddData(data: string) {
  //   outputPart.innerText = insert(outputPart.innerText,0, data)
  outputPart.innerText = data;

  let parsedData = JSON.parse(data);

  // console.log(parsedData);

  if(parsedData.type == "error"){
    outputHelp.innerText = data;
  }
}

export function ChangeConnectionType(con:string){
  connectionType.innerText = con;
}

const InputField = document.getElementById("inputField") as HTMLInputElement;
// InputField.value = `{"Type":"Teleport","X":40,"Y":10,"Z":15,"RotX":0,"RotY":0,"RotZ":0}`;

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
