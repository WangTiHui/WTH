<template>
  <div class="myIndex">
    <div :class="{'home-page-show':!showLoader}" class="home-page full-page"> 
      <a href="javascript:;" class="menu-btn" @click="showMenu"></a> 
      <div class="loader1"> 
        <span class="text">王</span> <span class="spinner"></span> 
      </div>
      <div class="home-menu">
        <ul class="clearfix">
          <li class="piston1" :class="{'animation-paused':isStop}">
            <div class="menu-item" :class="{'menu-on':isMouseenter1}"> <span @mouseenter="mouseenterFun(1)" @mouseout="mouseoutFun(1)">关于<br>
              我</span> <a class="menu-link1 menu-link"><router-link to="about/about">我的<br>
              简介</router-link></a> <a class="menu-link2 menu-link"><router-link to="about/culture">文化<br>
              乐部</router-link></a> <a class="menu-link3 menu-link"><router-link to="about/odds">个人<br>
              优势</router-link></a> <a class="menu-link4 menu-link"><router-link to="about/course">发展<br>
              历程</router-link></a>
            </div>
          </li>
          <li class="piston2" :class="{'animation-paused':isStop}">
            <div class="menu-item" :class="{'menu-on':isMouseenter2}"> <span @mouseenter="mouseenterFun(2)" @mouseout="mouseoutFun(2)">生活<br>
              菜单</span> <a class="menu-link1 menu-link"><router-link to="life/game">游戏<br>
              目录</router-link></a> <a class="menu-link2 menu-link"><router-link to="life/sport">运动<br>
              项目</router-link></a> <a class="menu-link3 menu-link"><router-link to="life/cinema">电影<br>
              栏目</router-link></a> <a class="menu-link4 menu-link"><router-link to="life/shop">购物<br>
              需求</router-link></a> <a class="menu-link5 menu-link"><router-link to="life/leisure">休闲<br>
              项目</router-link></a> <a class="menu-link6 menu-link"><router-link to="life/food">美食<br>
              节目</router-link></a> 
            </div>
          </li>
          <li class="piston3" :class="{'animation-paused':isStop}">
            <div class="menu-item" :class="{'menu-on':isMouseenter3}"> <span @mouseenter="mouseenterFun(3)" @mouseout="mouseoutFun(3)">技能<br>
              等级</span> <a class="menu-link1 menu-link"><router-link to="skill/html">css<br>
              html</router-link></a> <a class="menu-link2 menu-link"><router-link to="skill/vue">vue<br>
              element</router-link></a> <a class="menu-link3 menu-link"><router-link to="skill/taro">react<br>
              taro</router-link></a> <a class="menu-link4 menu-link"><router-link to="skill/gadgets">小<br>
              玩意</router-link></a> <a class="menu-link6 menu-link"><router-link to="skill/applets">小<br>
              程序</router-link></a> <a class="menu-link5 menu-link"><router-link to="skill/canvas">
              canvas</router-link></a>
            </div>
          </li>
          <li class="piston4" :class="{'animation-paused':isStop}">
            <div class="menu-item" :class="{'menu-on':isMouseenter4}"> <span @mouseenter="mouseenterFun(4)" @mouseout="mouseoutFun(4)">兴趣<br>
              爱好</span> <a class="menu-link1 menu-link"><router-link to="hobby/picture">图片<br>
              锦集</router-link></a><a class="menu-link2 menu-link"><router-link to="hobby/video">视频<br>
              锦集</router-link></a><a class="menu-link3 menu-link"><router-link to="hobby/article">文章<br>
              优选</router-link></a><a class="menu-link4 menu-link"><router-link to="hobby/works">作品<br>
              精选</router-link></a><a class="menu-link5 menu-link"><router-link to="hobby/novel">小说<br>
              精选</router-link></a>
            </div>
          </li>
          <li class="piston5" :class="{'animation-paused':isStop}">
            <div class="menu-item" :class="{'menu-on':isMouseenter5}"> <span @mouseenter="mouseenterFun(5)" @mouseout="mouseoutFun(5)">资历<br>
              成长</span> <a class="menu-link1 menu-link"><router-link to="seniority/business">业务<br>
              方向</router-link></a> <a class="menu-link2 menu-link"><router-link to="seniority/skill">技能<br>
              等级</router-link></a> 
            </div>
          </li>
        </ul>
        <span class="wave wave1" :class="{'animation-paused':isStop}"> 
          <img src="https://istheone.oss-cn-zhangjiakou.aliyuncs.com/image/wave1.png"> 
          <img src="https://istheone.oss-cn-zhangjiakou.aliyuncs.com/image/wave1.png"> 
        </span> 
        <span class="wave wave2" :class="{'animation-paused':isStop}"> 
          <img src="https://istheone.oss-cn-zhangjiakou.aliyuncs.com/image/wave2.png"> 
          <img src="https://istheone.oss-cn-zhangjiakou.aliyuncs.com/image/wave2.png"> 
        </span> 
      </div>
      <div class="copyright">
        <a target="_blank" href="http://beian.miit.gov.cn/">
          <img src="https://istheone.oss-cn-zhangjiakou.aliyuncs.com/image/ga.png"/>
        </a>
        <a target="_blank" href="http://beian.miit.gov.cn/">浙ICP备19033438号</a>
      </div>
    </div>
    <div class="page-menu" :class="{'menu-show':isShowMenu}">
      <div class="menu-top"> 
        <a href="index.html" class="memu-logo"> 
          <img src="https://istheone.oss-cn-zhangjiakou.aliyuncs.com/image/1586764933%281%29.png"> 
        </a> 
        <a href="javascript:;" class="menu-close" @click="closeMenu"></a> 
      </div>
      <div class="menu-con">
        <ul class="page-nav">
          <li>
            <h3><a href="index.html">首页</a></h3>
          </li>
          <li>
            <h3 class="nav-item"><a href="javascript:;">关于我</a></h3>
            <div class="dropdown"> <a href="about.html">个人介绍</a> <a href="about-culture.html">个人文化</a> <a href="about-advantage.html">个人优势</a> <a href="about-history.html">发展历程</a> <a href="about-organization.html">架构</a> </div>
          </li>
          <li>
            <h3 class="nav-item"><a href="javascript:;">生活菜单</a></h3>
            <!-- <div class="dropdown"> <a>总承包资质</a> <a>专业承包资质</a> <a>设计资质</a> <a>勘察资质</a> <a>房地产开发资质</a> <a>人才猎聘</a> </div> -->
          </li>
          <li>
            <h3 class="nav-item"><a href="javascript:;">没事溜溜</a></h3>
            <!-- <div class="dropdown"> <a href="commerce-register.html">工商注册</a> <a href="commerce-change.html">工商变更</a> <a href="commerce-cancel.html">工商注销</a> <a href="commerce-licence.html">行政许可</a> </div> -->
          </li>
          <li>
            <h3><a href="commerce-change.html">玩个游戏</a></h3>
          </li>
          <li>
            <h3 class="nav-item"><a href="javascript:;">看个电影</a></h3>
            <!-- <div class="dropdown"> <a href="transfer.html">转让信息</a> <a href="transfer.html?#transferProgress">转让流程</a> </div> -->
          </li>
          <li>
            <h3 class="nav-item"><a href="javascript:;">钓个鱼</a></h3>
            <!-- <div class="dropdown"> <a href="case.html">资质案例</a> <a href="case.html">工商案例</a> <a href="case.html">其他案例</a> </div> -->
          </li>
          <li>
            <h3 class="nav-item"><a href="javascript:;">学习</a></h3>
            <!-- <div class="dropdown"> <a href="news.html">公司新闻</a> <a href="news.html">公告通知</a> <a href="news.html">政策法规</a> <a href="news.html">行业动态</a> </div> -->
          </li>
          <li>
            <h3 class="nav-item"><a href="javascript:;">工作</a></h3>
            <!-- <div class="dropdown"> <a href="contact.html">转让信息</a> <a href="join.html">加入我们</a> </div> -->
          </li>
        </ul>
        <div class="menu-bottom">
          <div class="hotline">
            <h2><img src="https://istheone.oss-cn-zhangjiakou.aliyuncs.com/image/icon3.png">025-xxxxxx</h2>
            <p>地址：浙江省杭州市</p>
          </div>
          <div class="erweima"> <img src="https://istheone.oss-cn-zhangjiakou.aliyuncs.com/image/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20200413171910.jpg"> </div>
        </div>
      </div>
    </div>
    <div class="loader" v-if="showLoader"> 
      <span class="text">王</span> <span class="spinner"></span> 
    </div>
  </div>
  
