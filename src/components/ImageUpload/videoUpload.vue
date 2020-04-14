<template>
	<div class="divParent" >
        <div style="width:400px;height:260px;" v-show="!uploadShow">
            <videoPlayer ref="videoPlayerDom" :videoUrl="shopVideoUrl"/>
            <div>
                <el-button size="mini" type="danger" @click="deleteImg()" icon="el-icon-delete"></el-button>
            </div>
        </div>
        <div v-show="uploadShow" style="padding-bottom:20px;">
            <el-upload
                :action="uploadUrl"
                :headers="importHeaders"
                list-type="picture-card"
                :limit="imgLimit"
                :accept="typeVideo"
                :multiple="isMultiple"
                :file-list="fileList"
                :on-remove="handleRemove"
                :on-success="handleAvatarSuccess"
                :on-exceed="limitNumber"
                :before-upload="beforeAvatarUpload"
                :on-error="imgUploadError"
                name="video"
                @change="changeLength"
                :show-file-list="showFileList"
                @clearFiles="clearFiles"
                @submit.native.prevent
                :data="upLoadData">
                <i class="el-icon-plus"></i>
                <slot></slot>
            </el-upload>
        </div>
	</div>
</template>

<script>
import { type } from 'os';
import videoPlayer from '@/components/videoPlayer/videoPlayer'
	export default {
	    data() {
	      return {
	      	importHeaders: {'X-Api-Key': localStorage.getItem('token_gwt')},
	        dialogImageUrl: '',
	        dialogVisible: false,
            showImgList:[],
            width:"",
            height:"",
            showFileList:false,
            uploadShow:true,
            fileList:[],
            // hideUpload: false,//上传按钮是否隐藏
            isMultiple: true,
            fileImgIndex:0,//删除的脚码
            urlList:[],
            shopVideoUrl:''
	      }
	    },
	    props:{
            //允许上传的视频的数量
	    	imgLimit:{
	    		type: Number,
	    		default: 1
            },
            typeVideo: { // 视频类型
            type: String,
                default: 'video/mp4'
            },
            // 视频上传的地址
	    	uploadUrl:{
	    		type: String,
	    		default:'/api/common/upload-video'
            },
            // 视频上传的大小
	    	typeSize: {
	    		type: Number,
	    		default: 30
            },
            // 视频上传的文件类型
	    	upLoadData:{
	    		type: Object,
	            default: function () {
	                return { image_name:'market' }
	            }
            },
            // 视频开始默认的值
            productImgs: {
                type:String
            },
        },
	    mounted(){
        //  console.log('upload参数');
        //  console.log(this.productImgs);
        },
        created(){
            // this.updateImg()
        },
	    methods: {
            updateImg(url){
                this.shopVideoUrl=url
                if(this.shopVideoUrl!=''){
                    this.uploadShow = false
                }else{
                    this.uploadShow = true
                }
                this.$nextTick(()=>{
                    this.$refs.videoPlayerDom.updateVideo()
                })
            },
            // 清空视频数组，防止编辑新增的时候的默认视频
            clearFiles(){
                this.shopVideoUrl = ''
                this.fileList = [];
            },
            // 视频组件重新渲染
            setImgList(){
                setTimeout(() => {
                    this.$nextTick(()=>{
                        this.shopVideoUrl=this.productImgs 
                    })
                }, 200);
            },
            // 超过长度上传按钮隐藏
            changeLength(file,fileList){
                // this.hideUpload = fileList.length >= this.imgLimit;
                if(fileList.length >= this.imgLimit){
                    this.uploadShow = true
                }
            },
          handleRemove(file, fileList) {//移除视频
            this.fileList = []
	      },
          beforeAvatarUpload(file) {//文件上传之前调用做一些拦截限制
            let isVideo = false
            if (file.type === 'video/mp4') {
                isVideo = true
            }
            if (!isVideo) {
                this.$message.error('视频格式错误!')
                return false
            }
            let typesizes = this.typeSize
	        const isLt2M = file.size / 1024 / 1024 < this.typeSize;
             // 视频大小
	        if (!isLt2M) {
                if(this.typeSize<1){
                    this.$message.error('上传视频大小不能超过 '+this.typeSize*1024+'K!');
                    return false;
                }else{
                    this.$message.error('上传视频大小不能超过 '+typesizes+'MB!');
                    return false
                }
            }
            
	        return isLt2M;
          },
          handleAvatarSuccess(res, file) {//视频上传成功
            if(res.code==200){
                this.shopVideoUrl = res.data.upload_url || res.data
                this.$emit('urlList',this.shopVideoUrl);
                this.$refs.videoPlayerDom.updateVideo()
                this.uploadShow = false
            }else{
                this.$message.error(res.message)   
                this.fileList.splice(this.fileImgIndex,1)// 接口返回错误，指定地方删除upload数组里的指定视频
            }
          },
	      imgUploadError(err, file, fileList){//视频上传失败调用
            this.$message.error('上传视频失败!');
            this.fileList.splice(1,1)
            return false
          },
          deleteImg(e){
              this.shopVideoUrl = ''
              this.$emit('urlList',this.shopVideoUrl);
              this.$refs.videoPlayerDom.updateVideo()
              this.uploadShow = true
              this.handleRemove()
          },
          //上传文件数量大于指定数量处理
          limitNumber(files, fileList) {
          	 if (files.length>this.imgLimit) {
          	 	this.$message.error('视频暂不支持多选!');
          	 	return false;
          	 }
          }
        },
        components:{
            videoPlayer
        }
	}
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
    .ul{
        // height: 150px;
        display: flex;
        list-style: none;
        display: inline-block;
        max-width: 796px;
        flex-wrap: wrap;
        li{
            float: left;
            position: relative;
            overflow: hidden;
            background-color: #fff;
            border: 1px solid #c0ccda;
            border-radius: 6px;
            box-sizing: border-box;
            width: 800px;
            height: 500px;
            margin: 0 8px 8px 0;
            display: inline-block;
            img{
                height: 100%;
                width: 100%;
            }
            a{
                .size{
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
                    background-color: rgba(0,0,0,.5);
                    -webkit-transition: opacity .3s;
                    transition: opacity .3s;
                    .sizebig{
                        cursor: pointer;
                    }
                    .sizedelete{
                        position: static;
                        font-size: inherit;
                        color: inherit;
                        margin-left: 15px;
                        cursor: pointer;
                    }
                }
                .size::after{
                    display: inline-block;
                    content: "";
                    height: 100%;
                    vertical-align: middle;
                }
            }
            a:hover .size{
                opacity: 0.8;
            }
            .label{
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
                box-shadow: 0 0 1pc 1px rgba(0,0,0,.2);
                i{
                    color: #fff;
                    font-size: 12px;
                    margin-top: 11px;
                    -webkit-transform: rotate(-45deg);
                    transform: rotate(-45deg);
                    line-height: 1;
                }
            }
        }
        div{
            display: inline-block;
        }
    }
    .el-upload--picture-card{
        display: inline-block;
        flex-wrap: wrap;
    }
    .maskDialog{
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: 1050;
        overflow: auto;
        margin: 0;
        min-width: 1000px;
        background: rgba(0,0,0,.5);
        box-shadow: 0 1px 3px rgba(0,0,0,.3);
        .maskContent{
            background: #FFF;
            position: relative;
            margin: 0 auto 50px;
            border-radius: 2px;
            // box-shadow: 0 1px 3px rgba(0,0,0,.3);
            box-sizing: border-box;
            width: 64%;
            margin-top: 8vh;
            .maskHeader{
                height: 30px;
                .closeBtn{
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
            .maskContent{
                color: #606266;
                font-size: 14px;
                word-break: break-all;
                padding-bottom: 5vh;
            }
        }
    }
    ::-webkit-scrollbar
  {
    width: 5px;  /*滚动条宽度*/
    height: 5px;  /*滚动条高度*/
    background-color: #ccc;
  }

  /*定义滑块 内阴影+圆角*/
  ::-webkit-scrollbar-thumb
  {
    -webkit-box-shadow: inset 0 0 4px rgba(0,0,0,.3);
    background-color: #ccc;  /*滚动条的背景颜色*/
  }
    .imgShow{
        width: 136px;
        height: 136px;
    }
</style>