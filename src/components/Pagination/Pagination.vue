<template>
  <div class="pagination">
    <!-- 当前页码大于一不可操作 -->
    <button :disabled="mcPage === 1" @click="changeCurrentPage(mcPage-1)">上一页</button>

    <!-- 上部分 -->
    <button v-if="startEnd.start > 1"  @click="changeCurrentPage(1)">1</button>
    <button disabled v-if="startEnd.start > 2">···</button>

    <!-- 中间连续页码 -->

        <button
        v-for="(page, index) in startEnd.end"
            v-if="page >= startEnd.start"
      :key="page"
      
      @click="changeCurrentPage(page)"
      :class="{active:mcPage===page}"
    >
      {{ page }}
    </button>

    

    <!-- 下部分 -->
    <button disabled v-if="startEnd.end < totalPages - 1">···</button>
    <button v-if="startEnd.end < totalPages"  @click="changeCurrentPage(totalPages)">{{ totalPages }}</button>
    <button :disabled="mcPage === totalPages" @click="changeCurrentPage(mcPage+1)">下一页</button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  data() {
    return {
      mcPage: this.currentPage,
    };
  },
  props: {
    currentPage: {
      // 当前页码
      type: Number,
      default: 1,
    },
    pageSize: {
      // 每页数量
      type: Number,
      default: 5,
    },
    total: {
      // 总数量
      type: Number,
      default: 0,
    },
    showPageNo: {
      // 连续页码数
      type: Number,
      default: 5,
    },
  },
  watch: {
    currentPage(newValue) {
      this.mcPage = newValue;
    },
  },
  methods: {
    changeCurrentPage(page) {
      this.mcPage = page;
      this.$emit('currentChange',page)
    },
  },
  computed: {
    /* 
      总页码数
      依赖数据: 
        总数量: total    
        每页数量: pageSize  
      */
    totalPages() {
      // 取出依赖数据   31 5 ==> 7
      const { total, pageSize } = this;
      // 返回计算后的结果
      return Math.ceil(total / pageSize);
    },
    /* 
      返回连续页码的开始页码(start)与结束页码(end): 
      比如: {start: 3, end: 7}
      依赖数据:
          当前页码: mcPage
          最大连续页码数: showPageNo
          总页码数: totalPages
      注意:
          start的最小值为1
          end的最大值为totalPages
          start与end之间的最大差值为showPageNo-1
      */
    startEnd() {
      const { mcPage, showPageNo, totalPages } = this;
      // 计算start
      let start = mcPage - Math.floor(showPageNo / 2);
      // start的最小值是1, 如果小于1, 修正为1
      if (start < 1) {
        start = 1;
      }

      // 计算end
      // start与end之间的最大差值为showPageNo-1
      let end = start + showPageNo - 1;
      // 如果end超过了totalPages, 修正为totalPages
      if (end > totalPages) {
        end = totalPages;
        // 根据最大连续页码修正start
        start = end - showPageNo + 1;
        // start不能小于最小值1
        if (start < 1) {
          start = 1;
        }
      }
      return { start, end };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>