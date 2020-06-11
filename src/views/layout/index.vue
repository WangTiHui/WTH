<template>
  <el-container>
    <!-- <el-aside :width="AsideMenuCollapse?'64px':'200px'">
      <h3 class="title">{{AsideMenuCollapse?'王':'老王'}}</h3>
      <DynamicMenu />
    </el-aside> -->
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-main class="better-scrollbar">
        <router-view></router-view>
      </el-main>
      <div class="keep-record">
        <!-- <el-link :underline="false" target="_blank" href="http://beian.miit.gov.cn/">浙ICP备17022807号-1</el-link> -->
        <!-- <el-divider direction="vertical" /> -->
        <el-link :underline="false" target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33011002013438">
          <el-image fit="fill" src="https://istheone.oss-cn-zhangjiakou.aliyuncs.com/image/ga.png" />
        </el-link>
        <el-link :underline="false" target="_blank" href="http://beian.miit.gov.cn/">浙ICP备17022807号-1</el-link>
      </div>
    </el-container>
  </el-container>
</template>

<script>
import DynamicMenu from "./DynamicMenu";
import Header from "./Header";
import { mapState } from "vuex";

export default {
  components: { Header, DynamicMenu },
computed: {
    ...mapState(["AsideMenuCollapse"]),
//  ...mapState("modals", ["showFuncModal"])
},
//methods: {
//  updateShow(v) {
//    this.$store.commit("modals/SET_FUNCMODAL", v);
//  }
//},
  mounted() {}
};
</script>

<style lang="less" scoped>
.el-container {
  width: 100%;
  height: 100%;
}
.el-header,
.el-footer {
  background-color: @elbg;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08), 0 0 6px rgba(0, 0, 0, 0.04);
  z-index: 10;
}
.el-aside {
  transition: all 0.5s;
  background-color: @asidebg;
  color: @elbg;
  z-index: 10;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  &::-webkit-scrollbar {
    display: none;
  }
}
.el-main {
  background-color: @bodybg;
  min-width: 800px;
  letter-spacing: 1px;
  background: url('~@/assets/images/bg-img.png');
}
.title {
  text-align: center;
  line-height: 60px;
  height: 60px;
  background-color: @font;
}
.keep-record {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f2f5;
  .el-link {
    font-size: 12px;
    color: #999;
  }
  .el-image {
    width: 18px;
    height: 18px;
    margin: 6px 4px 0 0;
  }
  .el-divider {
    background: #ddd;
  }
}
</style>
