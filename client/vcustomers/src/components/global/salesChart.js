/**
 * Created by taylor on 6/22/17.
 */

import { Line } from 'vue-chartjs';

export default Line.extend({
  props: ['chartData', 'options'],
  mounted () {
    setTimeout(() => {
      this.renderChart(this.chartData, this.options)
    }, 1);
  }
})
