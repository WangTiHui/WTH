<template>
  <div>
    200
  </div>
</template>

<script>
export default {
  data() {
    return{
      
    }
  },
  mounted(){
    this.gotoIndex()
  },
  methods:{
    gotoIndex(){
      this.$router.push({name:"index"})
    }
  }
}
</script>

<style lang="less">
</style>
