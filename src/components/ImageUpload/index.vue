<template>
  <div>
    <div
      :class="{'uploadbox':true, 'active-upload-box':image}"
      :style="`width:${width};height:${height};line-height:${height}`"
      @click="showImageModal"
    >
      <div class="imgbox" v-if="image" @click.stop>
        <img :src="image" alt />
        <div class="mask">
          <el-button type="danger" icon="el-icon-delete" circle size="mini" @click="removeimg"></el-button>
        </div>
      </div>
      <i class="el-icon-plus avatar-uploader-icon" v-else></i>
    </div>
    <ImageModal :show.sync="show" @select="select" v-if="show" />
  </div>
</template>

<script>
import ImageModal from "./ImageModal";
export default {
  data() {
    return {
      show: false,
      isShowImageDialog:true,
      imgs:[]
    };
  },
  components: {
    ImageModal
  },
  props: {
    width: {
      type: String,
      default: "80px"
    },
    height: {
      type: String,
      default: "80px"
    },
    image: {
      type: String,
      default: ""
    }
  },

  methods: {
    select(img) {
      this.$emit("update:image", img.url);
    },
    removeimg() {
      const msg = "确认删除吗？";
      this.$confirm(msg, "", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$emit("update:image", "");
      })
    },
    showImageModal() {
      this.show = true;
    }
  }
};
</script>

<style lang="less" scoped>
.uploadbox {
  border: 1px dashed @theme;
  box-sizing: border-box;
  text-align: center;
  color: @theme;
  cursor: pointer;
  font-size: 20px;
  position: relative;
  border-radius: 5px;
  overflow: hidden;
  background-color: @light_theme;
  transition: opacity 0.3s;
  &:hover {
    opacity: 0.7;
  }
}
.active-upload-box {
  border: 1px solid @theme;
  &:hover {
    opacity: 1;
  }
}
.imgbox {
  width: 100%;
  height: 100%;
  background: #fff;
  > img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  > .mask {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.6);
    opacity: 0;
    transition: opacity 0.3s;
    color: #fff;
    &:hover {
      opacity: 1;
    }
  }
}
</style>