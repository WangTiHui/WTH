<template>
  <!--  v-if="showThis" -->
  <div class="divParent">
    <el-row>
      <el-col :span="16" :lg="24" :md="24" :sm="20" :xs="20">
        <ul class="ul">
          <template v-if="showImgs">
            <li v-for="item in fileImgList" :key="item">
              <div style="width:150px;height:150px;">
                <img :src="item" alt class="imgShow" />
                <a>
                  <span class="size">
                    <span class="sizebig" @click="bigImg(item)">
                      <span>
                        <i class="el-icon-zoom-in"></i>
                      </span>
                    </span>
                    <span class="sizedelete" @click="deleteImg(item)" v-show="!disabled">
                      <span>
                        <i class="el-icon-delete"></i>
                      </span>
                    </span>
                  </span>
                </a>
                <label class="label">
                  <i class="el-icon-upload-success el-icon-check"></i>
                </label>
              </div>
            </li>
          </template>
          <div v-show="uploadShow" :class="{'PADB20': showImgs}">
            <!-- :http-request="fnUploadRequest" -->
            <el-upload
              :action="uploadUrl"
              :headers="importHeaders"
              list-type="picture-card"
              :accept="typeImg"
              :limit="imgLimit"
              :multiple="isMultiple"
              :file-list="fileList"
              :on-remove="handleRemove"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              :on-exceed="handleExceed"
              :on-error="imgUploadError"
              name="image"
              @change="changeLength"
              :show-file-list="showFileList"
              @clearFiles="clearFiles"
              @submit.native.prevent
              :disabled="disabled"
              :data="upLoadData"
            >
              <i class="el-icon-plus"></i>
              <slot></slot>
            </el-upload>
          </div>
        </ul>
      </el-col>
    </el-row>
    <!-- :class="{hide:hideUpload}" -->
    <div class="maskDialog" v-show="dialogVisible">
      <div class="maskContent">
        <div class="maskHeader">
          <span></span>
          <el-button class="closeBtn" @click="dialogVisible=false">
            <i class="el-icon-close"></i>
          </el-button>
        </div>
        <div class="maskContent">
          <img width="100%" :src="dialogImageUrl" alt />
        </div>
      </div>
    </div>
    <!-- <el-dialog :visible.sync="dialogVisible">
	        <img width="100%" :src="dialogImageUrl" alt="">  
    </el-dialog>-->
  </div>
</template>

