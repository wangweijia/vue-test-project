<template>
  <div>
    <h1>连板数</h1>
    <TableCount :dataList="dataList" />
  </div>
</template>

<script>
import Request from '../../../tools/request';
import TableCount from './tableCount';

export default {
  components: {
    TableCount
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