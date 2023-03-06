import LoadoutUpdateData from "@/models/HyperBashModels/LoadoutUpdate";
import playerJoinsData from "@/models/HyperBashModels/playerJoins";
import playerPositionData from "@/models/HyperBashModels/playerPos";
import { getImage } from "@/Util/UtilFunctions";
import { State } from "vue";

export function playerJoins(state: State, socketData: playerJoinsData) {
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

export function playerLeaves(state: State, socketData: any) {
	state.PlayerData[socketData.playerID].isActive = false;
}

export function switchTeam(state: State, socketData: any) {
	state.PlayerData[socketData.playerID].team = socketData.team;
}

export function playerPos(state: State, socketData: playerPositionData) {
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

export function respawn(state: State, socketData: any) {
	state.PlayerData[socketData.playerID].isDead = false;
}
export function healthUpdate(state: State, socketData: any) {
	state.PlayerData[socketData.playerID].health = socketData.health;
}


export function loadoutUpdate(state: State, socketData: LoadoutUpdateData) {
	state.PlayerData[socketData.playerID].leftWeapon = {
		imageSource: getImage(socketData.leftHand),
		weaponName: socketData.leftHand,
	};

	state.PlayerData[socketData.playerID].rightWeapon = {
		imageSource: getImage(socketData.rightHand),
		weaponName: socketData.rightHand,
	};
}