<script>
import { type } from "os";
// import OSS from "ali-oss";
export default {
  data() {
    return {
      importHeaders: { "X-Api-Key": localStorage.getItem("token_gwt") },
      dialogImageUrl: "",
      dialogVisible: false,
      fileImgList: [],
      showImgList: [],
      showThis: true,
      width: "",
      height: "",
      showFileList: false,
      uploadShow: true,
      fileList: [],
      // hideUpload: false,//上传按钮是否隐藏
      isMultiple: true,
      fileImgIndex: 0, //删除的脚码
      urlList: [],
      ossData:{
        policy:'',
        accessid:'LTAIVwog4jjhbsin',
        accesssecret:'W20CFoT5fgYVIiA8LOnnBoF5hJn0DK',
        bucket:'istheone',
        region:'oss-cn-zhangjiakou',
      }
    };
  },
  props: {
    //允许上传的图片的数量
    imgLimit: {
      type: Number,
      default: 1
    },
    showImgs: {
      // 是否展示上传图片
      type: Boolean,
      default: true
    },
    // 图片上传的地址
    uploadUrl: {
      type: String,
      default: "http://istheone.oss-cn-zhangjiakou.aliyuncs.com"
    },
    // 图片的类型 png,jpg
    typeImg: {
      type: String,
      default: "image/*"
    },
    // 图片上传的大小
    typeSize: {
      type: Number,
      default: 2
    },
    // 图片上传的文件类型
    upLoadData: {
      type: Object,
      default: function() {
        return { image_name: "market" };
      }
    },
    // 图片开始默认的值
    productImgs: {
      type: Array,
      default: function() {
        return [];
      }
    },
    // 是否禁止上传
    disabled: {
      type: Boolean,
      default: false
    },
    //格式:750*520
    widthAndHeight: {
      type: String,
      default: ""
    }
  },
  created() {
    this.uploadShow = this.disabled ? false : true;
    this.setImgList();
  },
  methods: {
    async fnUploadRequest(option) {
      try {
        let vm = this;
        vm.disabled = true;
        // 获取OSS配置信息
        // let uploadFileApi = new UploadFileApi();
        // let ret = await uploadFileApi.fileOssParams();
        // if (!(ret.data && ret.data.code === "0" && ret.data.data)) {
        //   throw new Error("获取OSS参数失败");
        // }
        // let ossData = JSON.parse(ret.data.data);
        // let relativePath = ossData.relativePath;
        let client = new OSS.Wrapper({
          accessKeyId: this.ossData.accessid,
          accessKeySecret: this.ossData.accesssecret,
          bucket: this.ossData.bucket,
          region: this.ossData.region
        });
        let file = option.file;
        const point = file.name.lastIndexOf(".");
        let suffix = file.name.substr(point);
        let fileName = file.name.substr(0, point);
        let date = vm.$moment().format("YYYYMMDDHHmm");
        let fileNames = `${fileName}_${date}${suffix}`;
        // 分片上传文件
        ret = await client.multipartUpload(relativePath + fileNames, file, {
          progress: async function(p) {
            let e = {};
            e.percent = p * 100;
            option.onProgress(e);
          }
        });
        console.log(ret);
        if (ret.res.statusCode === 200) {
          // option.onSuccess(ret)
          return ret;
        } else {
          vm.disabled = false;
          option.onError("上传失败");
        }
      } catch (error) {
        console.error(error);
        this.disabled = false;
        option.onError("上传失败");
        this.$error(error.message);
      }
    },
    updateImg() {
      this.uploadShow = this.disabled ? false : true;
      this.clearFiles();
      this.setImgList();
    },
    // 清空图片数组，防止编辑新增的时候的默认图片
    clearFiles() {
      this.fileImgList = [];
      this.fileList = [];
    },
    // 图片组件重新渲染
    setImgList() {
      let productImgs = this.productImgs.filter(elem => elem !== "");
      setTimeout(() => {
        this.$nextTick(() => {
          if (productImgs.length > 0) {
            for (let i = 0; i < productImgs.length; i++) {
              this.fileImgList.push(productImgs[i]);
            }
            this.fileImgList = Array.from(
              new Set(this.fileImgList, productImgs)
            );
          }
          this.showThis = true;
          this.isLimitLength();
        });
      }, 200);
    },
    // 超过长度上传按钮隐藏
    changeLength(file, fileList) {
      // this.hideUpload = fileList.length >= this.imgLimit;
      if (fileList.length >= this.imgLimit) {
        this.uploadShow = this.disabled ? false : true;
      }
    },
    handleRemove(file, fileList) {
      //移除图片
      this.fileList.splice(this.fileImgIndex, 1);
    },
    beforeAvatarUpload(file) {
      //文件上传之前调用做一些拦截限制
      //   图片类型限制
      let isJPG = false;
      if (this.typeImg == "image/*") {
        if (
          file.type == "image/jpg" ||
          file.type == "image/png" ||
          file.type == "image/jpeg" ||
          file.type == "image/gif"
        ) {
          isJPG = true;
        } else {
          isJPG = false;
        }
      } else if (
        this.typeImg == "image/jpg" ||
        this.typeImg == "image/png" ||
        this.typeImg == "image/jpeg" ||
        this.typeImg == "image/gif"
      ) {
        isJPG = file.type === this.typeImg;
      } else {
        isJPG = false;
      }
      let typesizes = this.typeSize;
      const isLt2M = file.size / 1024 / 1024 < this.typeSize;
      if (!isJPG) {
        this.$message.error("图片格式错误!");
        return false;
      }
      // 图片大小
      if (!isLt2M) {
        if (this.typeSize < 1) {
          this.$message.error(
            "上传图片大小不能超过 " + this.typeSize * 1024 + "K!"
          );
          return false;
        } else {
          this.$message.error("上传图片大小不能超过 " + typesizes + "MB!");
          return false;
        }
      }
      // 图片宽高限制
      var _this = this;
      let setWidthAndHeight = this.widthAndHeight;
      return new Promise(function(resolve, reject) {
        var reader = new FileReader();
        reader.onload = function(event) {
          var image = new Image();
          image.onload = function() {
            var width = this.width;
            var height = this.height;
            if (
              setWidthAndHeight == "" ||
              setWidthAndHeight == "undefined" ||
              setWidthAndHeight == undefined
            ) {
            } else {
              // 只有一个值的时候 0代表上传的图片的宽度或者高度不能超过一个值
              let widthBasic = setWidthAndHeight.split("*")[0];
              let heightBasic = setWidthAndHeight.split("*")[1];
              // let widthBasic = setWidthAndHeight.width;
              // let heightBasic = setWidthAndHeight.height
              if (
                heightBasic == 0 ||
                widthBasic == 0 ||
                heightBasic == -1 ||
                widthBasic == -1
              ) {
                if (heightBasic == 0 && width > widthBasic) {
                  _this.$message.error("图片尺寸错误");
                  reject();
                  return false;
                }
                if (widthBasic == 0 && height > heightBasic) {
                  _this.$message.error("图片尺寸错误");
                  reject();
                  return false;
                }
                // 只有一个值的时候 -1代表上传的图片的宽度或者高度不能低于一个值
                if (heightBasic == -1 && width < widthBasic) {
                  _this.$message.error("图片尺寸错误");
                  reject();
                  return false;
                }
                if (widthBasic == -1 && height < heightBasic) {
                  _this.$message.error("图片尺寸错误");
                  reject();
                  return false;
                }
              } else {
                if (widthBasic != width || heightBasic != height) {
                  _this.$message.error("图片尺寸错误");
                  reject();
                  return false;
                }
              }
            }
            resolve();
          };
          image.src = event.target.result;
        };
        reader.readAsDataURL(file);
      });

      return isJPG && isLt2M;
    },
    handleAvatarSuccess(res, file) {
      //图片上传成功
      if (res.code == 200) {
        let urlListCopy = [];
        urlListCopy.push(
          res.data.upload_url ||
            res.data.basics_url ||
            res.data.backend_url ||
            res.data.tutorial_url ||
            res.data
        );
        urlListCopy.forEach(e => {
          this.fileImgList.push(e);
          if (!this.showImgs) {
            // 返回字符
            this.$emit("urlList", e);
          }
        });
        // this.fileImgList = this.fileImgList.concat(urlListCopy)
        // console.log(this.fileImgList.length,"fileLength")
        // console.log(this.urlList,"fileList")
        // console.log(urlListCopy,"urlCopy")
        if (this.showImgs) {
          // 返回数组
          this.$emit("urlList", this.fileImgList);
        }
        this.isLimitLength();
        // this.imageUrl = URL.createObjectURL(file.raw);
      } else {
        this.$message.error(res.message);
        this.fileList.splice(this.fileImgIndex, 1); // 接口返回错误，指定地方删除upload数组里的指定图片
      }
    },
    isLimitLength() {
      //   判断是否超过所允许的长度
      if (this.fileImgList.length >= this.imgLimit) {
        this.uploadShow = false;
      } else {
        this.uploadShow = this.disabled ? false : true;
      }
    },
    handleExceed(files, fileList) {
      //图片上传超过数量限制
      this.$message.error("上传图片不能超过" + this.imgLimit + "张!");
      return false;
    },
    imgUploadError(err, file, fileList) {
      //图片上传失败调用
      this.$message.error("上传图片失败!");
      this.fileList.splice(this.fileImgIndex, 1);
      return false;
    },
    bigImg(e) {
      for (let index = 0; index < this.fileImgList.length; index++) {
        if (e == this.fileImgList[index]) {
          this.dialogImageUrl = e;
          this.dialogVisible = true;
        }
      }
    },
    deleteImg(e) {
      for (let i = 0; i < this.fileImgList.length; i++) {
        if (this.fileImgList[i] == e) {
          this.fileImgList.splice(i, 1);
          this.fileImgIndex = i;
        }
      }
      this.$emit("urlList", this.fileImgList);
      this.handleRemove();
      this.isLimitLength();
    }
  }
};
</script>

