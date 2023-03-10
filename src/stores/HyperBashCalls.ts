import {
	LoadoutUpdateMessage,
	PlayerJoinsMessage,
	playerPositionMessage,
} from "@/interfaces/HyperBashMessages.interface";
import { getImage } from "@/Util/UtilFunctions";
import { useMatchStateStore } from "./MatchState";

type storeType = ReturnType<typeof useMatchStateStore>;
let state: storeType;

export function initStore(){
    state = useMatchStateStore();
}


export function playerJoins(socketData: PlayerJoinsMessage) {
	state.PlayerData[socketData.playerID] = {
		isActive: true,

		playerID: socketData.playerID,
		name: socketData.name,
		clan: socketData.clanTag,
		team: socketData.team,
		leftWeapon: {
			imageSource: "./assets/gun-pistol.png", // This doesn't work should be removed
			weaponName: "DefaultPistol",
		},
		rightWeapon: {
			imageSource: "./assets/gun-pistol.png",
			weaponName: "DefaultPistol",
		},
		health: 100,
		dash: 3,
		dashPickup: false,
		isDead: false,
		score: 0,
		deads: 0,
		kills: 0,
		ping: 0,

		feetPosition: { X: 0, Y: 0, Z: 0 },
		feetRotation: 0,
	};
}

export function playerLeaves(socketData: any) {
	state.PlayerData[socketData.playerID].isActive = false;
}

export function switchTeam(socketData: any) {
	state.PlayerData[socketData.playerID].team = socketData.team;
}

export function playerPos(socketData: playerPositionMessage) {
	for (let i = 0; i < socketData.headPos.length / 3; i++) {
		if (state.PlayerData[i].isActive == true) {
			state.PlayerData[i].feetPosition = {
				X: socketData.rootTransform[i * 3 + 0],
				Y: socketData.rootTransform[i * 3 + 1],
				Z: socketData.rootTransform[i * 3 + 2],
			};

			state.PlayerData[i].feetRotation = socketData.headRot[i + 1];
		}
	}
}

export function respawn(socketData: any) {
	state.PlayerData[socketData.playerID].isDead = false;
}
export function healthUpdate(socketData: any) {
	state.PlayerData[socketData.playerID].health = socketData.health;
}

export function loadoutUpdate(socketData: LoadoutUpdateMessage) {
	state.PlayerData[socketData.playerID].leftWeapon = {
		imageSource: getImage(socketData.leftHand),
		weaponName: socketData.leftHand,
	};

	state.PlayerData[socketData.playerID].rightWeapon = {
		imageSource: getImage(socketData.rightHand),
		weaponName: socketData.rightHand,
	};
}

export function dashUpdate(socketData: any) {
	if (state.PlayerData[socketData.playerID].isActive == true) {
		state.PlayerData[socketData.playerID].dash = socketData.dashAmount;
		state.PlayerData[socketData.playerID].dashPickup =
			socketData.hasDashUpgrade;
	}
}
