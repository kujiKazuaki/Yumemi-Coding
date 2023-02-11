<template>
  <div class="allContainer">
    <div class="Header">
      <Header />
    </div>
    <div class="Front">
      <NaviBar />
      <TopFront />
    </div>
    <div class="Footer">
      <Footer />
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue"
import TopFront from "@/view/TopFront.vue"
import NaviBar from "@/view/NaviBar.vue"
import Footer from "@/components/Footer.vue"

export default {
  components: {
    Header,
    TopFront,
    NaviBar,
    Footer,
  },
}
</script>

<style lang="scss">
@import url(@/assets/CSS/reset.scss);
.allContainer {
  min-height: 100vh;
  background-color: rgb(255, 252, 249);
  position: relative;

  .Footer {
    width: 100%;
    position: absolute;
    bottom: 0;
  }
}

@media screen and (max-width: 1000px) {
  .allContainer {
    min-width: 1000px;
  }
}
</style>
