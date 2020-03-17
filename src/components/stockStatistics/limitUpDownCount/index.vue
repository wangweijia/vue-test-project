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
      return Request.get('limitUpDownCount', {
        limit: 7,
        sort: -1
      }).then((res) => {
        const list = [];
        res.forEach((item) => {
          const { limit_down_count, limit_up_count, date } = item;
          list.push({
            count: limit_down_count,
            date: moment(Number(date)).format('MM-DD'),
            type: '跌停'
          })
          list.push({
            count: limit_up_count,
            date: moment(Number(date)).format('MM-DD'),
            type: '涨停'
          })
        });
        console.log(list);

        return list;
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
        // padding: [10, 0, 40, 40]
        padding: 'auto'
      });
      chart.data(data);
      this.chart = chart;

      // chart.legend(false);

      chart.scale({
        count: {
          nice: true,
        },
        // date: {
        //   range: [0, 1],
        // },
      });

      chart
        .interval()
        .position('date*count')
        .color('type', ['#ff5957', '#36c361'])
        .label('count', (count) => {
          return {
            content: (item) => {
              const {count} = item;
              return `${count}只`;
            },
          };
        },{
          type: 'base',
          offset: 7,
        })
        .adjust([
          {
            type: 'dodge',
            marginRatio: 0,
          },
        ]);

      chart.render();
    }
  }
}
</script>

<style lang="less" scoped>
.test {
  text-align: center;
  background-color: red;
}
</style>