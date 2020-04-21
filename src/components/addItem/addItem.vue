<template>
  <div class="w-addItem">
    <el-dialog width="40%" @close="closeItemDialog" :visible.sync="showItemDialog" :title="itemTitle" :append-to-body="true">
      <el-form label-width="130px" :rules="rules" :model="articleForm" ref="articleForm">
        <el-form-item label="背景URL：" prop="topbg">
          <el-input v-model="articleForm.topbg" placeholder="请输入背景URL"></el-input>
        </el-form-item>
        <el-form-item label="标题：" prop="title">
          <el-input v-model="articleForm.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="作者：" prop="author">
          <el-input v-model="articleForm.author" placeholder="请输入作者名称"></el-input>
        </el-form-item>
        <el-form-item label="作品年限：" prop="time">
          <el-input v-model="articleForm.time" placeholder="请输入作品年限"></el-input>
        </el-form-item>
        <el-form-item label="主要内容：" prop="content">
          <el-input v-model="articleForm.content" placeholder="请输入主要内容"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeItemDialog">取消</el-button>
        <el-button type="danger" @click="confirm">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import hobbyObj from "@/utils/json/hobby.json";
export default {
  data(){
    return{
      showItemDialog:false,
      itemTitle:"",
      itemType:"",
      rules: {
        topbg: [
          { required: true,message: '请输入背景URL',trigger: 'blur' },
        ],
        title: [
          { required: true,message: '请输入标题',trigger: 'blur' }
        ],
        author: [
          {required: true,message: '请输入作者名称',trigger: 'blur' }
        ],
        time: [
          {required: true,message: '请输入作品年限',trigger: 'blur' }
        ],
        content: [
          {required: true,message: '请输入主要内容',trigger: 'blur' }
        ],
      },
      articleForm:{
        title:'',
        topbg:'',
        author:'',
        time:"",
        content:''
      },
      objList:[]
    }
  },
  methods:{
    itemDialogInit(title,type){
      this.itemTitle = title
      this.itemType = type
      this.showItemDialog = true
    },
    confirm(){
      this.$refs["articleForm"].validate((valid) => {
        if (valid) {
          hobbyObj.article.list.push({topbg:this.articleForm.topbg,title:this.articleForm.title,author:this.articleForm.author,time:this.articleForm.time,content:this.articleForm.content})
          setTimeout(()=>{
            this.closeItemDialog()
          },300)
        } else {
          return false;
        }
      });
    },
    closeItemDialog(){
      this.articleForm = {
        title:'',
        topbg:'',
        author:'',
        time:"",
        content:''
      }
      this.showItemDialog = false
    }
  }
}
</script>

<style lang="less" scoped>
.w-addItem{
  .el-form{
    .el-form-item__content{
      margin-bottom: 8px;
      width: 260px!important;
      .el-input{
          width: 260px;
      }
      .el-select{
          width: 260px;
      }
      .el-textarea{
        width:260px;
      }
    }
  }
}
</style>