</template>

<script>
export default {
  data(){
    return{
      showLoader:true,
      screenWidth: document.body.clientWidth,     // 屏幕宽
      screeHeight: document.body.clientHeight,    // 屏幕高
      isMouseenter1:false,
      isMouseenter2:false,
      isMouseenter3:false,
      isMouseenter4:false,
      isMouseenter5:false,
      isMouseenter6:false,
      isStop:false,
      isShowMenu:false,
    }
  },
  mounted(){
    this.init()
  },
  methods:{
    init(){
      setTimeout(()=>{
        this.showLoader = false
      },1500)
    },
    showMenu(){
      this.isShowMenu = true
    },
    closeMenu(){
      this.isShowMenu = false
    },
    mouseenterFun(type){
      this.isStop = true
      if(type==1){
        this.isMouseenter1 = true
      }else if(type==2){
        this.isMouseenter2 = true
      }else if(type==3){
        this.isMouseenter3 = true
      }else if(type==4){
        this.isMouseenter4 = true
      }else if(type==5){
        this.isMouseenter5 = true
      }else if(type==6){
        this.isMouseenter6 = true
      }
    },
    mouseoutFun(type){
      setTimeout(()=>{
        this.isStop = false
        this.isMouseenter1 = false
        this.isMouseenter2 = false
        this.isMouseenter3 = false
        this.isMouseenter4 = false
        this.isMouseenter5 = false
        this.isMouseenter6 = false
      },2500)
    }
  }
}
</script>

