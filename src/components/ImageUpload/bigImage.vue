<template>
  <div class="mf-bigImage">
      <el-dialog class="mf-dialog" title="查看图片" :append-to-body="true" :visible.sync="showBigImage" @close="closeBigImage" width="64%">
            <el-carousel :height="imgHeight+'px'" :autoplay="false" arrow="always">
                <el-carousel-item v-for="(item,index) in iamges" :key="index">
                    <div class="textCenter">{{index+1}}/{{iamges.length}}</div>
                    <div class="textCenter">
                        <el-image :style="{'height': 600+'px'}" :src="item" fit="contain"></el-image>
                    </div>
                </el-carousel-item>
            </el-carousel>
      </el-dialog>
  </div>
</template>

<script>
import { get } from 'http'
export default {
    data(){
        return{
            iamges:[],
            showBigImage:false,
            imgHeight:650
        }
    },
    mounted(){
        
    },
    methods:{
        bigImageInit(imgs){
            this.showBigImage = true
            let imgHeightArr=[]
            this.$nextTick(()=>{
                this.iamges = imgs
                // this.iamges.forEach(e=>{
                //     imgHeightArr.push(this.getImgInfo(e))
                // })
                imgHeightArr.sort()
                this.imgHeight = imgHeightArr[imgHeightArr.length-1]
                document.getComputedStyle
            })
        },
        getImgInfo (getImage) {
            let img = new Image()
            img.src = getImage
            return img.height
        },
        closeBigImage(){
            this.iamges = []
        }
    }
}
</script>

<style lang="less" scoped>
.textCenter{
    text-align: center;
    vertical-align: middle;
}  
img{
    width: 750px;
    }
    .el-carousel__container{
        .el-carousel__item{
            vertical-align: middle;
        }
    }
</style>