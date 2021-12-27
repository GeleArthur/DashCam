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
    <div class="Health">
      <div class="HealthText">100</div>
      <div class="HealthProgress"></div>
    </div>
    <div class="Dash">
      <div class="DashText">100</div>
      <div class="DashProgress"></div>
    </div>
    <div class="Loadout">
      <img src="" alt="leftHand" />
      <img src="" alt="rightHand" />
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
// .container {
//   background: rgba(255, 0, 0, 1);
// }

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
.Health {
  width: 50px;
  height: 100px;
  position: relative;

  .HealthProgress {
    display: block;
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    background: green;
  }
  .HealthText {
    color: white;
    font-weight: 900;
    text-align: center;
    position: relative;
    top: 1px;
    z-index: 1;
  }
}

.Dash {
  width: 50px;
  height: 100px;
  position: relative;
  border-left: 2px solid black;

  .DashProgress {
    display: block;
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    background: rgb(0, 138, 180);
  }
  .DashText {
    color: white;
    font-weight: 900;
    text-align: center;
    position: relative;
    top: 1px;
    z-index: 1;
  }
}

/*#endregion*/
</style>