<style lang="less">
  .myIndex{
    height: 100%;
    width: 100%;
    .loader {
      position: absolute;
      z-index: 1000;
      top: 50%;
      left: 50%;
      -webkit-transform: translate(-50%, -50%);
      -moz-transform: translate(-50%, -50%);
      -mos-transform: translate(-50%, -50%);
      -o-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      text-align: center;
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      cursor: default;
    }
    .loader .text {
      z-index: 1001;
      position: absolute;
      width: 100%;
      text-align: center;
      top: 1.8em;
      left: 0;
      z-index: 5;
      font-size: 2em;
      text-transform: uppercase;
      text-align: center;
      color: #f2f2f2;
      font-family: open sans;
      -webkit-animation: text 2.5s cubic-bezier(0.75, 0, 0.5, 1) infinite normal;
      -moz-animation: text 2.5s cubic-bezier(0.75, 0, 0.5, 1) infinite normal;
      -ms-animation: text 2.5s cubic-bezier(0.75, 0, 0.5, 1) infinite normal;
      -o-animation: text 2.5s cubic-bezier(0.75, 0, 0.5, 1) infinite normal;
      animation: text 2.5s cubic-bezier(0.75, 0, 0.5, 1) infinite normal;
    }
    .loader1 {
      position: absolute;
      z-index: 1000;
      top: 10%;
      left: 50%;
      -webkit-transform: translate(-50%, -50%);
      -moz-transform: translate(-50%, -50%);
      -mos-transform: translate(-50%, -50%);
      -o-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      text-align: center;
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      cursor: default;
    }
    .loader1 .text {
      z-index: 1001;
      position: absolute;
      width: 100%;
      text-align: center;
      top: 1.8em;
      left: 0;
      z-index: 5;
      font-size: 2em;
      text-transform: uppercase;
      text-align: center;
      color: #f2f2f2;
      font-family: open sans;
      -webkit-animation: text 2.5s cubic-bezier(0.75, 0, 0.5, 1) infinite normal;
      -moz-animation: text 2.5s cubic-bezier(0.75, 0, 0.5, 1) infinite normal;
      -ms-animation: text 2.5s cubic-bezier(0.75, 0, 0.5, 1) infinite normal;
      -o-animation: text 2.5s cubic-bezier(0.75, 0, 0.5, 1) infinite normal;
      animation: text 2.5s cubic-bezier(0.75, 0, 0.5, 1) infinite normal;
    }
  }
</style>