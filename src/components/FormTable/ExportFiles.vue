<template>
  <el-form class="TC" :model="exportForm">
    <el-form-item>
      <el-popover v-model="exportDatePopover" placement="bottom" width="420" trigger="click">
        <dateButtonPicker ref="exportPickerDom" @pick="exportDate" :date-list="dateList" />
        <div class="DIB" slot="reference">
          <span>日期选择：</span>
          <el-input  v-model.trim="exportForm.date" placeholder="请选择日期" readonly style="width: 250px;" />
        </div>
      </el-popover>
    </el-form-item>
    <el-form-item class="search-btn">
      <el-button type="primary" @click="exportFile('json')">导出JSON</el-button>
      <el-button type="success" @click="exportFile('excel')">导出Excel</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {exportExcelOrJson} from "@/utils/exportExcelOrJson"
import dateButtonPicker from "@/components/FormTable/dateButtonPicker";
export default {
  props: {
    model: { // 表单搜索数据，注意字段不要和拼接字段重复
      type: Object,
      default: () => {
        return {}
      }
    },
    exportUrl: {
      type: String,
      default: '',
    },
    startField: { // 拼接开始时间字段
      type: String,
      default: ''
    },
    endField: { // 拼接结束时间字段
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dateList: [
        {label: '今日', value: 'today'},
        {label: '昨日', value: 'yesterday'},
        {label: '近7天', value: 'nearlySevenDay'},
        {label: '近30天', value: 'nearlyThirtyDay'},
        {label: '本周', value: 'thisWeek'},
        {label: '本月', value: 'thisMonth'},
      ],
      exportForm: {
        startTime: '',
        endTime: '',
        date: '',
      },
      exportDatePopover: false,
    }
  },
  methods: {
    exportFile(type) {
      if (!this.exportForm.date) {
        return this.$message.error('请先选择日期')
      } else {
        let params = {
          'export_type': type,
          'access-token': localStorage.token_gwt,
          ...this.model,
          ...this.exportForm
        }
        exportExcelOrJson(this.exportUrl, params, this.startField, this.endField)
      }
    },
    exportDate(val) {
      if (val) {
        let start = val.split(',')[0]
        let end = val.split(',')[1]
        this.exportForm.startTime = new Date(start) / 1000
        this.exportForm.endTime = new Date(end) / 1000
        this.exportForm.date = val.replace(',', '-')
      } else {
        this.exportForm.date = this.exportForm.startTime = this.exportForm.endTime = ''
      }
      setTimeout(() => {
        this.exportDatePopover = false
      }, 200)
    },
    clearExportFiles() {
      this.exportForm = {
        date: '',
        startTime: '',
        endTime: '',
      }
      this.$refs.exportPickerDom.clearDate()
    },
  },
  components:{
  	  dateButtonPicker
  }
}
</script>
