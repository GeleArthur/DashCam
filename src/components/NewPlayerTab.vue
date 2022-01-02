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
        <div class="deadSkullText">{{ playerData.kills }}</div>
      </div>

      <div class="deads">
        <img
          src="@/assets/death-skull.png"
          alt="deadSkull"
          class="deadSkullIcon"
        />
        <div class="deadSkullText">{{ playerData.deads }}</div>
      </div>
    </div>
    <div class="DHContainer Health">
      <div class="DHText HealthText">{{ playerData.health }}</div>
      <div class="DHProgress HealthProgress"></div>
    </div>
    <div class="DHContainer Dash">
      <div class="DHText DashText">100</div>
      <div class="DHProgress DashProgress"></div>
    </div>

    <div
      class="Loadout"
      :class="{
        selectedColor: this.selectedIndex == this.playerData.specatorIndex,
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
// .container {
//   background: rgba(255, 0, 0, 1);
// }

/*#endregion*/

/*#region gird */
.container {
  display: grid;
  margin-bottom: 10px;

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
  border-right: 5px solid black;
  padding-right: 2px;
  border-radius: 0px 7px 7px 0px;
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
/*#endregion*/

/*#region HealthDash*/
.DHContainer {
  width: 50px;
  height: 100px;
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

.Health {
  border-left: 2px solid black;

  .HealthProgress {
    background: green;
    height: v-bind(healthSize);
  }
}

.Dash {
  border-right: 2px solid black;

  .DashProgress {
    background: rgb(0, 138, 180);
  }
}

/*#endregion*/

/*#region Loadout*/
.LoadoutPart {
  height: 52px;
  width: 100px;
  position: relative;
  display: inline-block;
  img {
    // height: 50px;
    display: block;
    max-height: 100%;
  }
}

.Loadout {
  background: red;
}

.selectedColor {
  background: yellow;
}

/*#endregion*/
</style>
