export default interface KillFeedEntry {
	id: string;
	killerTeam: number;
	killer: string;
	headShot: boolean;
	victimTeam: number;
	victim: string;
	weaponType: string;
	isAltFire: boolean;
}
