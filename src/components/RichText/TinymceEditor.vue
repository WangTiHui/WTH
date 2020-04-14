<template>
  <div style="overflow: hidden;">
  	<div class="mf-tinymce">
      <!-- <el-button v-if="!showDisabled" class="mf-tiny-img" type="primary" size="mini" @click="openUploadImg" /> -->
      <el-button v-if="showDisabled" class="mf-tiny-img" type="primary" size="mini" />
      <imgUpload
        v-if="!showDisabled"
        ref="goodsUploadDom"
        class="mf-tiny-img"
        @urlList="goodsUrlList"
        :showImgs="false"
        :imgLimit="10000"
        :upLoadData="upLoadDataParam"
        :productImgs="goodsImgList"
        :uploadUrl="uploadUrl" />
      <editor
        :id="tinymceId"
        v-model="myValue"
        :init="init"
        :disabled="showDisabled"
        @onClick="onClick"
        style="z-index:2050;margin: 0;"
      />
  	</div>
    <!-- 添加图片 -->
    <el-dialog :visible.sync="uploadImgVisible" :append-to-body="true" class="mf-center-dialog" :before-close="cancelUploadImg" width="500px" :close-on-click-modal="false" title="添加图片">
      <div class="TC">
        <imgUpload
          ref="goodsUploadDom"
          @urlList="goodsUrlList"
          :upLoadData="upLoadDataParam"
          :productImgs="goodsImgList"
          :uploadUrl="uploadUrl" />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelUploadImg">取 消</el-button>
        <el-button type="primary" @click="saveUploadImg">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import imgUpload from "@/components/ImageUpload/imgUpload"
import tinymce from "tinymce/tinymce";
import Editor from "@tinymce/tinymce-vue";
import "tinymce/themes/silver";
// console.log("editor", tinymce, Editor);

import "tinymce/plugins/image";
import "tinymce/plugins/media";
import "tinymce/plugins/table";
import "tinymce/plugins/lists";
import "tinymce/plugins/wordcount";
// const toolbar = "undo redo |  formatselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image media table | removeformat"
export default {
  components: {
    Editor, imgUpload
  },
  props: {
    id: {
      type: String,
      default: function() {
        return 'vue-tinymce-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '')
      }
    },
    value: {
      type: String,
      default: ""
    },
    baseUrl: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    },
    plugins: {
      type: [String, Array],
      default: "lists image media table wordcount"
    },
    toolbar: {
      type: [String, Array],
      default:
        "undo redo | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image table"
    }
  },
  data() {
    return {
      showDisabled: false,
      init: {
        language_url: `${this.baseUrl}/tinymce/langs/zh_CN.js`,
        language: "zh_CN",
        skin_url: `${this.baseUrl}/tinymce/skins/ui/oxide`,
        content_css: `${this.baseUrl}/tinymce/skins/content/default/content.css`,
        height: 300,
        plugins: this.plugins,
        toolbar: this.toolbar,
        branding: false,
        menubar: false,
        selector: this.id,  // change this value according to your HTML
        content_style: "body,p,img {margin: 0px; border: 0px; padding: 0px; display: block;}",
        images_upload_handler: (blobInfo, success, failure) => {
          const img = "data:image/jpeg;base64," + blobInfo.base64();
          success(img);
        }
      },
      upLoadDataParam: {
        category: 'goods'
      },
      uploadUrl: '/api/common/upload-image',
      goodsImgList: [],
      goodsImg: '',
      uploadImgVisible: false,
      tinymceId: this.id,
      myValue: this.value
    };
  },
  mounted() {
    tinymce.init({});
    setTimeout(() => {
      this.showDisabled = this.disabled
    }, 500)
  },
  methods: {
    onClick(e) {
      this.$emit("onClick", e, tinymce);
    },
    clear() {
      this.myValue = "";
    },
    openUploadImg() {
      this.goodsImg = ''
      this.uploadImgVisible = true
      this.$nextTick(()=>{
        this.$refs.goodsUploadDom.updateImg()
      })
    },
    saveUploadImg() {
      if (!this.goodsImg) {
        return this.$message.error('请先上传图片')
      }
      window.tinymce.get(this.tinymceId).insertContent(`<img src="${this.goodsImg}" >`)
      this.cancelUploadImg()
      this.$message.success('添加图片成功')
    },
    cancelUploadImg() {
      this.uploadImgVisible = false
      this.$refs.goodsUploadDom.clearFiles()
    },
    goodsUrlList(val) {
      window.tinymce.get(this.tinymceId).insertContent(`<img src="${val}" >`)
    },
  },
  watch: {
    value(newValue) {
      this.myValue = newValue;
    },
    myValue(newValue) {
      this.$emit("input", newValue);
    },
    disabled(v) {
      this.showDisabled = v
    },
  }
};
</script>
<style lang="less">
.mf-tinymce {
  position: relative;
  float: left;
  width: 650px;
  .mf-tiny-img {
    position: absolute;
    padding: 0;
    opacity: 0;
    right: 65px;
    z-index: 100;
    width: 40px;
    height: 40px;
    .el-upload--picture-card {
      width: 40px;
      height: 40px;
      line-height: 50px;
    }
  }
}
.tox {
  position: static;

  .tox-dialog-wrap {
    z-index: 3000!important;
  }
  .tox-dialog-wrap__backdrop {
    z-index: 3001!important;
  }
  .tox-dialog {
    z-index: 3002!important;
  }
  .tox-tiered-menu {
    .tox-swatches {
      z-index: 3002!important;
    }
  }
}
 .tox-silver-sink {
    z-index: 3002!important;
  }
</style>