<template>
  <el-date-picker
    v-model="date"
    type="daterange"
    class="ch-date-picker"
    align="center"
    unlink-panels
    :editable="false"
    range-separator="至"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
    value-format="timestamp"
    :picker-options="pickerOptions"
    @change="getDate"
  />
</template>

<script>
const todayEnd = new Date(new Date().toLocaleDateString()).getTime() // 今天 00:00:00
export default {
  name: "DateSelect",
  data() {
    return {
      date: [],
      timeNow: Date.now(), // 当前时间毫秒
      MinDays: Date.now() - 3600 * 1000 * 24 * 30, // 30天时间
      pickerOptions: {
        shortcuts: [
          {
            text: '最近7天',
            onClick(picker) {
              const start = todayEnd - 3600 * 1000 * 24 * 6
              picker.$emit('pick', [start, todayEnd])
            }
          },
          {
            text: '最近15天',
            onClick(picker) {
              const start = todayEnd - 3600 * 1000 * 24 * 14
              picker.$emit('pick', [start, todayEnd])
            }
          },
          {
            text: '最近30天',
            onClick(picker) {
              const start = todayEnd - 3600 * 1000 * 24 * 29
              picker.$emit('pick', [start, todayEnd])
            }
          }
        ],
        disabledDate: (time) => {
          return time.getTime() > this.timeNow || time.getTime() < this.MinDays
        }
      }
    };
  },
  methods: {
    getDate(list) {
      let date = ''
      if (list) {
        let end = (list[1] / 1000) + (60 * 60 * 24 - 1)
        date = [list[0] / 1000, end]
      }
      this.$emit('datePicker', date)
    },
    clearDate() {
      this.date = []
      this.getDate('')
    },
  }
};
</script>

<style lang="less">
.el-date-editor--daterange.el-input__inner.ch-date-picker {
  width: 280px;
}
</style>
