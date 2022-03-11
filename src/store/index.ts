import { playerInfo } from "../models/playerInfo";
import { createStore } from "vuex";
import { getImage } from "../Util/GetImage";
import matchInfo, { mapName, matchType, teams } from "../models/matchInfo";

export default createStore({
  state: {
    connection: "Failed",
    selectedIndex: 0,
    PlayerData: [] as playerInfo[],
    matchInfo: {} as matchInfo,
  },
  mutations: {
    playerJoins(state, socketData: any) {
      state.PlayerData.push({
        specatorIndex: socketData.spectatorIndex,
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
        dash: 100,
        isDead: false,
        score: 0,
        deads: 0,
        kills: 0,
        ping: 0,

        feetPosition: { X: 0, Y: 0, Z: 0 },
        feetRotation: 0,
      });
    },
    playerLeaves(state, socketData: any) {
      state.PlayerData.splice(socketData.spectatorIndex, 1);
    },

    loadoutUpdate(state, socketData: any) {
      state.PlayerData[socketData.spectatorIndex].leftWeapon = {
        imageSource: getImage(socketData.leftHand),
        weaponName: socketData.leftHand,
      };

      state.PlayerData[socketData.spectatorIndex].rightWeapon = {
        imageSource: getImage(socketData.rightHand),
        weaponName: socketData.rightHand,
      };
    },
    switchTeam(state, socketData: any) {
      state.PlayerData[socketData.spectatorIndex].team = socketData.team;
    },
    killFeed(state, socketData: any) {
      state.PlayerData[socketData.victim].isDead = true;
    },
    respawn(state, socketData: any) {
      state.PlayerData[socketData.spectatorIndex].isDead = false;
    },
    healthUpdate(state, socketData: any) {
      state.PlayerData[socketData.spectatorIndex].health = socketData.health;
    },
    CurrentlySpectating(state, socketData: any) {
      state.selectedIndex = socketData.spectatorIndex;
    },
    scoreboard(state, socketData: any) {
      for (let i = 0; i < state.PlayerData.length; i++) {
        state.PlayerData[i].deads = socketData.deads[i];
        state.PlayerData[i].kills = socketData.kills[i];
        state.PlayerData[i].score = socketData.scores[i];
      }
    },
    playerPos(state, socketData: any) {
      for (let i = 0; i < socketData.feetPos.length / 3; i++) {
        state.PlayerData[i].feetPosition = {
          X: socketData.feetPos[i * 3 + 0],
          Y: socketData.feetPos[i * 3 + 1],
          Z: socketData.feetPos[i * 3 + 2],
        };
      }
    },
    status(state, socketData: any) {
      1 + 1;
    },
    dashUpdate(state, socketData: any) {
      1 + 1;
    },

    // Will not be called by hyperBash
    AddFakeData(state) {
      for (let teamIndex = 0; teamIndex < 2; teamIndex++) {
        for (let i = 0; i < 5; i++) {
          state.PlayerData.push({
            specatorIndex: i + teamIndex * 5,
            name: Math.random().toString(16).substr(2, 16),
            clan: Math.random().toString(16).substr(2, 2),
            team: teamIndex,
            leftWeapon: {
              imageSource: "./assets/gun-pistol.png",
              weaponName: "pistol",
            },
            rightWeapon: {
              imageSource: "./assets/gun-pistol.png",
              weaponName: "pistol",
            },
            health: 100,
            dash: 100,
            isDead: false,
            deads: 42,
            kills: 69,
            score: 420,
            ping: 0,

            feetPosition: { X: 0, Y: 0, Z: 0 },
            feetRotation: 0,
          });
        }
      }

      state.matchInfo = {
        controllPoint: {
          TeamScoringPoints: teams.none,
          blueScore: 0,
          redScore: 0,
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
          blueTeamPercent: 0,
          cartBlockedByRed: false,
          checkPoint: false,
          redTeamPercent: 0,
          secondRound: false,
        },

        map: mapName.lobby,
        matchtype: matchType.lobby,
        timer: 99999
      }

      state.selectedIndex = 0;
    },
    changeConnection(state, connectionType) {
      state.connection = connectionType;
    },
  },
  actions: {},
  modules: {},
});
