<template>
  <div>
    <!-- <div>{{ result }}</div> -->
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

export default {
  data() {
    return {
      resasInfo: resasInfo,
      url: resasInfo.url_prefectures,
      api: resasInfo.api,
      prefData: [],
      isPref: [],
      // result: "",
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
    isActivePref(val) {
      const isExistencePref = this.isPref.indexOf(val)
      isExistencePref === -1
        ? this.isPref.push(val)
        : this.isPref.splice(isExistencePref, 1)

      this.$store.dispatch("fetchPrefs", this.isPref)
      // console.log("isPref：")
      // console.log(this.isPref)

      // this.result = ""
      // let result = []
      // for (let i = 0; i < this.isPref.length; i++) {
      //   result.push(this.isPref[i].prefName)
      // }
      // this.result = result
    },
  },
}
</script>

<style la="scss">
@import url(@/assets/CSS/style.scss);
</style>
