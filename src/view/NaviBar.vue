<template>
  <div class="navApp">
    <ul>
      <li v-for="(pref, index) in prefData" :key="index">
        <label>
          <input type="checkbox" @change="isActivePref(pref)" />
          <span>{{ pref.prefName }}</span>
        </label>
      </li>
    </ul>
  </div>
</template>

<script>
import resasInfo from "@/Plugins/resas.js"
import axios from "axios"

export default {
  data() {
    return {
      resasInfo: resasInfo,
      url: resasInfo.url_prefectures,
      api: resasInfo.api,
      prefData: [],
      prefectures: [],
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
      // チェックされてる都道府県のみを配列に入れる
      const isExistencePref = this.prefectures.indexOf(pref)

      isExistencePref === -1
        ? this.prefectures.push(pref)
        : this.prefectures.splice(isExistencePref, 1)

      this.$store.dispatch("fetchPrefs", this.prefectures)
    },
  },
}
</script>

<style la="scss" scoped>
.navApp {
  /* border: 2px solid red; */
}
ul {
  display: flex;
  /* border: 2px solid blue; */
}
/* li {
  border: 2px solid green;
  margin: 2px;
  font-size: 20px;
} */
</style>
