<template>
  <div ref="container" />
</template>

<script>
import { Chart } from '@antv/g2';
import Request from '../../../tools/request';
import moment from 'moment';

export default {
  data() {
    return {
      lineData: []
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
        const datas = [];

        let maxL = 0;
        res.forEach((itemDay) => {
          const { rateList = [] } = itemDay;
          if (rateList.length > maxL) {
            maxL = rateList.length;
          }
        })

        res.forEach((itemDay) => {
          const { date, rateList = [] } = itemDay;

          const t = moment(Number(date)).format('MM月DD日');
          for (let index = 0; index < maxL; index++) {
            const item = rateList[index] || 0;
            datas.push({
              time: t,
              value: Number((item * 100).toFixed(2)),
              type: `${index+1}进${index+2}`
            })
            
          }
        })

        this.lineData = datas;
        this.init(datas);
      })
    },
    init(data) {
      if (this.chart) {
        this.chart.destroy();
      }

      const {container} = this.$refs;

      const chart = new Chart({
        container: container,
        autoFit: true,
        height: 500,
        padding: "auto"
      });

      this.chart = chart;

      chart.data(data);
      chart.scale({
        time: {
          range: [0.03, 0.97],
        },
        value: {
          nice: true,
          formatter: (val) => {
            return `${val}%`;
          }
        },
      });

      chart.tooltip({
        showCrosshairs: true,
        shared: true,
      });

      chart
        .line()
        .position('time*value')
        .color('type')
        .shape('smooth');

      chart
        .point()
        .position('time*value')
        .color('type')
        .shape('circle')
        .label('value', (val) => {
          return {
            content: `${val}%`,
          }
        })

      chart.render();
    }
  }
}
</script>

<style lang="less" scoped>

</style>