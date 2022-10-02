import { teams } from "./matchInfo";

export interface playerInfo {
	isActive: boolean;

	playerID: number;
	name: string;
	clan: string;
	team: teams;
	leftWeapon: {
		imageSource: string;
		weaponName: string;
	};
	rightWeapon: {
		imageSource: string;
		weaponName: string;
	};
	health: number;
	dash: number;
	dashPickup: boolean;
	isDead: boolean;

	deads: number;
	kills: number;
	score: number;
	ping: number;

	feetPosition: {
		X: number;
		Y: number;
		Z: number;
	};
	feetRotation: number;
}

export default playerInfo;
