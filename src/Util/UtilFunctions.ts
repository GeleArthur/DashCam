export function getImage(gunName: string): string {
	// Something else for require
	switch (gunName) {
		case "DefaultPistol":
			return "/assets/gun-pistol.png";
		case "ShockPistol":
			return "/assets/gun-shock.png";
		case "Shotgun":
			return "/assets/gun-shotgun.png";
		case "BurstRifle":
			return "/assets/gun-burst.png";
		case "Rocket":
			return "/assets/gun-rocket.png";
		case "Sniper":
			return "/assets/gun-sniper.png";
		case "Shield":
			return "https://thevrdimension.com/wp-content/uploads/2021/03/Hyper-Dash-1.7-1024x576.png";
		case "Uzi":
			return "/assets/gun-smg.png";
		case "Cup":
			return "https://static.vecteezy.com/system/resources/previews/000/510/619/original/cup-winner-gold-stock-vector-illustration.jpg";
		case "Hand":
			return "https://orsblog.com/wp-content/uploads/2020/04/Dry-skin-on-hand-1536x2048.jpg";

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
