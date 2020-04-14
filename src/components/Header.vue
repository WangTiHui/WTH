<template>
  <div class="header">
    <div class="left">
      <img
        src="@/assets/images/more-line.png"
        :class="{'rotateicon':true, 'activeicon': AsideMenuCollapse}"
        @click="toggleAsideMenuCollapse"
      />
    </div>
    <div class="right">
      <el-badge class="item" is-dot>
        <i class="el-icon-date"></i>
      </el-badge>
      <el-badge class="item" is-dot>
        <i class="el-icon-edit"></i>
      </el-badge>
      <el-avatar :size="35" class="item">user</el-avatar>
      <span class="name">小瓜</span>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      circleUrl:
        "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
    };
  },
  computed: {
    ...mapState(["AsideMenuCollapse"])
  },
  methods: {
    toggleAsideMenuCollapse() {
      this.$store.commit("toggleAsideMenuCollapse");
    }
  }
};
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  height: 100%;
}
.right {
  float: right;
  display: flex;
  align-items: center;
  height: 100%;
}
.left {
  float: left;
}
.name {
  font-size: 13px;
  color: @font;
  margin-left: 10px;
}
.item {
  margin-left: 20px;
}
.rotateicon {
  width: 30px;
  margin-top: 15px;
  transition: transform 0.5s;
}
.activeicon {
  transform: rotate(90deg);
}
</style>