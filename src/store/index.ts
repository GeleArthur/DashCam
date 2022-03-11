import { playerInfo } from "../models/playerInfo";
import { createStore } from "vuex";
import { getImage } from "../Util/GetImage";
import { playerJoins } from "../models/playerJoins";

export default createStore({
  state: {
    PlayerData: [] as playerInfo[],
    connection: "Failed",
    selectedIndex: 0,
  },
  mutations: {
    playerJoins(state, socketData: playerJoins) {
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
        state.PlayerData[i].feetRotation = socketData.feetDirection;
      }
    },
    status(state, socketData: any) {
      1 + 1;
    },
    dashUpdate(state, socketData: any) {
      state.PlayerData[socketData.spectatorIndex].dash = socketData.dashAmount;
    },
    changeConnection(state, connectionType) {
      state.connection = connectionType;
    },
  },
  actions: {},
  modules: {},
});
