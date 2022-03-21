<template>
                <div class="swiper-container" id="floor1Swiper">
                <div class="swiper-wrapper">
                  <div
                    class="swiper-slide"
                    v-for="(item, index) in list"
                    :key="item.id"
                  >
                    <img :src="item.imgUrl" />
                  </div>
                </div>
                <!-- 如果需要分页器 -->
                <div class="swiper-pagination"></div>

                <!-- 如果需要导航按钮 -->
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
              </div>
</template>
 
<script>
import Swiper from "swiper";
export default {
  name:'Carousel',
  props:['list'],
  watch: {
    list: {
      // 就是这个属性导致了bug
      immediate:true,
      handler(newValue, oldValue) {
        this.$nextTick(() => {
          new Swiper(".swiper-container", {
            autoplay:2000,
            loop: true,
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
    //         effect:'cube',
             observer:true,//修改swiper自己或子元素时，自动初始化swiper 
    observeParents:true//修改swiper的父元素时，自动初始化swiper
          });
        });
      },
    },
  },
};
</script>
 
<style scoped lang = "less">
.swiper-slide{
  
}


</style>