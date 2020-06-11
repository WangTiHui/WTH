<template>
  <div class="gadgets">
    <el-row>
      <el-col :span="3" v-for="(item,index) in list" :key="index">
        <div class="dolt">
          <div class="dolt-bg" :style="'background:'+item.bg"></div>
          <div class="dolt-content" :style="'color:'+item.color" @click="gotoSkill(item.path)">{{item.title}}</div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import skillObj from '@/utils/json/skill.json'
export default {
  data(){
    return{
      list:[]
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList(){
      this.list = skillObj.gadgets.list
    },
    gotoSkill(path){
      this.$router.push({
        path:path
      })
    }
  },
}
</script>

<style lang="less" scoped>
.gadgets{
  .dolt{
    height: 94px;
    position: relative;
    margin-left: 15px;
    opacity: 0.7;
    .dolt-bg{
      height: 94px;
      width: 100%;
      border-radius:10px;
    }
    .dolt-content{
      text-align: center;
      line-height: 94px;
      margin-top: -94px;
      cursor: pointer;
      z-index: 1;
    }
  }
  .dolt:hover{
    opacity: 1;
  }
}
</style>