<style lang="less" scoped>
.hide .el-upload--picture-card {
  display: none;
}
// .el-upload {
//     .el-upload-picture-card{
//         width: 136px!important;
//         height: 136px!important;
//         line-height: 134px!important;
//     }
// }
.ul {
  // height: 150px;
  display: flex;
  list-style: none;
  display: inline-block;
  max-width: 796px;
  flex-wrap: wrap;
  li {
    float: left;
    position: relative;
    overflow: hidden;
    background-color: #fff;
    border: 1px solid #c0ccda;
    border-radius: 6px;
    box-sizing: border-box;
    width: 148px;
    height: 148px;
    margin: 0 8px 8px 0;
    display: inline-block;
    img {
      height: 100%;
      width: 100%;
    }
    a {
      .size {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        cursor: default;
        text-align: center;
        color: #fff;
        opacity: 0;
        font-size: 20px;
        background-color: rgba(0, 0, 0, 0.5);
        -webkit-transition: opacity 0.3s;
        transition: opacity 0.3s;
        .sizebig {
          cursor: pointer;
        }
        .sizedelete {
          position: static;
          font-size: inherit;
          color: inherit;
          margin-left: 15px;
          cursor: pointer;
        }
      }
      .size::after {
        display: inline-block;
        content: "";
        height: 100%;
        vertical-align: middle;
      }
    }
    a:hover .size {
      opacity: 0.8;
    }
    .label {
      display: block;
      position: absolute;
      right: -15px;
      top: -6px;
      width: 40px;
      height: 24px;
      background: #13ce66;
      text-align: center;
      -webkit-transform: rotate(45deg);
      transform: rotate(45deg);
      box-shadow: 0 0 1pc 1px rgba(0, 0, 0, 0.2);
      i {
        color: #fff;
        font-size: 12px;
        margin-top: 11px;
        -webkit-transform: rotate(-45deg);
        transform: rotate(-45deg);
        line-height: 1;
      }
    }
  }
  div {
    display: inline-block;
  }
}
.el-upload--picture-card {
  display: inline-block;
  flex-wrap: wrap;
}
.maskDialog {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1050;
  overflow: auto;
  margin: 0;
  min-width: 1000px;
  background: rgba(0, 0, 0, 0.5);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  .maskContent {
    background: #fff;
    position: relative;
    margin: 0 auto 50px;
    border-radius: 2px;
    // box-shadow: 0 1px 3px rgba(0,0,0,.3);
    box-sizing: border-box;
    width: 64%;
    margin-top: 8vh;
    .maskHeader {
      height: 30px;
      .closeBtn {
        position: absolute;
        top: 20px;
        right: 20px;
        padding: 0;
        background: 0 0;
        border: none;
        outline: 0;
        cursor: pointer;
        font-size: 16px;
      }
    }
    .maskContent {
      color: #606266;
      font-size: 14px;
      word-break: break-all;
      padding-bottom: 5vh;
    }
  }
}
::-webkit-scrollbar {
  width: 5px; /*滚动条宽度*/
  height: 5px; /*滚动条高度*/
  background-color: #ccc;
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  -webkit-box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.3);
  background-color: #ccc; /*滚动条的背景颜色*/
}
.imgShow {
  width: 136px;
  height: 136px;
}
</style>