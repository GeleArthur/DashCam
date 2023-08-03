import pistol from '@/assets/weapons/pistols.svg'
import smg from '@/assets/weapons/smg.svg'
import rockets from '@/assets/weapons/rockets.svg'
import shotgun from '@/assets/weapons/shotgun.svg'
import staples from '@/assets/weapons/staples.svg'
import snipers from '@/assets/weapons/sniper.svg'
import shocks from '@/assets/weapons/shocks.svg'
import pistolsCharged from '@/assets/weapons/shocks.svg'
import shocksCharged from '@/assets/weapons/shocks-charged.svg'

const weaponSvgIcons: {[key: string]: any} = {
	headshot: "src/assets/weapons/head-shot.svg",
	weapons: {
		0: pistol,
		1: smg,
		2: rockets,
		7: shotgun,
		8: staples,
		9: snipers,
		11: shocks,
		12: shocks,
		14: shocks
	},
	altWeapons: {
		0: pistolsCharged,
		11: shocksCharged
	}
};

const shield = "https://thevrdimension.com/wp-content/uploads/2021/03/Hyper-Dash-1.7.png"
const hand = "https://orsblog.com/wp-content/uploads/2020/04/Dry-skin-on-hand.jpg"
const cup = "https://static.vecteezy.com/system/resources/previews/000/510/619/original/cup-winner-gold-stock-vector-illustration.jpg"


export function getImage(gunName: string): string {
	// Something else for require
	switch (gunName) {
		case "DefaultPistol":
			return pistol;
		case "ShockPistol":
			return shocks;
		case "Shotgun":
			return shotgun;
		case "BurstRifle":
			return staples;
		case "Rocket":
			return rockets;
		case "Sniper":
			return snipers;
		case "Shield":
			return shield;
		case "Uzi":
			return smg;
		case "Cup":
			return cup;
		case "Hand":
			return hand;

		default:
			console.error("Unkown gun " + gunName);
			return "";
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

export function getWeaponIcon(weaponType: number, isAltFire: boolean): string {
	if (weaponType === -1) {
		return weaponSvgIcons.headshot;
	}

	return (isAltFire)
		? weaponSvgIcons.altWeapons[weaponType]
		: weaponSvgIcons.weapons[weaponType];
}

export function getHeadshotIcon() {
	return weaponSvgIcons.headshot;
}