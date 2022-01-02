<template>
  <div
    :class="{
      Rcontainer: playerData.team == 0,
      Bcontainer: playerData.team == 1,
    }"
  >
    <div class="Icon">
      <img src="@/assets/helmet1.png" alt="helmet1" />
      <div>{{ playerData.name }}</div>
    </div>
    <div class="DeadKills">
      <div
        class="kills"
        :class="{
          RDeadKills: playerData.team == 0,
          BDeadKills: playerData.team == 1,
        }"
      >
        <img
          src="@/assets/death-skull.png"
          alt="deadSkull"
          class="deadSkullIcon"
        />
        <div class="deadSkullText">10</div>
      </div>

      <div
        class="deads"
        :class="{
          RDeadKills: playerData.team == 0,
          BDeadKills: playerData.team == 1,
        }"
      >
        <img
          src="@/assets/death-skull.png"
          alt="deadSkull"
          class="deadSkullIcon"
        />
        <div class="deadSkullText">10</div>
      </div>
    </div>
    <div
      class="DHContainer Health"
      :class="{
        HDrightBorder: playerData.team == 1,
        HDleftBorder: playerData.team == 0,
      }"
    >
      <div class="DHText HealthText">{{ playerData.health }}</div>
      <div class="DHProgress HealthProgress"></div>
    </div>
    <div
      class="DHContainer Dash"
      :class="{
        HDrightBorder: playerData.team == 0,
        HDleftBorder: playerData.team == 1,
      }"
    >
      <div class="DHText DashText">100</div>
      <div class="DHProgress DashProgress"></div>
    </div>

    <div
      class="Loadout"
      :class="{
        selectedColor: this.selectedIndex == this.playerData.specatorIndex,
        RLoadout: playerData.team == 0,
        BLoadout: playerData.team == 1,
      }"
    >
      <div class="LoadoutPart LoadoutLeft">
        <img
          :src="playerData.leftWeapon.imageSource"
          :alt="playerData.rightWeapon.weaponName"
        />
      </div>
      <div class="LoadoutPart LoadoutRight">
        <img
          :src="playerData.rightWeapon.imageSource"
          :alt="playerData.rightWeapon.weaponName"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { playerInfo } from "../App.vue";

export default defineComponent({
  name: "NewPlayerTab",
  data() {
    return {};
  },
  computed: {
    healthSize() {
      return this.playerData.health + "%";
    },
  },
  props: {
    playerData: {
      type: Object as () => playerInfo,
      required: true,
    },
    selectedIndex: {
      type: Number,
      required: true,
    },
  },
});
</script>

<style scoped lang="scss">
/*#region gird */

@mixin container {
  display: grid;
  margin-bottom: 10px;
  grid-template-columns: auto auto auto auto auto;

  grid-template-rows: 1fr;
}

.Rcontainer {
  @include container;
  grid-template-areas: "Icon DeadKills Health Dash Loadout";
}

.Bcontainer {
  @include container;
  grid-template-areas: "Loadout Dash Health DeadKills Icon";
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

/*#region deadKiils*/
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

  box-sizing: border-box;
  height: 100%;
  background: rgb(75, 75, 75);
}

.kills {
  @include deadkillsText;
  border-bottom: 3px solid black;
}

.deads {
  @include deadkillsText;
  border-top: 3px solid black;
}

.RDeadKills {
  border-right: 5px solid black;
  padding-right: 2px;
  border-radius: 0px 7px 7px 0px;
}

.BDeadKills {
  border-left: 5px solid black;
  padding-left: 2px;
  border-radius: 7px 0px 0px 7px;
}
/*#endregion*/

/*#region HealthDash*/
.DHContainer {
  width: 50px;
  position: relative;

  border-bottom: 2px solid black;
  border-top: 2px solid black;

  display: flex;

  .DHProgress {
    display: block;
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
  }

  .DHText {
    color: white;
    font-weight: 900;
    z-index: 1;
    align-self: flex-end;
    margin-left: auto;
    margin-right: auto;
  }
}

.HDleftBorder {
  border-left: 2px solid black;
}

.HDrightBorder {
  border-right: 2px solid black;
}

.HealthProgress {
  background: green;
  height: v-bind(healthSize);
}

.DashProgress {
  background: rgb(0, 138, 180);
}

/*#endregion*/

/*#region Loadout*/
.LoadoutPart {
  height: 52px; // Tell me why
  width: 100px;
  position: relative;
  display: inline-block;
  img {
    // height: 50px;
    display: block;
    max-height: 100%;
  }
}

.RLoadout {
  background: red;
}

.BLoadout {
  background: blue;

  img {
    transform: scaleX(-1);
  }
}

.selectedColor {
  background: yellow;
}

/*#endregion*/
</style>
