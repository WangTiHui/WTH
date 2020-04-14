<template>
  <div>
    <el-checkbox
      :indeterminate="isIndeterminate"
      v-model="checkAll"
      @change="handleCheckAllChange"
    >{{title}}</el-checkbox>
    <div style="margin: 15px 0;"></div>
    <el-checkbox-group v-model="checked" @change="handleCheckedChange">
      <el-checkbox
        v-for="v in options"
        :label="v.value"
        :key="v.value"
        :disabled="v.disabled"
      >{{v.label}}</el-checkbox>
    </el-checkbox-group>
  </div>
</template>
<script>
export default {
  data() {
    return {
      checkAll: false,
      isIndeterminate: false,
      checked: [],
      allvalue: []
    };
  },
  props: {
    title: {
      type: String,
      default: "全部"
    },
    options: {
      type: Array,
      default() {
        return [];
      }
    },
    checkedOptions: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    handleCheckAllChange(val) {
      let arr = val ? this.allvalue : [];
      this.checked = arr;
      this.$emit("update:checkedOptions", arr);
      this.isIndeterminate = false;
    },
    handleCheckedChange(value) {
      this.$emit("update:checkedOptions", value);
      this.setStatus(value);
    },
    setStatus(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.options.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.options.length;
    },
    transformCheck(val) {}
  },
  mounted() {
    this.setStatus(this.checkedOptions);
    this.checked = this.checkedOptions;
    let arr = this.options.map(v => v.value);
    this.allvalue = arr;
  }
};
</script>