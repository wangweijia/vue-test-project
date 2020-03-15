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
      data: []
    }
  },
  mounted() {
    this.getDate().then(()=>{
      this.init();
    })
  },
  methods: {
    getDate() {
      return Request.get('northwardCapital', {
        limit: 7,
        sort: -1
      }).then((res) => {
        return res.map((item) => {
          const { count, date } = item;
          return {
            count: Number((count/10000).toFixed(2)),
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
        height: 500,
      });
      chart.data(data);
      this.chart = chart;

      chart.legend(false);

      chart.scale({
        count: {
          nice: true,
        },
        // date: {
        //   range: [0, 1],
        // },
      })

      chart
        .interval()
        .position('date*count')
        .color('count', (val) => {
          if (val < 0) {
            return '#36c361';
          }
          return '#ff5957';
        })
        .label('count', (count) => {
          return {
            content: (item) => {
              const {count} = item;
              return `${count}亿`;
            },
          };
        });

      chart.render();
    }
  }
}
</script>

<style lang="less" scoped>

</style>