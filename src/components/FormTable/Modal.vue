<template>
  <el-dialog class="mf-dialog"   :width="width" :title="title" :visible.sync="visible"  @close="closemodal" :show="show" :close-on-click-modal="false">
    <slot>弹窗提示</slot>
    <span slot="footer" class="dialog-footer" v-if="showfooter">
      <el-button @click="closemodal">{{canceltext}}</el-button>
      <el-button type="primary" @click="confirm">{{confirmtext}}</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      visible: this.show
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: "50%"
    },
    title: {
      type: String,
      default: ""
    },
    closeOnConfirm: {
      type: Boolean,
      default: true
    },
    confirmtext: {
      type: String,
      default: "确 定"
    },
    canceltext: {
      type: String,
      default: "取 消"
    },
    showfooter: {
      type: Boolean,
      default: true
    },
    height:{
      type:[String,Number]
    }
  },
  watch: {
    show() {
      this.visible = this.show;
    }
  },
  methods: {
    closemodal() {
      this.$emit("update:show", false);
      this.$emit("close");
    },
    confirm() {
      this.closeOnConfirm && this.$emit("update:show", false);
      this.$emit("confirm", true);
    }
  }
};
</script>

<style lang="less">

.el-dialog__wrapper {
  min-width: 1000px;
}
.fixmodal {
  .el-dialog {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto !important;
    transform: none;
    z-index: 99;
  }
}
.mf-dialog {
  .el-dialog {
    margin: 0 !important;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
.sosmqaer {
  .el-dialog {
    margin: 0 !important;
    top: 50%;
    left: 50%;
    height: 1000px;
    transform: translate(-50%, -50%);
  }
}
.el-dialog {
  display: flex;
  flex-direction: column;
  position: absolute;
  min-height: 200px;
  // -webkit-backface-visibility: hidden;

  max-height: calc(100% - 200px);
  max-width: calc(100% - 100px);
}
.el-dialog .el-dialog__body {
  flex: 1;
  overflow: auto;
  -ms-overflow-style: none; //IE 10+
  overflow: auto; //Firefox
  // min-width: 1000px;

  &::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 4px;
  }
  &::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: rgba(0, 0, 0, 0.2);
  }
  &::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 0;
    background: rgba(0, 0, 0, 0.1);
  }
}
</style>
