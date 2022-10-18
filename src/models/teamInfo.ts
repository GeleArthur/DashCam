
// used for getting online team info
export default interface teamInfo {
    name: string;
    
    logoFound:boolean;
    logo: string;

    extrasFound:boolean;
    matches: number;
    wins: number;
    losses: number;
    players: string[];
}