<template>
  <ToImageView fileName="市场最高板" >
    <div>
      <h1>市场最高板</h1>
      <div ref="container" />
    </div>
  </ToImageView>
</template>

<script>
import { Chart } from '@antv/g2';
import Request from '../../../tools/request';
import ToImageView from '../../toImageView/index';
import moment from 'moment';

export default {
  components: {
    ToImageView
  },
  data() {
    return {
      data: []
    }
  },
  mounted() {
    this.maxCount = 0;
    this.getDate().then(()=>{
      this.init();
    })
  },
  methods: {
    getDate() {
      return Request.get('limitUpMax', {
        limit: 7,
        sort: -1
      }).then((res = []) => {
        return res.map((item) => {
          const {plate_name, count, date} = item;
          if (count > this.maxCount) {
            this.maxCount = count;
          }
          return {
            plateName: plate_name,
            count,
            date: moment(Number(date)).format('MM-DD'),
          }
        })
      }).then((data) => {
        console.log(data);
        this.data = data.reverse();
      });
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
        date: {
          range: [0.05, 0.95],
        },
      });

      chart.line()
        .position('date*count')
        .label('plateName*count',(plateName, count)=>{
          return {
            content: `${plateName}：${count}`,
            offset: count === this.maxCount ? -15 : 0,
          }
        })
        .color('#ff5957');
      chart
        .point()
        .position('date*count')
        .color('#ff5957');

      chart.render();
    }
  }
}
</script>

<style lang="less" scoped>
.test {
  text-align: center;
}
</style>