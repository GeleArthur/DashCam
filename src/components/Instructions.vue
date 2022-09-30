<template>
  <div class="modal">
    <div class="modal_wrapper">
      <div class="modal_content">
        <h1>HyperCup</h1>
        <p>Welcome, this is a HyperDash overylay of HyperDash made by <b>GeleArthur</b> &amp; <b>Styledev</b></p>
        <h2>How to use</h2>
        <ol>
          <li>First install hyperbash you can get it from the <a href="https://discord.gg/GzUzBU5czj" target="_blank">HyperBash</a> Discord server.</li>
          <li>
              Enable websocket in hyperbash
              <br/><br/>
              <img src="../assets/EnableWebSockets.png">
              <br/>
          </li>
          <li>Restart hyperdash and see the magic :)</li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  export default defineComponent({});
</script>

<style scoped lang="css">
  .modal{align-items:center;bottom:0;display:flex;justify-content:center;left:0;position:fixed;right:0;top:0;z-index:5;}
  .modal h1{margin-top:0;}
  .modal:before{background-color:rgba(0,0,0,0.3);bottom:0;content:'';left:0;position:absolute;right:0;top:0;z-index:1;}
  .modal_wrapper{height:90vh;overflow:scroll;position:relative;width:800px;z-index:1;}
  .modal_content{background-color:#fff;padding:2em;}
  .modal li+li{margin-top:1em;}
</style>
