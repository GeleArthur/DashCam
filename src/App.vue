<template>
  <div class="container">
    <div>
      <player-tab
        v-for="(item, index) in redTeamList"
        :key="index"
        :playerName="item.name"
        :leftWeapon="item.leftWeapon"
        :rightWeapon="item.rightWeapon"
        :Dash="item.dash"
        :Health="item.health"
        :team="item.team"
      />
    </div>
    <div></div>
    <div class="floatleft">
      <player-tab
        v-for="(item, index) in blueTeamList"
        :key="index"
        :playerName="item.name"
        :leftWeapon="item.leftWeapon"
        :rightWeapon="item.rightWeapon"
        :Dash="item.dash"
        :Health="item.health"
        :team="item.team"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { HOSt, PORT } from "./ConstVars";
import PlayerTab from "./components/PlayerTab.vue";

interface playerInfo {
  name: string;
  team: number;
  leftWeapon: string;
  rightWeapon: string;
  health: number;
  dash: number;
}

export default defineComponent({
  name: "App",
  components: {
    PlayerTab,
  },
  data() {
    return {
      PlayerData: [] as playerInfo[],
      connection: "Failed",
    };
  },
  computed: {
    redTeamList() {
      let data = this.PlayerData as playerInfo[];
      return data.filter((e: playerInfo) => {
        return e.team == 0;
      });
    },
    blueTeamList() {
      let data = this.PlayerData as playerInfo[];
      return data.filter((e: playerInfo) => {
        return e.team == 1;
      });
    },
  },
  methods: {
    updateData(data: string) {
      var socketData = JSON.parse(data);
      switch (socketData.type) {
        case "playerJoins":
          console.log(socketData);
          this.PlayerData.push({
            name: socketData.name,
            team: socketData.team,
            leftWeapon: "pistol",
            rightWeapon: "pistol",
            health: 100,
            dash: 100,
          });

          break;
        case "playerLeaves":
          console.log(socketData);
          this.PlayerData.splice(socketData.spectatorIndex, 1);
          break;
        case "loadoutUpdate":
          this.PlayerData[socketData.spectatorIndex].leftWeapon =
            socketData.leftHand;
          this.PlayerData[socketData.spectatorIndex].rightWeapon =
            socketData.rightHand;
          break;
        default:
          // console.log("Support " + socketData.type + " Please");
          break;
      }
    },
  },
  mounted() {
    let ws: WebSocket;

    const StartWebSocket = () => {
      if (ws != null) {
        ws.removeEventListener("error", failed);
        ws.removeEventListener("close", failed);
        ws.removeEventListener("open", onConnected);
        ws.removeEventListener("message", onMessage);
      }

      ws = new WebSocket(`ws://${HOSt}:${PORT}`);
      this.connection = "Connecting";

      ws.addEventListener("error", failed);
      ws.addEventListener("close", failed);
      ws.addEventListener("open", onConnected);
      ws.addEventListener("message", onMessage);
    };

    document.body.onfocus = () => {
      if (ws == null || ws.readyState != 1) StartWebSocket();
    };

    const failed = () => {
      this.connection = "Failed. Enable websocket and restart HyperDash";
    };

    const onConnected = () => {
      this.connection = "";
    };

    const onMessage = (ev: MessageEvent<string>) => {
      this.updateData(ev.data);
    };

    StartWebSocket();
  },
});
</script>

<style lang="scss" scoped>
#app {
  font-family: Arial;
}

body {
  margin: 0px;
  padding: 0px;
}

.floatleft {
  justify-self: end;
}
.container {
  display: grid;
  grid-template-columns: auto auto auto;
  // justify-items: self-end;
  // gap: 10em 10em;
}
</style>
