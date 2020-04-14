<template>
  <div>
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10,15, 20, 30, 50,100]"
      :page-size="pageSize"
      layout="total,sizes, prev, pager, next, jumper"
      :total="total"
      class="right"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    currentPage: {
      type: Number,
      default: 1
    },
    total: {
      type:Number,
      default: 0
    },
    pageSize: {
      type: Number,
      default: 10
    }
  },
  methods: {
    handleCurrentChange(size) {
      this.$emit("handleCurrentChange", size);
    },
    handleSizeChange(size){
        console.log(size)
      this.$emit("handleSizeChange",size)
    },
  }
};
</script>

<style lang="less" scoped>
.right {
  float: right;
}
</style>