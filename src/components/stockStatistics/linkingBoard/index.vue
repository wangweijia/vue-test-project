<template>
  <div>
    <ToImageView fileName="连板数" >
      <div>
        <h1>连板数</h1>
        <TableCount :dataList="dataList" />
      </div>
    </ToImageView>
    <ToImageView fileName="连板率" >
      <div>
        <h1>连板率</h1>
        <TableCentage :dataList="dataList" />
      </div>
    </ToImageView>
    <ToImageView fileName="连板率-折线" >
      <div>
        <h1>连板率</h1>
        <LineView :dataList="dataList" />
      </div>
    </ToImageView>
  </div>
</template>

<script>
import Request from '../../../tools/request';
import TableCount from './tableCount';
import TableCentage from './tableCentage';
import LineView from './line';
import ToImageView from '../../toImageView/index';

export default {
  components: {
    TableCount,
    TableCentage,
    LineView,
    ToImageView
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