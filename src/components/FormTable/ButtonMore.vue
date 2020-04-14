<template>
  <el-popover v-model="popoverVisible" trigger="click" popper-class="mf-button-more">
    <div @click.stop="buttonClick">
      <slot />
    </div>
    <el-button slot="reference" size="mini" style="width: 70px;">{{ label }}<i class="el-icon-caret-bottom" /></el-button>
  </el-popover>
</template>

<script>


const props = {
  label: {
    type: String,
    default: '更多'
  }
}

export default {
  name: 'MfButtonMore',
  props,
  data() {
    return {
      popoverVisible: false
    }
  },
  methods: {
    buttonClick() {
      this.popoverVisible = false
    }
  }
}
</script>

<style lang="less">
.mf-button-more {
  min-width: 80px!important;
  .el-button {
    display: block;
  }
  .el-button + .el-button {
    margin-left: 0;
  }
  .el-button--text {
    color: #606266;;
  }
  .el-button--text:hover {
    color: @theme;;
  }
}
</style>
