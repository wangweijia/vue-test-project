<template>
  <div class="page" >
    <div>
      by wwj
    </div>
    <h1>市场情绪</h1>
    <Emotion/>

    <h1>北向资金</h1>
    <NorthwardCapital/>

    <h1>涨跌停家数</h1>
    <LimitUpDownCount/>
  </div>
</template>

<script>
import Emotion from './emotion';
import NorthwardCapital from './northwardCapital';
import LimitUpDownCount from './limitUpDownCount';

export default {
  components: {
    Emotion,
    NorthwardCapital,
    LimitUpDownCount
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
