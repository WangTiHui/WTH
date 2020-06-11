<template>
	<div v-if="showThis">
        <!-- :widthAndHeight="widthAndHeight" -->
		<el-upload
	        :action="uploadUrl"
	        :headers="importHeaders"
	        list-type="picture-card"
	        :accept="typeImg"
	        :limit="imgLimit"
	        :file-list="fileImgList"
	        :multiple="isMultiple"
	        :on-preview="handlePictureCardPreview"
	        :on-remove="handleRemove"
	        :on-success="handleAvatarSuccess"
	        :before-upload="beforeAvatarUpload"
	        :on-exceed="handleExceed"
	        :on-error="imgUploadError"
	        name="image"
            v-show="fileImgList.length<imgLimit"
	        :data="upLoadData">
	        <i class="el-icon-plus"></i>
	        
	        <slot></slot>
	    </el-upload>
	    <el-dialog :visible.sync="dialogVisible">
	        <img width="100%" :src="dialogImageUrl" alt="">
	    </el-dialog>
	</div>
	<!---->
</template>

<script>
import { type } from 'os';
	export default {
	    data() {
	      return {
	      	importHeaders: {'X-Api-Key': localStorage.getItem('token_gwt')},
	        dialogImageUrl: '',
	        dialogVisible: false,
            fileImgList:[],
            widthAndHeight:"",
	        isMultiple: true,
            urlList:[],
            showThis:true,
	      }
	    },
	    props:{
	    	imgLimit:{
	    		type: Number,
	    		default: 1
            },
	    	uploadUrl:{
	    		type: String,
	    		default:'http://www.wangth132.com/image'
	    	},
	    	typeImg:{
	    		type: String,
	    		default:'image/*'
	    	},
	    	typeSize: {
	    		type: Number,
	    		default: 2
            },
	    	upLoadData:{
	    		type: Object,
	            default: function () {
	                return { image_name:'market' }
	            }
            },
            productImgs: {
                type:Array,
                default: function () {
	                return []
	            }
            },
            //格式:750*520
            // setWidthAndHeight:{
            //     type:String
            // }
        },
	    mounted(){
            console.log('upload参数');
            // if(this.setWidthAndHeight == "undefined"||this.setWidthAndHeight == undefined){
            //     this.setWidthAndHeight = ""
            // }else{
            //     this.widthAndHeight = this.setWidthAndHeight;
            // }
        },
        created(){
            console.log('upload参数');
            this.setImgList();
            this.showThis = false
        },
	    methods: {
            setImgList(){
                setTimeout(() => {
                    this.$nextTick(()=>{
                        this.showThis = true
                    })
                }, 500);
                if(this.productImgs=='undefined'||this.productImgs==undefined){
                    this.fileImgList = []
                    this.productImgs = []
                }else{
                    console.log(this.productImgs,"默认图片")
                    if(this.productImgs.length>0){
                        for(let i =0;i<this.productImgs.length;i++){
                            this.fileImgList.push({name:i,url:this.productImgs[i]})
                        }
                    }
                }
            },
	      handleRemove(file, fileList) {//移除图片
	        console.log(file, fileList);
	      },
	      handlePictureCardPreview(file) {//预览图片时调用
	        console.log(file);
	        this.dialogImageUrl = file.url;
	        this.dialogVisible = true;
	      },
	 
	      beforeAvatarUpload(file) {//文件上传之前调用做一些拦截限制
	        console.log('图片类型')
//	        const isJPG = true;
            if (this.typeImg=='image/*') {
            	var isJPG = true;
            }else {
            	var isJPG = file.type === this.typeImg;
            }
	        
	        const isLt2M = file.size / 1024 / 1024 < this.typeSize;
	         if (!isJPG) {
	           this.$message.error('上传头像图片只能是 '+this.typeImg+' 格式!');
	         }
	        if (!isLt2M) {
	          this.$message.error('上传图片大小不能超过 '+this.typeSize+'MB!');
            }
            if(this.widthAndHeight==""){

            }else{
                const isSize = new Promise(function(resolve, reject) {
                let width = this.widthAndHeight.split(",")[0];
                let height = this.widthAndHeight.split(",")[1];
                let _URL = window.URL || window.webkitURL;
                let image = new Image();
                image.onload = function() {
                let valid = image.width == width && image.height == height;
                valid ? resolve() : reject();
                };
                image.src = _URL.createObjectURL(file);
            }).then(
                () => {
                return file;
                },
                () => {
                this.$message.error("上传头像图片尺寸不符合,只能是"+width+"*"+height+"!");
                return Promise.reject();
                }
            );
            }
            
	        return isJPG && isLt2M;
	      },
	      handleAvatarSuccess(res, file) {//图片上传成功
	      	console.log(this.productImgs,"proImages")
	      	this.urlList.push(res.data.basics_url||res.data.backend_url||res.data.tutorial_url||res.data)
	      	this.$emit('urlList',this.urlList);
	        console.log(res);
	        this.imageUrl = URL.createObjectURL(file.raw);
	      },
	      handleExceed(files, fileList) {//图片上传超过数量限制
	        this.$message.error('上传图片不能超过'+this.imgLimit+'张!');
//	        console.log(file, fileList);
	      },
	      imgUploadError(err, file, fileList){//图片上传失败调用
	        console.log(err)
	        this.$message.error('上传图片失败!');
	      }
	    }
	}
</script>

<style lang="less" scoped>
    
</style>