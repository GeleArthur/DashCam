<template>
  <div class="backdrop" :class="{ redTeam: team == 0, blueTeam: team == 1 }">
    <img src="@/assets/helmet1.png" alt="helmet1" class="icon" />

    <div class="container">
      <div class="Name">
        <p>{{ playerName }}</p>
      </div>
      <div class="playerInfo">
        <p>{{ leftWeapon }}</p>
        <p>{{ rightWeapon }}</p>
        <p>{{ health }}:Health</p>
        <p>{{ dash }}:dash</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "PlayerTab",
  data() {
    return {
      // playerName: "testName",
      // leftWeapon: "testPistol",
      // rightWeapon: "testPistol",
      // Health: 100,
      // Dash: 100,
    };
  },
  props: ["playerName", "leftWeapon", "rightWeapon", "health", "dash", "team"],
});
</script>

<style scoped>
.icon {
  width: 100px;
  height: 100px;
  display: block;
}

.backdrop {
  width: 500px;
  background: rgba(0, 0, 0, 0.5);
  display: grid;
  grid-template-columns: auto 1fr;
}

.redTeam {
  background: red;
}
.blueTeam {
  background: blue;
}

.container {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: min-content 1fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas:
    "Name"
    "playerInfo";
}

.Name {
  grid-area: Name;
  justify-self: center;
}

.playerInfo {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;

  grid-area: playerInfo;
  align-items: end;
  justify-items: center;
}
</style>
