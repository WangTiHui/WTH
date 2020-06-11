<template>
  <div>
    <el-row>
      <el-col :span="8" v-for="(item, index) in list" :key="index">
        <el-card>
          <div style="padding: 14px;">
            <span class="title">{{item.title}}</span>
            <div class="bottom clearfix">
              <span class="FL" style="line-height:36px;">{{ item.time }}</span>
              <el-link target="_blank" type="danger" class="FR" @click="gotoGames(item)">进入游戏</el-link>
            </div>
          </div>
          <img :src="item.img" class="image">
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import gameObj from '@/utils/json/life.json'
export default {
  data(){
    return{
      list:[]
    }
  },
  mounted(){
    this.getList()
  },
  methods:{
    getList(){
      this.list = gameObj.game.list
      console.log(this.list,"list")
    },
    gotoGames(obj){
      this.$router.push({
        path:obj.path
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .time {
    font-size: 13px;
    color: #999;
  }
  .title{
    font-size: 20px;
    font-weight: 600;
  }
  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  .clearfix:after {
      clear: both
  }
</style>