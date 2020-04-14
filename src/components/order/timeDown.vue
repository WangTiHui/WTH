<template>
  <span style="color: #ff5454;font-size:16px;">{{time}}</span>
</template>
<script>
import { setInterval } from 'timers';
export default {
  data() {
    return {
      time: "",
      setTime:0,
      flag: false
    };
  },
  mounted() {
    setTimeout(()=>{
        this.getDetail()
        this.flag = this.stopStatus
      },1000)
    let time = setInterval(() => {
      if (this.flag == true) {
        clearInterval(time);
      }
      this.timeDown();
    }, 1000);
    let time2 = setInterval(()=>{
      if(this.flag==true){
        clearInterval(time2)
      }
      this.$emit('refrashDetail')
    },10000)
    
  },
  props: {
    endTime: {
      type: Number
    },
    nowTime:{
      type:Number
    },
    stopStatus:{
      type:Boolean,
      default:false
    }
  },
  methods: {
    getDetail(){
      this.$nextTick(()=>{
        this.setTime = JSON.parse(JSON.stringify(this.nowTime))
        console.log(this.setTime)
      })
    },
    timeDown() {
      if(this.flag){
        this.time = '0天0时0分0秒'
        // this.$emit('refrashDetail')
      }else{
        const endTime = this.endTime;
        const nowTime = new Date();
        let leftTime = endTime - this.setTime;
        let d = parseInt(leftTime / (24 * 60 * 60));
        let h = this.formate(parseInt((leftTime / (60 * 60)) % 24));
        let m = this.formate(parseInt((leftTime / 60) % 60));
        let s = this.formate(parseInt(leftTime % 60));
        if (leftTime <= 0) {
          this.flag = true;
          this.$emit("time-end");
        }
        this.setTime+=1
        this.time = `${d}天${h}时${m}分${s}秒`;        
      }
      
    },
    formate(time) {
      if (time >= 10) {
        return time;
      } else {
        return `0${time}`;
      }
    }
  }
};
</script>
<style>
</style>