<template>
  <div class="w-article">
    <el-row>
      <el-col :span="8" v-for="(item,index) in list" :key="index" style="margin-right:20px;">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <el-image :lazy="true" style="height:80px;" :src="item.topbg"></el-image>
          </div>
          <div>
            <div>
              <span class="font-s18 font-w6">{{item.title}}</span>
              <span class="MR10 ML10">-</span>
              <span>{{item.author}}</span>
            </div>
            <div>
              {{item.time}}
            </div>
            <div>
              {{item.content}}
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12"></el-col>
    </el-row>
  </div>
</template>

<script>
import hobbyObj from "@/utils/json/hobby.json";
export default {
  data() {
    return {
      list: []
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      this.list = hobbyObj.article.list;
      console.log(this.list)
    },
  }
};
</script>

<style lang='less'>
.w-article {
  .clearfix {
    width: 100%;
    height: 80px;
  }
  
}
</style>