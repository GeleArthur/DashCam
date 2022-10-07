import { mapName, matchType } from "../matchInfo";

export default interface matchReplay {
    version: string;
    matchID: string;
    matchType: matchType;
    mapName: mapName;

    payload: payloadReplay;
    domination: dominationReplay;
    controllPoint: controllPointReplay;

    matchScore: matchScoreReplay[];
    playerKills: KillFeedReplay[];
    timer: matchTimerReplay[];
}

interface matchTimerReplay extends timeStamp{
    matchTimer: number;
}

interface controllPointReplay extends timeStamp{
    ScoringTeam: number;
}

interface matchScoreReplay extends timeStamp{
    redScore: number;
    blueScore: number;
}

interface payloadReplay {
    cart: payloadCart[];
    firstRoundTimeStamp:  number;
    secondRoundTimeStamp:  number;
}

interface dominationReplay{
    countDownTimer: number;
    pointA: number;
    pointB: number;
    pointC: number;
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
    time: number; // This is the browser timer!!!
}