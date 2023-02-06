<template>
  <div>
    <TopFront2 :chartOptions="chartOptions" :chartData="chartData" />
    <div>
      <ul>
        <li v-for="(pref, index) in prefData" :key="index">
          <label>
            <input type="checkbox" @change="isActivePref(pref)" />
            <span>{{ pref.prefName }}</span>
          </label>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import resasInfo from "@/plugins/resas.js"
import axios from "axios"
import TopFront2 from "./TopFront-2.vue"

export default {
  components: {
    TopFront2,
  },
  data() {
    return {
      resasInfo: resasInfo,
      url: resasInfo.url_prefectures,
      api: resasInfo.api,
      prefData: [],
      isPref: [],
      // result: "",
      resPref: [1, 2, 3],
      year: [1, 2, 3],
      chartOptions: {
        responsive: true,
      },
    }
  },
  async created() {
    const request_Header = {
      headers: { "X-API-KEY": this.api.key },
    }
    await axios.get(this.url, request_Header).then((res) => {
      const value = res.data.result
      this.prefData.push(...value)
    })
  },
  methods: {
    isActivePref(pref) {
      const isExistencePref = this.isPref.indexOf(pref)

      isExistencePref === -1
        ? this.isPref.push(pref)
        : this.isPref.splice(isExistencePref, 1)

      this.fetchPrefs(this.isPref)
    },
    fetchPrefs(prefecture) {
      console.clear()
      console.log(this.isPref)
      const result = []

      const Final = prefecture.map(async (el) => {
        const prefCode_data = el.prefCode
        axios
          .get(
            `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${prefCode_data}&cityCode=-`,
            {
              headers: {
                "X-API-KEY": "5RDiLdZKag8c3NXpEMb1FcPQEIY3GVwgQwbLqFIx",
              },
            }
          )
          .then((res) => {
            console.log(el.prefName)
            const value = res.data.result.data[0].data
            const fetchPramNum = []
            const fetchYear = []
            // console.log(value)

            const generateRGBA = () => {
              const r = Math.floor(Math.random() * 256)
              const g = Math.floor(Math.random() * 256)
              const b = Math.floor(Math.random() * 256)
              const a = 0.8
              return `rgba(${r}, ${g}, ${b}, ${a})`
            }

            value.map((element) => {
              // console.log(element)
              fetchPramNum.push(element.value)
              fetchYear.push(element.year)
            })
            // console.log(fetchYear)

            const prefData = {
              label: el.prefName,
              data: fetchPramNum,
              backgroundColor: generateRGBA(),
            }
            result.push(prefData)

            this.resPref = result
            this.year = fetchYear
          })
      })
      return Final
    },
  },
  computed: {
    chartData() {
      return {
        labels: this.year,
        datasets: this.resPref,
      }
    },
  },
}
</script>

<style la="scss" scoped>
@import url(@/assets/CSS/style.scss);
</style>
