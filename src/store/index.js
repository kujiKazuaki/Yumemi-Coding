import axios from "axios"
import { createStore } from "vuex"
import createPersistedState from "vuex-persistedstate"

export default createStore({
  state: {
    resPref: [],
    year: [],
  },
  mutations: {
    getPrefs(state, payload) {
      state.resPref = payload
      // console.log("getPrefs")
      // console.log(state.resPref)
    },
    getYears(state, payload) {
      state.year = payload
      // console.log("getYears")
      // console.log(state.year)
    },
  },
  actions: {
    fetchPrefs({ commit }, payload) {
      // payload => 各都道府県のprefCode + prefName
      // console.clear()
      const fetchPerData = []
      // console.log(payload)

      const Final = payload.map(async (el) => {
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
            // console.log(el.prefName)
            const pram = res.data.result.data[0].data
            const fetchYear = []
            const fetchPramNum = []

            pram.forEach((element) => {
              fetchPramNum.push(element.value)
              fetchYear.push(element.year)
            })

            const generateRGBA = () => {
              const r = Math.floor(Math.random() * 256)
              const g = Math.floor(Math.random() * 256)
              const b = Math.floor(Math.random() * 256)
              const a = 0.8
              return `rgba(${r}, ${g}, ${b}, ${a})`
            }

            const prefData = {
              label: el.prefName,
              data: fetchPramNum,
              backgroundColor: generateRGBA(),
            }
            fetchPerData.push(prefData)

            commit("getPrefs", fetchPerData)
            commit("getYears", fetchYear)
          })
          .catch((err) => {
            console.log(err)
          })
      })
      // console.log(result)
      return Final
    },
  },
  plugins: [createPersistedState()],
  getters: {},
  modules: {},
})
