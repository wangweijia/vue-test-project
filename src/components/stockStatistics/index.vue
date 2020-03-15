<template>
  <div class="page" >
    <h1>市场情绪</h1>
    <Emotion/>
    <h1>北向资金</h1>
    <NorthwardCapital/>
  </div>
</template>

<script>
import Emotion from './emotion';
import NorthwardCapital from './northwardCapital';

export default {
  components: {
    Emotion,
    NorthwardCapital
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
