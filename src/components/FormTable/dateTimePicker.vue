<template>
  <div class="block">
    <el-tag @click="today">今天</el-tag>
    <el-tag type="info" @click="yesterday">昨日</el-tag>
    <el-tag type="success" @click="nearly7days">近7天</el-tag>
    <el-tag type="danger" @click="nearly30days">近30天</el-tag>
    <el-tag type="warning" @click="thisweek">本周</el-tag>
    <el-tag type="primary" @click="thismoney">本月</el-tag>
    <el-date-picker
      style="margin-top:20px;"
      type="datetimerange"
      range-separator="-"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      align="right"
      @change="pickChange"
      v-model="value"
    ></el-date-picker>
  </div>
</template>

<script>
import { formatTime } from "@/global/filters";
export default {
  data() {
    return {
    //   clickOutsideFlag: false,
    //   childHandleClose: null,
      times: [
        {
          label: "今日",
          start:new Date(new Date(new Date().getTime()).setHours(0, 0, 0, 0)),
          end:new Date(new Date(new Date().getTime()).setHours(23, 59, 59, 59))
        },
        {
          label: "昨日",
          start:new Date(new Date(new Date().getTime() - 24 * 60 * 60 * 1000).setHours(0,0,0,0)),
          end: new Date(new Date(new Date().getTime() - 24 * 60 * 60 * 1000).setHours(23,59,59,59))
        },
        {
          label: "近7天",
          start:new Date(new Date(new Date().getTime() - 6 * 24 * 60 * 60 * 1000).setHours(0,0,0,0)),
          end:new Date(new Date(new Date().getTime()).setHours(23, 59, 59, 59))
        },
        {
          label: "近30天",
          start:new Date(new Date(new Date().getTime() - 29 * 24 * 60 * 60 * 1000).setHours(0, 0, 0, 0)),
          end:new Date(new Date(new Date().getTime()).setHours(23, 59, 59, 59))
        },
        {
          label: "本周",
          start:new Date(new Date().getTime() -(new Date().getDay() - 1) * 24 * 60 * 60 * 1000).setHours(0, 0, 0, 0),
          end:new Date(new Date().getTime() -(new Date().getDay() - 7) * 24 * 60 * 60 * 1000).setHours(23, 59, 59, 59)
        },
        {
          label: "本月",
          start:new Date(new Date().setDate(1)).setHours(0, 0, 0, 0),
          end:new Date(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1) -1000 * 60 * 60 * 24).setHours(23, 59, 59, 59)
        }
      ],
    //   自定义事件
    //   pickerOptions: {
    //     shortcuts: [
    //       {
    //         text: "今天",
    //         onClick(picker) {
    //           const end = new Date(
    //             new Date(new Date().getTime()).setHours(23, 59, 59, 59)
    //           );
    //           const start = new Date(
    //             new Date(new Date().getTime()).setHours(0, 0, 0, 0)
    //           );
    //           picker.$emit("pick", [start, end]);
    //           //   this.$emit("pick","123")
    //         }
    //       },
    //       {
    //         text: "昨天",
    //         onClick(picker) {
    //           const end = new Date(
    //             new Date(new Date().getTime() - 24 * 60 * 60 * 1000).setHours(
    //               23,
    //               59,
    //               59,
    //               59
    //             )
    //           );
    //           const start = new Date(
    //             new Date(new Date().getTime() - 24 * 60 * 60 * 1000).setHours(
    //               0,
    //               0,
    //               0,
    //               0
    //             )
    //           );
    //           picker.$emit("pick", [start, end]);
    //         }
    //       },
    //       {
    //         text: "近7天",
    //         onClick(picker) {
    //           const end = new Date(
    //             new Date(new Date().getTime()).setHours(23, 59, 59, 59)
    //           );
    //           const start = new Date(
    //             new Date(
    //               new Date().getTime() - 6 * 24 * 60 * 60 * 1000
    //             ).setHours(0, 0, 0, 0)
    //           );
    //           picker.$emit("pick", [start, end]);
    //         }
    //       },
    //       {
    //         text: "近30天",
    //         onClick(picker) {
    //           const end = new Date(
    //             new Date(new Date().getTime()).setHours(23, 59, 59, 59)
    //           );
    //           const start = new Date(
    //             new Date(
    //               new Date().getTime() - 29 * 24 * 60 * 60 * 1000
    //             ).setHours(0, 0, 0, 0)
    //           );
    //           picker.$emit("pick", [start, end]);
    //         }
    //       },
    //       {
    //         text: "本周",
    //         onClick(picker) {
    //           const end = new Date(
    //             new Date().getTime() -
    //               (new Date().getDay() - 7) * 24 * 60 * 60 * 1000
    //           ).setHours(23, 59, 59, 59);
    //           const start = new Date(
    //             new Date().getTime() -
    //               (new Date().getDay() - 1) * 24 * 60 * 60 * 1000
    //           ).setHours(0, 0, 0, 0);
    //           picker.$emit("pick", [start, end]);
    //         }
    //       },
    //       {
    //         text: "本月",
    //         onClick(picker) {
    //           const end = new Date(
    //             new Date(
    //               new Date().getFullYear(),
    //               new Date().getMonth() + 1,
    //               1
    //             ) -
    //               1000 * 60 * 60 * 24
    //           ).setHours(23, 59, 59, 59);
    //           const start = new Date(new Date().setDate(1)).setHours(
    //             0,
    //             0,
    //             0,
    //             0
    //           );
    //           picker.$emit("pick", [start, end]);
    //         }
    //       }
    //     ]
    //   },
      value: ''
    };
  },
  created() {
    // this.$nextTick(() => {
    //   this.childHandleClose = this.$refs.datePicker.handleClose;
    //   this.$refs.datePicker.handleClose = this.handleClose;
    // });
  },
//   watch: {
//   },
  methods: {
    pickChange(value) {
      if(value){
            let start = formatTime(value[0] / 1000);
            let end = formatTime(value[1] / 1000+24*60*60-1);
            value = start+"-"+end
      }
      this.$emit("pick", value);
    },
    today(){
        let start = formatTime(this.times[0].start / 1000);
        let end = formatTime(this.times[0].end / 1000);
        let value = start+"-"+end
        this.$emit('pick',value)
    },
    yesterday(){
        let start = formatTime(this.times[1].start / 1000);
        let end = formatTime(this.times[1].end / 1000);
        let value = start+"-"+end
        this.$emit('pick',value)
    },
    nearly7days(){
        let start = formatTime(this.times[2].start / 1000);
        let end = formatTime(this.times[2].end / 1000);
        let value = start+"-"+end
        this.$emit('pick',value)
    },
    nearly30days(){
        let start = formatTime(this.times[3].start / 1000);
        let end = formatTime(this.times[3].end / 1000);
        let value = start+"-"+end
        this.$emit('pick',value)
    },
    thisweek(){
        let start = formatTime(this.times[4].start / 1000);
        let end = formatTime(this.times[4].end / 1000);
        let value = start+"-"+end
        this.$emit('pick',value)
    },
    thismoney(){
        let start = formatTime(this.times[5].start / 1000);
        let end = formatTime(this.times[5].end / 1000);
        let value = start+"-"+end
        this.$emit('pick',value)
    },
    clearDate(){
        this.value = ''
    }
  }
};
</script>
<style lang="less" scoped>
.el-tag {
  margin-left: 15px;
  margin-top: 10px;
  cursor: pointer;
}
</style>