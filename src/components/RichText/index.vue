<template>
  <div>
    {{ msg }}
    <TinymceEditor ref="editor" v-model="msg" :disabled="disabled" @onClick="onClick"></TinymceEditor>
    <br />
    <el-button type="primary" @click="clear">清空内容</el-button>
    <el-button @click="disabled = true">禁用</el-button>
  </div>
</template>

<script>
import TinymceEditor from "./TinymceEditor";
export default {
  components: {
    TinymceEditor
  },
  data() {
    return {
      msg: "Tinymce富文本编辑器",
      disabled: false
    };
  },
  methods: {
    onClick(e, editor) {
      console.log("Element clicked");
      console.log(e);
      console.log(editor);
    },
    clear() {
      this.$refs.editor.clear();
    }
  }
};
</script>