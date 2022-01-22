<template>
  <div v-if="this.$store.state.connection">
    <a>{{ this.$store.state.connection }}</a>
    <button @click="AddFakeData">fakeData</button>
  </div>
  <div class="container">
    <div class="redTeam">
      <new-player-tab
        v-for="(item, index) in redTeamList"
        :key="index"
        :spectatorIndex="this.$store.state.PlayerData.indexOf(item)"
      />
    </div>
    <div></div>
    <div class="blueTeam">
      <new-player-tab
        v-for="(item, index) in blueTeamList"
        :key="index"
        :spectatorIndex="this.$store.state.PlayerData.indexOf(item)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { HOSt, PORT } from "./ConstVars";
import NewPlayerTab from "./components/NewPlayerTab.vue";
import playerInfo from "./models/playerInfo";
import { mapMutations } from "vuex";

export default defineComponent({
  name: "App",
  components: {
    NewPlayerTab,
  },
  data() {
    return {};
  },
  computed: {
    redTeamList() {
      let data = this.$store.state.PlayerData as playerInfo[];
      return data.filter((e: playerInfo) => {
        return e.team == 0;
      });
    },
    blueTeamList() {
      let data = this.$store.state.PlayerData as playerInfo[];
      return data.filter((e: playerInfo) => {
        return e.team == 1;
      });
    },
  },
  methods: {
    updateData(data: string) {
      var socketData = JSON.parse(data);
      this.$store.commit(socketData.type, socketData);
    },
    ...mapMutations(["AddFakeData", "changeConnection"]),
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
      this.changeConnection("Connecting");

      ws.addEventListener("error", failed);
      ws.addEventListener("close", failed);
      ws.addEventListener("open", onConnected);
      ws.addEventListener("message", onMessage);
    };

    document.body.onfocus = () => {
      if (ws == null || ws.readyState != 1) StartWebSocket();
    };

    const failed = () => {
      this.changeConnection("Failed. Enable websocket and restart HyperDash");
    };

    const onConnected = () => {
      this.changeConnection("");
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
