<template>
  <div
    class="backdrop"
    :class="{
      redTeam: playerData.team == 0,
      blueTeam: playerData.team == 1,
      dead: playerData.dead,
    }"
  >
    <img src="@/assets/helmet1.png" alt="helmet1" class="icon" />

    <div class="container">
      <div class="Name">
        <p>{{ playerData.clan }} {{ playerData.name }}</p>
      </div>
      <div class="playerInfo">
        <p>{{ playerData.leftWeapon }}</p>
        <p>{{ playerData.rightWeapon }}</p>
        <p>{{ playerData.health }}:Health</p>
        <p>{{ playerData.dash }}:dash</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "PlayerTab",
  data() {
    return {};
  },
  props: ["playerData"],
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
.dead {
  background: rgba(0.1, 0.1, 0.1, 0.5);
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
.Name > p {
  margin: 0px;
  font-size: 1.5em;
  font-weight: bold;
}

.playerInfo {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;

  grid-area: playerInfo;
  align-items: center;
  justify-items: center;
}

.playerInfo > p {
  margin: 0px;
}
</style>
