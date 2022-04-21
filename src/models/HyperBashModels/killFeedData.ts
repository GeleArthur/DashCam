export interface killFeedData {
	type: string;
	killer: number;
	victim: number;
	headShot: boolean;
	isAltFire: boolean;
	weaponType: string;
}

export default killFeedData;
