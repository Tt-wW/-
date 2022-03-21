<template>
  <div>
    <TypeNav />
    <ListContainer />
    <Recommend />
    <Rank />
    <Like />
    <Floor v-for="(floor,index) in floorList" :key="floor.id" :childList="floor"/>
    <Brand />
  </div>
</template>
 
<script>
import ListContainer from "./ListContainer/ListContainer.vue";
import Recommend from "@/pages/Home/Recommend/Recommend.vue";
import Rank from "@/pages/Home/Rank/rank.vue";
import Like from "@/pages/Home/Like/index.vue";
import Floor from "@/pages/Home/Floor/floor.vue";
import Brand from "@/pages/Home/Brand/Brand.vue";
import {mapState} from 'vuex'

export default {
  components: { ListContainer, Recommend, Rank, Like, Floor, Brand },
  mounted() {
  this.$store.dispatch("getFloors")
},
computed:{
  ...mapState({
      floorList:state=>state.home.floorList
    })
},

};


</script>
 
<style scoped lang = "less">
</style>