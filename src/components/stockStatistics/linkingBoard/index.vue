<template>
  <div>
    <h1>连板数</h1>
    <TableCount :dataList="dataList" />
    <h1>连板率</h1>
    <TableCentage :dataList="dataList" />
    <h1>连板率</h1>
    <LineView :dataList="dataList" />
  </div>
</template>

<script>
import Request from '../../../tools/request';
import TableCount from './tableCount';
import TableCentage from './tableCentage';
import LineView from './line';

export default {
  components: {
    TableCount,
    TableCentage,
    LineView
  },
  data() {
    return {
      dataList: [],
    }
  },
  mounted() {
    this.getDate();
  },
  methods: {
    getDate() {
      return Request.get('linkingBoard', {
        limit: 7,
        sort: -1
      }).then((data = []) => {
        this.dataList = data;
      });
    },
  }
}
</script>

<style lang="less" scoped>

.drView {
  // overflow: auto;
  // padding: 10px;
  margin: 10px;
}

</style>