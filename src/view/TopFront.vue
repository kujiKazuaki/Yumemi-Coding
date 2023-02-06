<template>
  <div>
    <div>都道府県別の総人口推移グラフ</div>
    <div class="barChart">
      <Bar :options="chartOptions" :data="chartData" />
    </div>
  </div>
</template>

<script>
import { Bar } from "vue-chartjs"
import { Chart as ChartJS, registerables } from "chart.js"

ChartJS.register(...registerables)

export default {
  name: "BarChart",
  components: { Bar },
  data() {
    return {
      chartOptions: {
        responsive: true,
      },
    }
  },
  computed: {
    chartData() {
      return {
        labels: this.$store.state.year,
        datasets: this.$store.state.resPref,
      }
    },
  },
}
</script>

<style scope>
.barChart {
  width: 110%;
}
</style>
