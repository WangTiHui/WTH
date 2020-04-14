<template>
  <el-breadcrumb separator="/" class="crumblist">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="(route) in CrumbList"
        :key="route.name"
        :to="{name:route.name}"
      >{{route.meta.name}}</el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["CrumbList"])
  }
};
</script>

<style lang="less" scoped>
.crumblist {
  font-size: 15px;
}
</style>