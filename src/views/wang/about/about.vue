<template>
  <div>
    关于{{title}}
    <!-- <el-button @click="add">add</el-button> -->
  </div>
</template>

<script>
import aboutObj from '@/views/wang/about/about.json'
export default {
  data(){
    return{
      title:''
    }
  },
  mounted(){
    this.getDetail()
  },
  methods:{
    getDetail(){
      console.log(aboutObj,"obj")
      this.title = aboutObj.about.title
    },
    add(){
      aboutObj.about.title = '222'
      this.getDetail()
    }
  }
}
</script>

<style>

</style>