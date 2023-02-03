<template>
  <div>
    <div>都道府県別の総人口推移グラフ</div>
    <div>
      <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
    </div>
  </div>
</template>

<script>
// import { url_demographics } from "@/plugins/demo.js"
import { Bar } from "vue-chartjs"
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js"

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

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
