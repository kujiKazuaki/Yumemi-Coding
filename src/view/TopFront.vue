<template>
  <div class="barChart">
    <Bar :options="chartOptions" :data="chartData" />
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
        labels: this.$store.state.years,
        datasets: this.$store.state.prefectures,
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
