import { playerInfo } from "@/models/playerInfo";
import { createStore } from "vuex";

export default createStore({
  state: {
    PlayerData: [] as playerInfo[],
    connection: "Failed",
    selectedIndex: 0,
  },
  mutations: {},
  actions: {},
  modules: {},
});
