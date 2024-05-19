import axios from "axios"
import { createStore } from "vuex"
import createPersistedState from "vuex-persistedstate"

export default createStore({
  state: {
    prefectures: [],
    years: [],
  },
  mutations: {
    getPrefs(state, payload) {
      state.prefectures = payload
      // console.log(state.prefectures)
    },
    getYears(state, payload) {
      state.years = payload
    },
  },
  actions: {
    async getPrefectures({ commit }, payload) {
      // payload => 各都道府県のprefCode + prefName
      const allPrefecture_Data = []
      const allPrefectureYears_Data = []

      payload.forEach(async (el) => {
        const prefCode_data = el.prefCode
        console.log(prefCode_data)
        const res = await axios.get(
          `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${prefCode_data}&cityCode=-`,
          {
            headers: {
              "X-API-KEY": "3xJ30Q5E9QI9Ci2hRdcvWrAxsBVizaErafAXNImN",
            },
          }
        )
        const value = await res.data.result.data[0].data

        const TotalPopulation_Year = []
        const TotalPopulation_Data = []

        // 都道府県の総人口データと年データを各配列に入れ込む
        value.forEach((element) => {
          // console.log(element.value, element.year)
          TotalPopulation_Data.push(element.value)
          TotalPopulation_Year.push(element.year)
        })

        // rgbaを自動生成する関数 => backgroundColor
        const generateRGBA = () => {
          const r = Math.floor(Math.random() * 256)
          const g = Math.floor(Math.random() * 256)
          const b = Math.floor(Math.random() * 256)
          const a = 0.8
          return `rgba(${r}, ${g}, ${b}, ${a})`
        }

        // chart.jsに入れ込むデータ
        const prefData = {
          label: el.prefName,
          data: TotalPopulation_Data,
          backgroundColor: generateRGBA(),
        }
        allPrefecture_Data.push(prefData)
        allPrefectureYears_Data
          .push(TotalPopulation_Year)

          .catch((err) => {
            console.error("エラー", err.message)
          })
      })
      commit("getPrefs", allPrefecture_Data)
      commit("getYears", allPrefectureYears_Data)
    },
  },
  plugins: [createPersistedState()],
  getters: {},
  modules: {},
})
