import { Teams } from "./MatchInfo";

export interface PlayerStateInfo {
	isActive: boolean;

	playerID: number;
	name: string;
	clan: string;
	team: Teams;
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

	deaths: number;
	kills: number;
	killStreak: number;
	score: number;
	ping: number;

	feetPosition: {
		X: number;
		Y: number;
		Z: number;
	};
	feetRotation: number;
}

export interface DashCamSettings {
	iconMode: iconModes;
	customBlueIcon: string;
	customRedIcon: string;
}

export enum iconModes{
	dashLeague,
	custom
}

export enum WebsocketStatusTypes {
	connected,
	connecting,
	disconnected,
}
