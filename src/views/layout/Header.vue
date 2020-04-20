<template>
  <div class="header">
    <div class="left">
      <img
        src="@/assets/images/culture-icon8.png"
        :class="{'rotateicon':true, 'activeicon': AsideMenuCollapse}"
        @click="toggleAsideMenuCollapse"
      />
      <CrumbList />
    </div>
  </div>
</template>

<script>
import init from "@/assets/rongyun/init";
import { mapState , mapActions} from "vuex";
import CrumbList from "./CrumbList";
import formatTime from "@/global/filters";
const clickoutside = {
 // 初始化指令
  bind(el, binding, vnode) {
    function documentHandler(e) {
		// 这里判断点击的元素是否是本身，是本身，则返回
		  if (el.contains(e.target)) {
			return false;
	      }
	  // 判断指令中是否绑定了函数
		  if (binding.expression) {
	  // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
			binding.value(e);
		  }
	}
    // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
    el.__vueClickOutside__ = documentHandler;
    document.addEventListener('click', documentHandler);
  },
  update() {},
  unbind(el, binding) {
  // 解除事件监听
    document.removeEventListener('click', el.__vueClickOutside__);
    delete el.__vueClickOutside__;
  },
}
export default {
  components: {
    CrumbList
  },
  data() {
    return {
	 activeName: 'first',
	 listIndex:3,
	 is_show:false,
      ryShow: false,
      hasNew:false,
      totalNum:'',//未读消息总数
      circleUrl:"https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
	  defaultMessage:{
		  target_type:1,
		  page:1,
		  page_size:5,
		  total_count:0
	  },
	  announcement:[],
	  merchantInformation:[],
	  not_read_count:0,//总未读条数
	  not_read_count_user:0,
	  not_read_count_system:0,
    };
  },
  computed: {
   ...mapState(["AsideMenuCollapse","messageNumbers"]),
    userinfo(){
     return this.$store.state.userInfo
    }
  },
  directives: {clickoutside},
  methods: {
    toggleAsideMenuCollapse() {
      this.$store.commit("toggleAsideMenuCollapse");
    },
	...mapActions(['getMessaged']),
  }
};
</script>

<style lang="less">
	.iconMARGIN {
		position: relative;
		left: 12px;
		top: 0;
	}
.right .el-button {
	border: none;
}
.dd .el-tabs__item {
	width: 150px!important;
	text-align: center;
	.el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active {
		color: #e1251b;
	}
}
.dd .el-tabs__active-bar {
	background-color: #e1251b;
	
}
.dd .el-tabs__item.is-active {
	color: #e1251b;
}
.dd .el-divider--horizontal {
	margin-top: 8px;
	margin-bottom: 5px;
}
 .dd .el-divider {
	background-color: #e1e1e1;
}
.messageList {
	background-color: white;
	z-index: 1000;
}
.message_bottom {
	padding: 0 0 12px 0;
	color: #303133;
	box-shadow: 0px 0px 10px 5px rgba(0,0,0,0.9);
	box-sizing: border-box;
}
.dd .viewAll {
	text-align: right;cursor: pointer;
	font-size: 12px;color: #e1251b;
}
.header {
  width: 100%;
  height: 100%;
}
.right {
  float: right;
  display: flex;
  align-items: center;
  height: 100%;
  .el-button:focus, .el-button:hover{
	  background-color: white;
	  color: #606266;
  }
}
.left {
  float: left;
  display: flex;
  align-items: center;
  height: 100%;
  > img {
    vertical-align: middle;
    margin-right: 20px;
  }
}
.name {
  font-size: 13px;
  color: @font;
  margin-left: 10px;
}
.item {
  margin-left: 20px;
}
.rotateicon {
  width: 30px;
  transition: transform 0.5s;
}
.activeicon {
  transform: rotate(90deg);
}
.chat{
    cursor: pointer;
}
.chatDialog{
    position: fixed;
    top: 66px;
    right: 0;
    left: 50%;
    bottom: 0;
    margin-left: -400px;
    background-color: transparent;
    z-index: 5000;
}
.dd .el-icon-document-checked{
  cursor: pointer;
  vertical-align: middle;
}
.cursorDiv{
  cursor: pointer;
}
.fontSize12px{
  font-size: 12px;
}
.fontSize14px{
  font-size: 14px;
}
.shopEditPass{
  text-align:center;background:#FFF;margin-bottom:-10px;padding:5px 0;
}
.dropdownMunuDiv{
  width:240px;padding:6px 0 10px 0;
}
.laginOut{
  line-height:24px;display:flex;margin-left:16px;cursor: pointer;
}
.writeOffDiv{
  vertical-align: middle;display:flex;width:72px;line-height:16px;
}
.fade-enter,.fade-leave-to{
	opacity: 0;
}
.fade-enter-active,.fade-leave-active{
	transition: opacity 1s;
}
.dd {
	position:absolute;top: 78px;right:220px;
	padding: 0 10px;
	width: 316px;
	background: #fff;
	border: 1px solid #dcdfe6;
	-webkit-box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
	box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
	font-size: 12px;
	color: #666;
}
.CHATMARGIN {
	margin-top: -4px;
}
</style>