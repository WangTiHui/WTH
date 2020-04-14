import string from "less/lib/less/functions/string";

export default {
  data() {
    return {
      moanet:[]
    };
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    },

  },
  computed: {
    type() {
      return this.item.id;
    },
    config() {
      return this.item.config_list;
    }
  },
  methods: {
    handleDelete(pos, index) {
      this.$confirm("确认删除当前组件吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store.commit("decoration/DEL_COMPONENT", { pos, index });
        })
        .catch(() => {});
    },
    handleEdit(pos, index, item) {
      let moanet = this.$store.state.decoration.moanet;
      console.log(moanet)
      if(moanet.length){
        for(var item1 of moanet){
          if(item1=="GoodsFields"|| item1=="InlineGoodsFields"){
            item.config_list[0].config.data.id= "";
          }
        }
      }
      this.$store.commit("decoration/SET_ACTIVECOMPONENT", item.parent_id);
      this.$store.dispatch("decoration/updateConfig", { pos, index, item });
    }
  }
};
