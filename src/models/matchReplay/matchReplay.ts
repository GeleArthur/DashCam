import { mapName, matchType } from "../matchInfo";

export default interface matchReplay {
    version: string;
    matchType: matchType;
    mapName: mapName;

    payload: payloadReplay;
    playerKills: KillFeedReplay[];

}

interface payloadReplay {
    cart: payloadCart[];
    
}

interface payloadCart extends timeStamp{
    percentage: number;
    amountBlueOnCart: number;
    cartBlockedByRed: boolean;
}

interface KillFeedReplay extends timeStamp {
    killer: number;
    victim: number;

    headShot: boolean;
    isAltFire: boolean;
    weaponType: string; // TODO should be an enum
}

interface timeStamp {
    time: number;
}