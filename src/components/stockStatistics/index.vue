<template>
  <div class="page" >
    <h1>市场情绪</h1>
    <Emotion/>
  </div>
</template>

<script>
import Emotion from './emotion';

export default {
  components: {
    Emotion
  }

}
</script>

<style lang="less" scoped>

.page {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 10px;

  overflow-y: scroll;
  overflow-x: hidden;

  // background-color: aqua;

  &::-webkit-scrollbar {
    display: none;
  }
}

.box {
  background-color: red;
}

</style>>
