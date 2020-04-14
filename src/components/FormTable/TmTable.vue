
<template>
  <el-table
    :data="dataSource"
    stripe
    style="width: 100%"
    v-loading="tableLoading"
    element-loading-text="拼命加载中..."
    element-loading-spinner="el-icon-loading"
    @cell-click="dar"
    @selection-change="handleSelectionChange"
    @sort-change="handleSortChange"
    @filter-change="handleFilterChange"
  >
    <!--选择-->
    <el-table-column v-if="hasSelection" type="selection" width="55" :selectable='checkboxT'></el-table-column>
    <!--序号-->
    <el-table-column v-if="hasIndex" type="index" width="55"></el-table-column>
    <!--数据源-->
    <el-table-column
      v-for="column in columns"
      header-align="center"
      :sortable="column.hasSort"
      :key="column.prop"
      :prop="column.prop"
      :label="column.label"
      :width="column.width"
      :column-key="column.prop"
      :filters="column.filters"
      :show-overflow-tooltip="true"
      align="center"
    >
      <template slot-scope="scope">
        <slot v-if="column.style" :name="column.prop" :data="scope.row"></slot>
        <span v-else>{{scope.row[column.prop]}}</span>
      </template>
    </el-table-column>
    <!--操作-->
    <slot name="handleColumn"></slot>
  </el-table>
</template>
 
<script>
export default {
  name: "tm-table",
  props: {
    //是否可以选择
    hasSelection: {
      type: Boolean,
      default: function() {
        return false;
      }
    },
    //是否有序列项
    hasIndex: {
      type: Boolean,
      default: function() {
        return false;
      }
    },
    // 相应的字段展示
    columns: {
      type: Array,
      default: function() {
        return [];
      }
    },
    // 数据源
    dataSource: {
      type: Array,
      default: function() {
        return [];
      }
    },
    tableLoading: { // 表格加载
      type: Boolean,
      default: false,
    },
  },
  methods: {
    //将选中的行发送到父组件
    handleSelectionChange(val) {
      const selectionArr = [];
      val.forEach(function(el) {
        selectionArr.push(el);
      });
      this.$emit("commitSelection", selectionArr);
      console.log(selectionArr)
    },
    handleSortChange(sort) {
      console.log("sort", sort);
    },
    handleFilterChange(filter) {
      console.log("filter", filter);
    },
    dar(row,column){
      if(column.columnKey=="url"){
        this.$emit("gownt",row.url)
      }
    },
    //复选框禁用
    checkboxT(row, rowIndex){
	      if(row.is_system=="1"){
	        return false;
	      }else{
	        return true;
	      }
	  },
  }
};
</script>