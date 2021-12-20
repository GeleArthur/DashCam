<template>
  <div class="backdrop">
    <img src="@/assets/helmet1.png" alt="helmet1" class="icon" />
    <div class="playerInfo">
      <a>Name</a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "PlayerTab",
});
</script>

<style>
.icon {
  width: 100px;
  height: 100px;
  display: block;
}
.backdrop {
  width: 500px;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
}
.playerInfo {
  width: 100px;
}
</style>
