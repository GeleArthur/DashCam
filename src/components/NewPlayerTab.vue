<template>
  <div class="container">
    <div class="Icon">
      <img src="@/assets/helmet1.png" alt="helmet1" />
      <div>{{ playerData.name }}</div>
    </div>
    <div class="DeadKills">
      <div class="kills">
        <img
          src="@/assets/death-skull.png"
          alt="deadSkull"
          class="deadSkullIcon"
        />
        <div class="deadSkullText">10</div>
      </div>

      <div class="deads">
        <img
          src="@/assets/death-skull.png"
          alt="deadSkull"
          class="deadSkullIcon"
        />
        <div class="deadSkullText">10</div>
      </div>
    </div>
    <div class="Health"></div>
    <div class="Dash"></div>
    <div class="Loadout">
      <div>?</div>
      <div>?</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NewPlayerTab",
  data() {
    return {};
  },
  props: ["playerData"],
});
</script>

<style scoped lang="scss">
/*#region topIcon */
.Icon > img {
  width: 100px;
  height: 100px;
  display: block;
}

.Icon > div {
  position: absolute;
  left: 1px;
  bottom: 1px;
  font-weight: 900;

  text-overflow: ellipsis;
  overflow: hidden;
  width: 100px;
  white-space: nowrap;
}
.Icon {
  position: relative;
  text-align: left;
  color: white;
}

/*#endregion*/

/*#region backGround */
.container {
  background: rgba(255, 0, 0, 1);
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
/*#endregion*/

/*#region gird */
.container {
  /* width: 500px; */
  display: grid;
  margin-bottom: 10px;

  grid-auto-columns: 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: "Icon DeadKills Health Dash Loadout";
}

.Icon {
  grid-area: Icon;
}
.DeadKills {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 0px 0px;
  grid-template-areas:
    "."
    ".";
  grid-area: DeadKills;
}
.Loadout {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 0px 0px;
  grid-template-areas:
    "."
    ".";
  grid-area: Loadout;
}
.Health {
  grid-area: Health;
}
.Dash {
  grid-area: Dash;
}
/*#endregion*/

.deadSkullIcon {
  width: 1em;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: auto;
  margin-top: auto;
  display: block;
}
.DeadKills {
  // border: solid;
  border-color: black;
  text-align: center;
}

.deadSkullText {
  color: white;
  font-weight: 900;
}

@mixin deadkillsText {
  display: flex;
  flex-direction: column;
  align-items: center;
  // justify-content: center;
}

.kills {
  @include deadkillsText;
  border-bottom: solid;
}

.deads {
  @include deadkillsText;
}
</style>
