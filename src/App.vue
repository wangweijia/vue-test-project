<template>
  <div class="root" >
      <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
}
</script>

<style>

html {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

#app {
  width: 100%;
  height: 100%;
  /* background-color: aqua; */
  display: flex;
  flex-direction: column; 
}

.root {
  padding: 0;
  margin: 0;

  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column; 
}

</style>
