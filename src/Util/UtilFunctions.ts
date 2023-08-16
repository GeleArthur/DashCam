import pistol from "@/assets/weapons/pistols.svg";
import smg from "@/assets/weapons/smg.svg";
import rocket from "@/assets/weapons/rockets.svg";
import shotgun from "@/assets/weapons/shotgun.svg";
import staple from "@/assets/weapons/staples.svg";
import sniper from "@/assets/weapons/sniper.svg";
import shock from "@/assets/weapons/shocks.svg";
import pistolCharged from "@/assets/weapons/pistols-charged.svg";
import shockCharged from "@/assets/weapons/shocks-charged.svg";
import headShot from "@/assets/weapons/head-shot.svg"

export enum WeaponTypes {
	None = -1,
	DefaultPistol = 0,
	Uzi = 1,
	Rocket = 2,
	Confetti = 3,
	FoamHand = 4,
	Cup = 5,
	Shield = 6,
	Shotgun = 7,
	BurstRifle = 8,
	Sniper = 9,
	Hand = 10,
	ShockPistol = 11,
	InstaGib = 12,
	Ball = 13,
	Flag = 14,
	Sword = 15,
}

const weaponIcons : Record<WeaponTypes, string> = {
	[WeaponTypes.None]: "",
	[WeaponTypes.DefaultPistol]: pistol,
	[WeaponTypes.Uzi]: smg,
	[WeaponTypes.Rocket]: rocket,
	[WeaponTypes.Confetti]: "",
	[WeaponTypes.FoamHand]: "",
	[WeaponTypes.Cup]: "",
	[WeaponTypes.Shield]: "",
	[WeaponTypes.Shotgun]: shotgun,
	[WeaponTypes.BurstRifle]: staple,
	[WeaponTypes.Sniper]: sniper,
	[WeaponTypes.Hand]: "",
	[WeaponTypes.ShockPistol]: shock,
	[WeaponTypes.InstaGib]: "",
	[WeaponTypes.Ball]: "",
	[WeaponTypes.Flag]: "",
	[WeaponTypes.Sword]: ""
}
const weaponAltIcons = {
	[WeaponTypes.DefaultPistol]: pistolCharged,
	[WeaponTypes.ShockPistol]: shockCharged
}

// TODO remove
export function getImage(gunName: string): string {
	// Something else for require
	switch (gunName) {
		case "DefaultPistol":
			return pistol;
		case "ShockPistol":
			return shock;
		case "Shotgun":
			return shotgun;
		case "BurstRifle":
			return staple;
		case "Rocket":
			return rocket;
		case "Sniper":
			return sniper;
		// case "Shield":
		// 	return shield;
		case "Uzi":
			return smg;
		// case "Cup":
		// 	return cup;
		// case "Hand":
		// 	return hand;

		default:
			console.error("Unkown gun " + gunName);
			return "";
	}
}


export function getWeaponIcon(weaponType: WeaponTypes, isAltFire: boolean): string {
	if (weaponType == -1) {
		return headShot;
	}
	if (isAltFire) {
		weaponType = weaponType as
			| WeaponTypes.DefaultPistol
			| WeaponTypes.ShockPistol;
		return weaponAltIcons[weaponType];
	} else {
		return weaponIcons[weaponType];
	}
}

export function getRandomArbitrary(min: number, max: number) {
	return Math.random() * (max - min) + min;
}

export function getRandomInt(min: number, max: number) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
