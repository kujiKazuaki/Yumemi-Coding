import axios from "axios"
import { createStore } from "vuex"

export default createStore({
  state: {
    resPref: [],
    year: [],
  },
  mutations: {
    getPrefs(state, payload) {
      state.resPref = payload
      // console.log("getPrefs")
      // console.log(payload)
    },
    getYears(state, payload) {
      state.year = payload
      // console.log("getYears")
      // console.log(payload)
    },
  },
  actions: {
    fetchPrefs({ commit }, payload) {
      // payload => 各都道府県のprefCode + prefName
      console.clear()
      let result = []
      // console.log(payload)

      payload.forEach((el) => {
        // console.log(el)
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
            const value = res.data.result.data[0].data
            const fetchPramNum = []
            const fetchYear = []
            // console.log(value)

            const generateRGBA = () => {
              const r = Math.floor(Math.random() * 256)
              const g = Math.floor(Math.random() * 256)
              const b = Math.floor(Math.random() * 256)
              const a = Math.random()
              return `rgba(${r}, ${g}, ${b}, ${a})`
            }

            value.forEach((element) => {
              // console.log(element)
              fetchPramNum.push(element.value)
              fetchYear.push(element.year)
            })
            // console.log(fetchYear)

            console.log(payload)
            const prefData = {
              label: payload[0].prefName,
              data: fetchPramNum,
              backgroundColor: generateRGBA(),
            }
            result.push(prefData)
            // console.log(result)

            commit("getPrefs", result)
            commit("getYears", fetchYear)
          })
      })
    },
  },
  getters: {},
  modules: {},
})
