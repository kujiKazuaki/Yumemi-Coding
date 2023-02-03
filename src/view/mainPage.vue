<template>
  <div>
    <router-link to="/NaviBar">NaviBar</router-link>
    <TopFront />
  </div>
</template>

<script>
import TopFront from "@/view/TopFront.vue"

export default {
  components: {
    TopFront,
  },
}
</script>
