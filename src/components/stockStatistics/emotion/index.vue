<template>
  <div ref="container" class="box-root" />
</template>

<script>
import DataSet from '@antv/data-set';
import { Chart } from '@antv/g2';
import Request from '../../../tools/request';
import moment from 'moment';

export default {
  data() {
    return {
      data: [],
      // width: 100,
      height: 500
    }
  },
  mounted() {
    this.getDate().then((data) => {
      this.init();
    });
  },
  methods: {
    getDate() {
      return Request.get('emotion', {
        limit: 7,
        sort: -1
      }).then((res) => {
        return res.map((item) => {
          const { market_temperature, date } = item;
          return {
            temperature: Math.round(market_temperature),
            date: moment(Number(date)).format('MM-DD'),
          }
        })
      }).then((data) => {
        console.log(data);
        this.data = data.reverse();
      })
    },
    init() {
      if (this.chart) {
        this.chart.destroy();
      }
      const { data } = this;
      const {container} = this.$refs;

      const chart = new Chart({
        container: container,
        autoFit: true,
        height: this.height,
        // width: this.width
      });
      this.chart = chart;

      chart.data(data);
      chart.scale({
        date: {
          range: [0, 1],
        },
        temperature: {
          min: 0,
          nice: true,
          formatter: (val) => {
            return `${val}%`;
          }
        },
      });

      chart.tooltip({
        showCrosshairs: true, // 展示 Tooltip 辅助线
        shared: true,
      });

      chart.line()
        .position('date*temperature')
        .label('temperature', (val) => {
          return {
            content: `${val}%`,
          }
        });
      chart.point().position('date*temperature');

      chart.render();
    }
  }
}
</script>

<style lang="less" scoped>

.box-root {
  background-color: #ffffff;
  // border: solid 1px #000000;
}

</style>