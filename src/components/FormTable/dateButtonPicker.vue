<template>
  <div class="mf-date-button">
    <el-radio-group :size="size" v-model="currentDateRadio" @change="changeRadio">
      <el-radio-button v-for="(item, $index) of dateList" :key="$index" :label="item.value">{{ item.label }}</el-radio-button>
    </el-radio-group>
    <el-date-picker
      v-if="isShowDate"
      style="margin-top: 20px;"
      type="datetimerange"
      range-separator="-"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      align="right"
      @change="pickChange"
      v-model="value" />
  </div>
</template>

<script>
import { formatTime } from "@/global/filters";
export default {
  props: {
    size: {
      type: String,
      default: 'small'
    },
    isShowDate: {
      type: Boolean,
      default: true
    },
    dateRadio: {
      type: String,
      default: ''
    },
    dateList: {
      type: Array,
      default: () => {
        return [
          {label: '全部', value: ''},
          {label: '今日', value: 'today'},
          {label: '昨日', value: 'yesterday'},
          {label: '近7天', value: 'nearlySevenDay'},
          {label: '近30天', value: 'nearlyThirtyDay'},
          {label: '本周', value: 'thisWeek'},
          {label: '本月', value: 'thisMonth'},
        ]
      }
    }
  },
  data() {
    return {
      currentDateRadio: this.dateRadio,
      value: '',
      times: [
        {
          label: '今日',
          start: new Date(new Date(new Date().getTime()).setHours(0, 0, 0, 0)),
          end: new Date(new Date(new Date().getTime()).setHours(23, 59, 59, 59))
        },
        {
          label: '昨日',
          start: new Date(new Date(new Date().getTime() - 24 * 60 * 60 * 1000).setHours(0,0,0,0)),
          end: new Date(new Date(new Date().getTime() - 24 * 60 * 60 * 1000).setHours(23,59,59,59))
        },
        {
          label: '近7天',
          start: new Date(new Date(new Date().getTime() - 6 * 24 * 60 * 60 * 1000).setHours(0,0,0,0)),
          end: new Date(new Date(new Date().getTime()).setHours(23, 59, 59, 59))
        },
        {
          label: '近30天',
          start: new Date(new Date(new Date().getTime() - 29 * 24 * 60 * 60 * 1000).setHours(0, 0, 0, 0)),
          end: new Date(new Date(new Date().getTime()).setHours(23, 59, 59, 59))
        },
        {
          label: '本周',
          start: new Date(new Date().getTime() -(new Date().getDay() - 1) * 24 * 60 * 60 * 1000).setHours(0, 0, 0, 0),
          end: new Date(new Date().getTime() -(new Date().getDay() - 7) * 24 * 60 * 60 * 1000).setHours(23, 59, 59, 59)
        },
        {
          label: '本月',
          start: new Date(new Date().setDate(1)).setHours(0, 0, 0, 0),
          end: new Date(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1) -1000 * 60 * 60 * 24).setHours(23, 59, 59, 59)
        },
        {
          label: '上月',
          start: new Date(new Date(new Date().setDate(-30))).setHours(0, 0, 0, 0),
          end: new Date(new Date(new Date().getFullYear(), new Date().getMonth(), 1) -1000 * 60 * 60 * 24).setHours(23, 59, 59, 59)
        },
      ],
    };
  },
  methods: {
    changeRadio(val) {
      this.value = ''
      let start,end,value
      switch(val) {
        case '':
          value = ''
          break;
        case 'today':
          start = formatTime(this.times[0].start / 1000);
          end = formatTime(this.times[0].end / 1000);
          value = start + ',' + end
        break;
        case 'yesterday':
          start = formatTime(this.times[1].start / 1000);
          end = formatTime(this.times[1].end / 1000);
          value = start + ',' + end
        break;
        case 'nearlySevenDay':
          start = formatTime(this.times[2].start / 1000);
          end = formatTime(this.times[2].end / 1000);
          value = start + ',' + end
        break;
        case 'nearlyThirtyDay':
          start = formatTime(this.times[3].start / 1000);
          end = formatTime(this.times[3].end / 1000);
          value = start + ',' + end
        break;
        case 'thisWeek':
          start = formatTime(this.times[4].start / 1000);
          end = formatTime(this.times[4].end / 1000);
          value = start + ',' + end
        break;
        case 'thisMonth':
          start = formatTime(this.times[5].start / 1000);
          end = formatTime(this.times[5].end / 1000);
          value = start + ',' + end
        break;
        case 'lastMonth':
          start = formatTime(this.times[6].start / 1000);
          end = formatTime(this.times[6].end / 1000);
          value = start + ',' + end
        break;
        default:
          console.log('other')
        break;
      }
      this.$emit('pick', value)
    },
    pickChange(value) {
      if (value) {
        let start = formatTime(value[0] / 1000);
        let end = formatTime(value[1] / 1000);
        value = start + ',' + end
		
      }
      this.currentDateRadio = 'other'
      this.$emit('pick', value);
    },
    clearDate() {
      this.currentDateRadio = this.value = ''
    },
  }
};
</script>
<style lang="less" scoped>
.mf-date-button {
  text-align: center;
}
</style>