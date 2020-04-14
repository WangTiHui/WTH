
<template>
  <el-menu
    class="asidemenu"
    :default-active="$route.name"
    @select="handleSelect"
    :background-color="menucolor.bg"
    :text-color="menucolor.unactive"
    :active-text-color="menucolor.active"
    :collapse="AsideMenuCollapse"
    :class="{collapsemenu: AsideMenuCollapse}"
    :unique-opened="true"
  >
    <template v-for="first in permission" v-if="!first.meta.hidden">
      <!-- 一级导航 -->
      <el-submenu
        v-if="first.children && first.children.length > 0"
        :key="first.name"
        :index="first.name">
        <template slot="title">
          <i :class="first.meta.icon" />
          <span>{{first.meta.name}}</span>
        </template>
        <!-- 二级导航 -->
        <template v-for="second in first.children" v-if="!second.meta.hidden">
          <el-submenu
            v-if="second.children && second.children.length > 0"
            :key="second.name"
            :index="second.name">
            <template slot="title">
              <i :class="second.meta.icon" />
              <span>{{second.meta.name}}</span>
            </template>
            <!-- 三级导航 -->
            <template v-for="third in second.children">
              <el-menu-item
                :key="third.name"
                :index="third.name"
                v-if="!third.meta.hidden"
              >{{third.meta.name}}</el-menu-item>
            </template>
          </el-submenu>
          <!-- 无三级导航直接渲染子级 -->
            <el-menu-item v-else-if="!second.meta.hidden" :key="second.name" :index="second.name">
              <template slot="title">
                <i :class="second.meta.icon" />
                <span>{{second.meta.name}}</span>
              </template>
            </el-menu-item>
          </template>
      </el-submenu>
      <!-- 无二级导航直接渲染子级 -->
      <el-menu-item v-else :key="first.name" :index="first.name">
        <template slot="title">
          <i :class="first.meta.icon" />
          <span>{{first.meta.name}}</span>
        </template>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script>
import { mapState } from "vuex";
import dynamicRouter from "@/router/dynamicRouter";
import api from "@/api/login";
export default {
  name: "asidemenu",
  data() {
    return {
	  permission:'',
	  userDetail:{},
      menucolor: {
        bg: "#292929",
        active: "#fff",
        unactive: "#fff"
      },
      dynamicRouter
    };
  },
  computed: {
    ...mapState(["AsideMenuCollapse"])
  },
  methods: {
    handleSelect(key, keyPath) {
      // console.log(key, keyPath);
      this.$router.push({ name: key });
    }
  }
};
</script>

<style lang="less">
.el-menu {
  font-size: 12px !important;
  border: none !important;
}
.asidemenu {
  transition: all 0.3s;
}
.collapsemenu > .el-menu-item span,
.collapsemenu > .el-submenu > .el-submenu__title span,
.collapsemenu > .is-opened > ul.el-menu {
  opacity: 0;
  width: 0;
}
.el-menu-item span,
.el-submenu > .el-submenu__title span,
.is-opened > ul.el-menu {
  opacity: 1;
  transition: all 0.3s;
}
.is-opened > ul.el-menu > .el-menu-item {
  background-color: #1f1f1f !important;
}
.is-opened > ul.el-menu > .el-menu-item.is-active {
  background-color: @theme !important;
}
</style>