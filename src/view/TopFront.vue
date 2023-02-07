<template>
  <div class="Bar_area">
    <Bar :options="chartOptions" :data="chartData" class="Bar_item" />
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

<style lang="scss" scoped>
.Bar_area {
  display: flex;
  justify-self: center;
  align-items: center;
  width: 100%;
  height: 650px;
  margin: 0 auto;
  margin-top: 1.2rem;
  padding: 0.5rem;

  .Bar_item {
    margin: 0 auto;
    width: 1000px;
  }
}
</style>
