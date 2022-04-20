export interface killFeed {
	type: string;
	killer: number;
	victim: number;
	headShot: boolean;
	isAltFire: boolean;
	weaponType: string;
}

export default killFeed;
