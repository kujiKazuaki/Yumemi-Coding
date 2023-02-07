<template>
  <div class="navApp">
    <ul>
      <li v-for="(pref, index) in prefData" :key="index" class="pref_itemBox">
        <label>
          <input type="checkbox" @change="checkItem(pref)" />
          <span class="pref_text">{{ pref.prefName }}</span>
        </label>
      </li>
    </ul>
  </div>
</template>

<script>
import resasInfo from "@/library/resas.js"
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
    checkItem(pref) {
      // チェックされてる都道府県のみを配列に入れる
      const isExistencePref = this.prefectures.indexOf(pref)

      isExistencePref === -1
        ? this.prefectures.push(pref)
        : this.prefectures.splice(isExistencePref, 1)

      this.$store.dispatch("getPrefectures", this.prefectures)
    },
  },
}
</script>

<style lang="scss" scoped>
.navApp {
  ul {
    display: flex;
    border: 2px solid rgb(155, 154, 154);
    border-radius: 10px;
    width: 80%;
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
    align-items: center;
    gap: 1rem;
    margin: 0.6rem auto;
    margin-top: 1.2rem;
    padding: 1.2rem;

    .pref_itemBox {
      padding: 5px;

      &:hover {
        background-color: rgb(224, 224, 224);
        text-decoration: underline;
      }

      label {
        cursor: pointer;

        .pref_text {
          margin-left: 2px;
        }
      }
    }
  }
}
</style>
