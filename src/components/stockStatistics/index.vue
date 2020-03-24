<template>
  <div class="page" >
    <div>
      by wwj
    </div>

    <!-- <h1>市场情绪</h1> -->
    <Emotion/>

    <!-- <h1>北向资金</h1> -->
    <NorthwardCapital/>

    <!-- <h1>涨跌停家数</h1> -->
    <LimitUpDownCount/>

    <!-- 连板相关 -->
    <LinkingBoard/>

    <!-- <h1>市场最高板</h1> -->
    <LimitUpMaxCount/>
  </div>
</template>

<script>
import Emotion from './emotion';
import NorthwardCapital from './northwardCapital';
import LimitUpDownCount from './limitUpDownCount';
import LinkingBoard from './linkingBoard/index';
import LimitUpMaxCount from './limitUpMaxCount/index';

export default {
  components: {
    Emotion,
    NorthwardCapital,
    LimitUpDownCount,
    LinkingBoard,
    LimitUpMaxCount
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
