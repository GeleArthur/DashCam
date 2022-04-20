import { playerInfo } from "../models/playerInfo";
import { createStore } from "vuex";
import { getImage } from "../Util/GetImage";

import matchInfo, { mapName, matchType, teams } from "../models/matchInfo";
import playerJoins from "../models/HyperBashModels/playerJoins";
import playerPos from "../models/HyperBashModels/playerPos";
import LoadoutUpdate from "../models/HyperBashModels/LoadoutUpdate";
import killFeed from "../models/HyperBashModels/killfeed";

export default createStore({
	state: {
		connection: "Failed",
		selectedIndex: -1,
		PlayerData: [] as (playerInfo | undefined)[],
		matchInfo: {} as matchInfo,
	},
	mutations: {
		playerJoins(state, socketData: playerJoins) {
			state.PlayerData[socketData.playerID] = {
				playerID: socketData.playerID,
				name: socketData.name,
				clan: socketData.clanTag,
				team: socketData.team,
				leftWeapon: {
					imageSource: "./assets/gun-pistol.png",
					weaponName: "DefaultPistol",
				},
				rightWeapon: {
					imageSource: "./assets/gun-pistol.png",
					weaponName: "DefaultPistol",
				},
				health: 100,
				dash: 3,
				dashPickup: false,
				isDead: false,
				score: 0,
				deads: 0,
				kills: 0,
				ping: 0,

				feetPosition: { X: 0, Y: 0, Z: 0 },
				feetRotation: 0,
			};
		},
		playerLeaves(state, socketData: any) {
			state.PlayerData[socketData.playerID] = undefined;
		},

		loadoutUpdate(state, socketData: LoadoutUpdate) {
			state.PlayerData[socketData.playerID]!.leftWeapon = {
				imageSource: getImage(socketData.leftHand),
				weaponName: socketData.leftHand,
			};

			state.PlayerData[socketData.playerID]!.rightWeapon = {
				imageSource: getImage(socketData.rightHand),
				weaponName: socketData.rightHand,
			};
		},
		switchTeam(state, socketData: any) {
			state.PlayerData[socketData.playerID]!.team = socketData.team;
		},
		killFeed(state, socketData: killFeed) {
			state.PlayerData[socketData.victim]!.isDead = true;
		},
		respawn(state, socketData: any) {
			state.PlayerData[socketData.playerID]!.isDead = false;
		},
		healthUpdate(state, socketData: any) {
			state.PlayerData[socketData.playerID]!.health = socketData.health;
		},
		CurrentlySpectating(state, socketData: any) {
			state.selectedIndex = socketData.playerID;
		},
		scoreboard(state, socketData: any) {
			for (let i = 0; i < state.PlayerData.length; i++) {
				if (state.PlayerData[i] != undefined) {
					state.PlayerData[i]!.deads = socketData.deads[i];
					state.PlayerData[i]!.kills = socketData.kills[i];
					state.PlayerData[i]!.score = socketData.scores[i];
				}
			}
		},
		playerPos(state, socketData: playerPos) {
			for (let i = 0; i < socketData.feetPos.length / 3; i++) {
				if (state.PlayerData[i] != undefined) {
					state.PlayerData[i]!.feetPosition = {
						X: socketData.feetPos[i * 3 + 0],
						Y: socketData.feetPos[i * 3 + 1],
						Z: socketData.feetPos[i * 3 + 2],
					};

					state.PlayerData[i]!.feetRotation = socketData.feetDirection[i];
				}
			}
		},
		status(state, socketData: any) {
			1 + 1;
		},
		dashUpdate(state, socketData: any) {
			if(state.PlayerData[socketData.playerID] != undefined){
				state.PlayerData[socketData.playerID]!.dash = socketData.dashAmount;
				state.PlayerData[socketData.playerID]!.dashPickup = socketData.dashPickUp;
			}
		},
		matchStart(state, socketData: any){
			state.matchInfo.blueTeamName = socketData.blueTeamName;
			state.matchInfo.redTeamName = socketData.redTeamName;
			state.matchInfo.matchtype = socketData.matchType;
			state.matchInfo.mapname = socketData.mapName;
		},

		// Will not be called by hyperBash
		init(state, payload) {
			for (let i = 0; i < 10; i++) {
				state.PlayerData[i] = undefined;
			}
		},

		changeConnection(state, connectionType) {
			state.connection = connectionType;
		},

		matchInfo(state, socketData: any) {
			state.matchInfo = {
				controlPoint: {
					TeamScoringPoints: teams.none,
				},
				domination: {
					countDownTimer: 5,
					teamCountDown: teams.none,
					pointA: teams.none,
					pointB: teams.none,
					pointC: teams.none,
				},
				payload: {
					amountBlueOnCart: 0,
					cartBlockedByRed: false,
					checkPoint: false,
					secondRound: false,
				},
				blueScore:socketData.blueScore,
				redScore:socketData.redScore,
				blueTeamName: socketData.blueTeamName,
				redTeamName: socketData.redTeamName,
				mapname: mapName.lauchpad,
				matchtype: matchType.payload,
				timer: socketData.timer,
			};
		},
	},
	actions: {},
	modules: {},
});
