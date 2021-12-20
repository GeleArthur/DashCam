<template>
  <player-tab />

</template>

<script lang="ts">
import { defineComponent } from "vue";
import PlayerTab from "./components/PlayerTab.vue";

export default defineComponent({
  name: "App",
  components: {
    PlayerTab,
  },
  data() {
    return {
      title: "wow",
    };
  },
});
</script>

<style lang="scss">
#app {
  font-family: Arial;
}

body {
  margin: 0px;
  padding: 0px;
}
</style>
