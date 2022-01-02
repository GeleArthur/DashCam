<template>
  <div v-if="connection">
    <a>{{ connection }}</a>
    <button @click="AddFakeData">fakeData</button>
  </div>
  <div class="container">
    <div class="redTeam">
      <new-player-tab
        v-for="(item, index) in redTeamList"
        :key="index"
        :playerData="item"
        :selectedIndex="selectedIndex"
      />
    </div>
    <div></div>
    <div class="blueTeam">
      <new-player-tab
        v-for="(item, index) in blueTeamList"
        :key="index"
        :playerData="item"
        :selectedIndex="selectedIndex"
      />
    </div>

    <!-- <div class="blueTeam">
      <player-tab
        v-for="(item, index) in blueTeamList"
        :key="index"
        :playerData="item"
      />
    </div> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { HOSt, PORT } from "./ConstVars";
// import PlayerTab from "./components/PlayerTab.vue";
import NewPlayerTab from "./components/NewPlayerTab.vue";

export interface playerInfo {
  specatorIndex: number;
  name: string;
  clan: string;
  team: number;
  leftWeapon: {
    imageSource: string;
    weaponName: string;
  };
  rightWeapon: {
    imageSource: string;
    weaponName: string;
  };
  health: number;
  dash: number;
  isDead: boolean;

  deads: number;
  kills: number;
  score: number;
  ping: number;
}

export default defineComponent({
  name: "App",
  components: {
    // PlayerTab,
    NewPlayerTab,
  },
  data() {
    return {
      PlayerData: [] as playerInfo[],
      connection: "Failed",
      selectedIndex: 0,
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

      function getImage(gunName: string): string {
        // Something else for require
        switch (gunName) {
          case "DefaultPistol":
            return require("./assets/gun-pistol.png");
          case "ShockPistol":
            return require("./assets/gun-shock.png");
          case "Shotgun":
            return require("./assets/gun-shotgun.png");
          case "BurstRifle":
            return require("./assets/gun-burst.png");
          case "Rocket":
            return require("./assets/gun-rocket.png");
          case "Sniper":
            return require("./assets/gun-sniper.png");
          case "Shield":
            return "https://thevrdimension.com/wp-content/uploads/2021/03/Hyper-Dash-1.7-1024x576.png";
          case "Uzi":
            return require("./assets/gun-smg.png");
          case "Cup":
            return "https://static.vecteezy.com/system/resources/previews/000/510/619/original/cup-winner-gold-stock-vector-illustration.jpg";
          case "Hand":
            return "https://orsblog.com/wp-content/uploads/2020/04/Dry-skin-on-hand-1536x2048.jpg";

          default:
            console.error("Unkown gun " + gunName);
            return "";
        }
      }

      switch (socketData.type) {
        case "playerJoins":
          console.log(socketData);
          this.PlayerData.push({
            specatorIndex: socketData.spectatorIndex,
            name: socketData.name,
            clan: socketData.clanTag,
            team: socketData.team,
            leftWeapon: {
              imageSource: require("@/assets/gun-pistol.png"),
              weaponName: "DefaultPistol",
            },
            rightWeapon: {
              imageSource: require("@/assets/gun-pistol.png"),
              weaponName: "DefaultPistol",
            },
            health: 100,
            dash: 100,
            isDead: false,
            score: 0,
            deads: 0,
            kills: 0,
            ping: 0,
          });

          break;
        case "playerLeaves":
          console.log(socketData);
          this.PlayerData.splice(socketData.spectatorIndex, 1);
          break;
        case "loadoutUpdate":
          this.PlayerData[socketData.spectatorIndex].leftWeapon = {
            imageSource: getImage(socketData.leftHand),
            weaponName: socketData.leftHand,
          };

          this.PlayerData[socketData.spectatorIndex].rightWeapon = {
            imageSource: getImage(socketData.rightHand),
            weaponName: socketData.rightHand,
          };
          break;
        case "switchTeam":
          console.log(socketData);
          this.PlayerData[socketData.spectatorIndex].team = socketData.team;
          break;
        case "killFeed":
          console.log(socketData);
          this.PlayerData[socketData.victim].isDead = true;
          break;
        case "respawn":
          console.log(socketData);
          this.PlayerData[socketData.spectatorIndex].isDead = false;
          break;
        case "healthUpdate":
          this.PlayerData[socketData.spectatorIndex].health = socketData.health;
          break;
        case "CurrentlySpectating":
          this.selectedIndex = socketData.spectatorIndex;
          break;
        case "scoreboard":
          console.log(socketData);
          for (let i = 0; i < this.PlayerData.length; i++) {
            this.PlayerData[i].deads = socketData.deads[i];
            this.PlayerData[i].kills = socketData.kills[i];
            this.PlayerData[i].score = socketData.scores[i];
          }
          break;

        default:
          // console.log("Support " + socketData.type + " Please");

          break;
      }
    },
    AddFakeData() {
      for (let teamIndex = 0; teamIndex < 2; teamIndex++) {
        for (let i = 0; i < 5; i++) {
          this.PlayerData.push({
            specatorIndex: i + teamIndex * 5,
            name: Math.random().toString(16).substr(2, 16),
            clan: Math.random().toString(16).substr(2, 2),
            team: teamIndex,
            leftWeapon: {
              imageSource: require("@/assets/gun-pistol.png"),
              weaponName: "pistol",
            },
            rightWeapon: {
              imageSource: require("@/assets/gun-pistol.png"),
              weaponName: "pistol",
            },
            health: 100,
            dash: 100,
            isDead: false,
            deads: 42,
            kills: 69,
            score: 420,
            ping: 0,
          });
        }
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

<style scoped>
.blueTeam {
  justify-self: end;
}
.redTeam {
  justify-self: start;
}
.container {
  display: grid;
  grid-template-columns: auto auto auto;
  /* justify-items: self-end; */
  /* gap: 10em 10em; */
}
</style>

<style>
#app {
  font-family: Arial;
}

body {
  margin: 0px;
  padding: 0px;
  background: rgba(100, 100, 100, 1);
  overflow: hidden; /* lazy ass fix this */
}
</style>
