<template>
  <el-table
    :header-cell-style="{
      textAlign: 'center',
    }"
    :cell-style="{
      textAlign: 'center'
    }"
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column prop="name" />
    <el-table-column v-for="(item, index) in col" :key="index"
      :prop="item.key"
      :label="item.label">
    </el-table-column>
  </el-table>
</template>

<script>
import { Chart } from '@antv/g2';
import Request from '../../../tools/request';
import moment from 'moment';

export default {
  data() {
    return {
      tableData: [],
      col: [],
    }
  },
  props: {
    dataList: {
      type: Array
    }
  },
  watch: {
    dataList(value) {
      const p = new Promise((resolve) => {
        resolve(value);
      });
      this.getDate(p);
    }
  },
  methods: {
    getDate(promise) {
      promise.then((data = []) => {
        const cpData = JSON.parse(JSON.stringify(data));
        const res = cpData.reverse();
        let maxRow = 0;
        const col = [];
        res.forEach((item) => {
          const { rateList = [], date } = item;
          col.push({
            key: date,
            label: moment(Number(date)).format('MM月DD日')
          })
          const l = rateList.length;
          maxRow = maxRow > l ? maxRow : l;
        });
        this.col = col;
        return {maxRow, res, col};
      }).then(({maxRow, res, col}) => {
        const list = [];
        for (let i = 0; i < maxRow; i++) {
          const aItem = {
            name: `${i+1}进${i+2}`,
          }
          for (let j = 0; j < col.length; j++) {
            const aCol = col[j];
            const { key, label } = aCol;
            const v = res[j].rateList[i] || 0;
            aItem[key] = (v*100).toFixed(2) + '%';
          }
          list.push(aItem);
        }
        this.tableData = list;
      })
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