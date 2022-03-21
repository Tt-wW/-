<template>
  <div>
    <Header/>
    <router-view/>
    <Footer v-show="$route.meta.show" ></Footer>
  </div>
</template>





<script>
import Footer from '@/components/Footer/footer.vue'
import Header from '@/components/Header/header.vue'

export default {
  components: {
    Footer,
    Header
  },
  mounted() {
    // 性能优化
    this.$store.dispatch("categoryList");
  },
}
</script>

<style>

</style>
