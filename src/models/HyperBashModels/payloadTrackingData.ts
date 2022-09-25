export interface payloadTrackingTeam0 {
	totalGameTime: number[];
	team0progress: number[];
}

export interface payloadTrackingTeam1 {
	totalGameTime: number[];
	team1progress: number[];
}


export interface payloadTrackingData{
    progressteam0: payloadTrackingTeam0;
    progressteam1: payloadTrackingTeam1;
}

export default payloadTrackingData;
