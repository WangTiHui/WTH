(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6f405ce0"],{1380:function(t,s,n){},"5b12":function(t){t.exports=JSON.parse('{"applets":{},"canvas":{},"gadgets":{"list":[{"title":"聊天小工具","path":"/skill/chat","bg":"linear-gradient(45deg,#0064bc 30%,#259F55 64%,#03B855 6%)","color":"#FFF"}]},"html":{},"react":{},"taro":{},"vue":{}}')},"909f":function(t,s,n){"use strict";var e=n("1380"),i=n.n(e);i.a},c809:function(t,s,n){"use strict";n.r(s);var e=function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("div",{staticClass:"gadgets"},[n("el-row",t._l(t.list,(function(s,e){return n("el-col",{key:e,attrs:{span:3}},[n("div",{staticClass:"dolt"},[n("div",{staticClass:"dolt-bg",style:"background:"+s.bg}),n("div",{staticClass:"dolt-content",style:"color:"+s.color,on:{click:function(n){return t.gotoSkill(s.path)}}},[t._v(t._s(s.title))])])])})),1)],1)},i=[],l=n("5b12"),a={data:function(){return{list:[]}},mounted:function(){this.getList()},methods:{getList:function(){this.list=l.gadgets.list},gotoSkill:function(t){this.$router.push({path:t})}}},c=a,o=(n("909f"),n("2877")),r=Object(o["a"])(c,e,i,!1,null,"3ea6cac2",null);s["default"]=r.exports}}]);