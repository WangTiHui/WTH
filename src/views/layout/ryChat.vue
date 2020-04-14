<template>
  <div class="chatBody" v-if="chatShow">
    <div class="chatMenu">
      <div class="userItemFix">会话列表</div>
      <div class="chatItemList">
        <div v-for="(item,index) in userListFirst" :key="index" :class="['userItem', {'active':index===activeUser}]" @click="selectItem(item,index)">
          <div class="userItemAvatar">
            <el-badge :value="item.unreadMessageCount==0?'':item.unreadMessageCount" :max="99">
                <el-avatar
                shape="square"
                size="medium"
                :src="item.avatar"
                ></el-avatar>
            </el-badge>
          </div>
          <div class="userItemContent">
            <div class="userItemText">
              <div class="userItemName">{{item.nickname}}</div>
              <div class="userItemLastTime">{{item.sentTime | chatTime}}</div>
            </div>
            <div class="userItemLastMsg">{{item.latestMessage.content.content}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="chatContent">
      <div style="max-width:720px;">
        <header class="chatHeader">
          <div class="chatTitle">
            <span>{{stat.targetUserInfo.nickname}}</span>
          </div>
          <!-- <div class="chatClose">
            <i class="el-icon-close" @click="closeChat"></i>
          </div> -->
        </header>
        <div class="chat-content" id="chat-content" ref="chatHistory">
            <!-- <div style="text-align:center;" v-show="hasMsg" @click="moreHistory">
                获取更多历史记录
            </div> -->
          <div class="message-wrapper" id="chatHistory">
            <div
              class="message-item"
              v-for="(msg,index) in stat.messageList"
              :key="index"
              :class="[msg.messageDirection == 1 ? 'my-msg' : 'your-msg']"
            >
              <div v-if="msg.messageType == 'TextMessage'||'ImageMessage'" class="message-text">
                <div class="rong-avatar">
                  <img
                    v-if="msg.messageDirection == 1"
                    :src="stat.currentUserInfo.portraitUri"
                    class="rong-avatar-bd"
                  />
                  <img v-else :src="stat.targetUserInfo.portraitUri" class="rong-avatar-bd" />
                </div>
                <div class="message-body">
                  <pre class="user-msg" v-if="msg.content.messageName == 'TextMessage'">{{msg.content.content}}</pre>
                  <el-image
                    class="msg-image"
                    :src="msg.content.imageUri"
                    alt="点击大图"
                    fit="fill"
                    :preview-src-list="[msg.content.imageUri]"
                    v-if="msg.content.messageName == 'ImageMessage'"
                  ></el-image>
                </div>
              </div>
              <div class="msgTimeDiv">
                  <span class="msgTime">{{msg.sentTime|chatContentTime}}</span>
              </div>
            </div>
          </div>
        </div>
        <footer>
            <div class="emoji">
                <span><i class="icon iconfont icon-icon_im_face cursor" style="height:20px;width:20px;" @click="selectEmoji" title="表情"></i></span>
                <span><i class="icon iconfont icon-ic_image cursor" style="margin-left:10px" @click="$refs.imgfile.click()" title="发送图片"></i></span>
                <input
                  type="file"
                  accept="image/*"
                  :headers="importHeaders"
                  style="display: none"
                  ref="imgfile"
                  @change="changefile($event.target)"
                />
                <div class="chatbox-emoji-panel" id="chatbox-emoji-panel" v-show="emojiShow">
                    <div>
                        <ol>
                            <li v-for="emo in emojiList" :key="emo.unicode" :title="emo.symbol" @click="clickEmoji(emo)">{{emo.emoji}}</li>
                        </ol>
                    </div>
                </div>
            </div>
          <div class="footer">
              <div class="message-wrap">
                <textarea
                v-model="stat.sendMsgVal"
                id="message-content"
                placeholder=""
                class="message-content"
                autofocus
                ></textarea>
            </div>
            <span class="send-btn" @click="sendMsg">发送</span>
          </div>
        </footer>
      </div>
    </div>
    <ImageUpload :show.sync="show" @select="selectIMage" v-if="show"/>
  </div>
</template>

<script>
import "@/assets/chat.css";
import init from "@/assets/rongyun/init";
import ImageUpload from "@/components/ImageUpload/ImageModal";
import {chatTime,chatContentTime} from "@/global/filters";
import api from "@/api/ossimgApi";
import { setInterval } from 'timers';
export default {
  data() {
    return {
        moveDataelse: {
            x: null,
            y: null
        },
        emojiShow:false,//表情
        emojiList:[],//表情列表
        uploadUrl:'/api/common/upload-image',
        upLoadData:{ image_name:'market' },
        importHeaders: {'X-Api-Key': localStorage.getItem('token_gwt')},
        activeUser:0,
        targetId:"",
        instance: "",
        token:"",
        stat: {
            currentView: "chat",
            currentUserInfo: {
            id: "",
            nickname: "小蜜蜂",
            portraitUri:""
            },
            targetUserInfo: {
            id: "",
            nickname: "",
            portraitUri: ""
            },
            messageList: [],
            sendMsgVal: ""
        },
        userList: [],
        chatCount:0,
        show: false,
        imgUrl:"",
        hasMsg:false,
        chatShow:false,
        scrollValue:'',
        userListFirst:[]
    };
  },
  mounted() {
    // window.addEventListener('scroll',_this.scrollChat,true)
  },
  methods: {
    ryInit() {
      var userInfo = {
        appKey: location.href.indexOf('o2ofront.mifbb.com')!=-1?"8brlm7uf8i8n3":'8luwapkv8b8zl',//"82hegw5u8mqwx",
        token:this.$store.state.userInfo.rong_token,//"ZsHtvk585MWpfVXzab50bSALjGTu6G1EbTxKF6kL5ftb2AzSGQl34ZdenxYBiTeVQGGlSDxICoyrlC//TYAWs6//pvlIuQlyaxQJYt4Z4Qw=",//this.token,//"oUh0wcHH6E2LiuTpEKp/+jCvQwRQ4mI0ws9X674LamLVDfNK14vl8UoEcZT0otHeuyNsIi1T4wZ8UwVl0ZqyZA=="
      };
      var _this = this;
        setTimeout(()=>{
          let dom = document.querySelector('#chat-content')
          dom.addEventListener('scroll', function (e) {
                if(_this.hasMsg&&dom.scrollTop==0){
                    _this.moreHistory()
                }
            }, true)
        },500)
      var callbacks = {
        CONNECTED: function(instance) {
          //传入实例参数
          //获取历史消息
          var conversationTypes = null;
              var count = 20;
              RongIMClient.getInstance().getConversationList({
                onSuccess: function(list) {
                  console.log(list,"list")
                    if(list){
                        _this.chatShow = true
                    }
                  _this.userListFirst = list;
                  _this.targetId = list.length>0?list[0].targetId:'';
                  _this.stat.currentUserInfo.id= _this.$store.state.userInfo.id
                  _this.stat.currentUserInfo.nickname  = _this.$store.state.nickname
                  _this.stat.currentUserInfo.portraitUri = _this.$store.state.avatar?_this.$store.state.avatar:"https://mifbb-upload-image.oss-cn-hangzhou.aliyuncs.com/mifbb_app/decoration/20191129/baa42a0cd29313cb2db19b6a1a8d8a90.png"
                  _this.userListFirst.forEach(e=>{
                      e.nickname = ''
                      e.avatar = ''
                      e.sentTime = e.sentTime/1000
                      e.unreadMessageCount=e.unreadMessageCount==0?'':e.unreadMessageCount
                      e.latestMessage.content.content=e.latestMessage.content.content?RongIMLib.RongIMEmoji.symbolToEmoji(e.latestMessage.content.content):''
                      _this.getUserInfo(e)
                  })
                  _this.getTotalUnreadCounts()
                  _this.clearUnreadCountFun()
                  return (_this.instance = RongIMClient.getInstance());
                },
                onError: function(error) {
                  console.log("获取会话列表失败", error);
                }
              },conversationTypes,count);
              var conversationType = RongIMLib.ConversationType.PRIVATE;
        },
        Success: function(id) {
            if(id){
                _this.chatCount = 1
            }
        },
        Received: function(message) {}
      };
      if(_this.chatCount==1){
          init(userInfo, callbacks);
      }else{
          _this.chatShow = false
          _this.$nextTick(()=>{
              _this.chatShow = true
              init(userInfo, callbacks);
          })
      }
    },
    getChatList(){
      var conversationTypes = null;
      var count = 20;
      let that = this
      RongIMClient.getInstance().getConversationList({
        onSuccess:function(list){
          console.log(list,"重新获取的list")
          if(list){
                that.chatShow = true
            }
          that.userListFirst = list;
          that.targetId = list.length>0?list[0].targetId:'';
          that.stat.currentUserInfo.id= that.$store.state.userInfo.id
          that.stat.currentUserInfo.nickname  = that.$store.state.nickname
          that.stat.currentUserInfo.portraitUri = that.$store.state.avatar?that.$store.state.avatar:"https://mifbb-upload-image.oss-cn-hangzhou.aliyuncs.com/mifbb_app/decoration/20191129/baa42a0cd29313cb2db19b6a1a8d8a90.png"
          that.userListFirst.forEach(e=>{
              e.nickname = ''
              e.avatar = ''
              e.sentTime = e.sentTime/1000
              e.unreadMessageCount=e.unreadMessageCount==0?'':e.unreadMessageCount
              e.latestMessage.content.content=e.latestMessage.content.content?RongIMLib.RongIMEmoji.symbolToEmoji(e.latestMessage.content.content):''
              that.getUserInfo(e)
          })
        }
      },conversationTypes,count)
    },
    //   发送消息
    sendMsg() {
      var text = RongIMLib.RongIMEmoji.emojiToSymbol(this.stat.sendMsgVal);
      if (!text) {
        return false;
      }
      var msg = new RongIMLib.TextMessage({
        content: text,
        extra: "附加信息"
      });
      var conversationType = RongIMLib.ConversationType.PRIVATE; // 私聊
      var targetId = this.targetId; // 目标 Id
      var that = this;
      RongIMClient.getInstance().sendMessage(conversationType, targetId, msg, {
        // 发送消息成功
        onSuccess: function(message) {
          that.stat.sendMsgVal = "";
          message.content.content = RongIMLib.RongIMEmoji.symbolToEmoji(message.content.content)
          that.stat.messageList.push(message);
          that.$nextTick(that.scrollEnd);
        }
      }, true, '', null, null, {userIds: [ targetId]});
    },
    sendImageMsg(){
        // var base64Str = '/9j/4AAQSBAAD/2wBDDBAYEBAQEB....';  // 压缩后的 base64 略缩图, 用来快速展示图片
        var imageUri = this.imgUrl;  // 上传到自己服务器的 url. 用来展示高清图片
        var msg = new RongIMLib.ImageMessage({imageUri: imageUri});
        var conversationType = RongIMLib.ConversationType.PRIVATE;
        var targetId = this.targetId;  // 目标 Id
        var that = this;
        RongIMClient.getInstance().sendMessage(conversationType, targetId, msg, {
            onSuccess: function (message) {
                that.stat.messageList.push(message)
                console.log('发送图片消息成功', message);
            },
            onError: function (errorCode) {
                console.log('发送图片消息失败', errorCode);
            }
        });
    },
    // 获取未读消息总数
    getTotalUnreadCounts(){
        var conversationType = RongIMLib.ConversationType.PRIVATE;
        var targetId = this.targetId
        var that = this;
        RongIMClient.getInstance().getTotalUnreadCount({
            onSuccess: function(count) {
              console.log(count)
                that.$emit("totalCount",count)
                console.log(RongIMClient.getInstance())
                if(count>0){
                  that.getChatList()
                }
            },
            onError: function(error) {
                console.log('获取所有会话未读消息数失败', error);
            }
        })
    },
    // 获取单个会话历史
    getHistoryList(){
        var conversationType = RongIMLib.ConversationType.PRIVATE;
        var targetId = this.targetId;
        var that = this;
        RongIMClient.getInstance().getHistoryMessages(
          conversationType,
          targetId,
          0,
          20,
          {
            onSuccess(list, hasMsg) {
              //渲染会话列表
              that.hasMsg = hasMsg
              that.stat.messageList = list;
              that.stat.messageList.forEach(e=>{
                  e.sentTime = e.sentTime/1000
                  e.content.content=e.content.content?RongIMLib.RongIMEmoji.symbolToEmoji(e.content.content):''
              })
              that.scrollEnd()
            }
          },
          null
        );
    },
    // 获取更多记录
    moreHistory(){
        var conversationType = RongIMLib.ConversationType.PRIVATE;
        var targetId = this.targetId;
        var that = this;
        RongIMClient.getInstance().getHistoryMessages(
          conversationType,
          targetId,
          null,
          20,
          {
            onSuccess(list, hasMsg) {
              //渲染会话列表
              that.hasMsg = hasMsg
              let messageListAppend = list
              messageListAppend.reverse()
              messageListAppend.forEach(e=>{
                  e.sentTime = e.sentTime/1000
                  e.content.content=e.content.content?RongIMLib.RongIMEmoji.symbolToEmoji(e.content.content):''
                  that.stat.messageList.unshift(e)
              })
              
            }
          },
          null
        );
    },
    // 点击开单个 清除该会话未读数
    clearUnreadCountFun(){
        var conversationType = RongIMLib.ConversationType.PRIVATE;
        var targetId = this.targetId;
        RongIMClient.getInstance().clearUnreadCount(conversationType, targetId, {
        onSuccess: function() {
            // console.log('清除指定会话未读消息数成功');
        },
        onError: function(error) {
            console.log('清除指定会话未读消息数失败', error);
        }
        });
    },
    scrollEnd: function() {
      //添加完消息 跳转到最后一条
        this.$nextTick(() => {
            this.$refs.chatHistory.scrollTop = this.$refs.chatHistory.scrollHeight
        })
    },
    closeChat() {
      this.$emit("isToChat", false);
    },
    // 获取用户头像信息
    getUserInfo(e){
        this.$http.get('/user/simple-info',{id:e.targetId}).then(res=>{
            if(e.targetId == this.targetId){
                this.stat.targetUserInfo.nickname = res.nickname
                this.stat.targetUserInfo.portraitUri = res.avatar
                this.stat.targetUserInfo.id = res.targetId
            }
            e.nickname = res.nickname
            e.avatar = res.avatar
            this.getHistoryList()
        })
    },
    changefile(dom) {
      let file = dom.files;
      if (file.length === 0) {
        return;
      }
      let img = file[0];
      if (!/.(jpg|jpeg|png)$/i.test(img.name)) {
        this.$message.error("请上传jpg、jpeg、png格式的图片！");
        dom.value = "";
        return;
      }
      if (img.size > 2 * 1024 * 1024) {
        this.$message.error("图片过大");
        dom.value = "";
        return;
      }
      let data = new FormData();
      data.append('category','goods')
      data.append("image", img);
      api.uploadImages(data).then(res=>{
        this.imgUrl = res.upload_url
        this.sendImageMsg()
      })
    },
    // 选择用户
    selectItem(obj,val) {
        this.targetId = obj.targetId;
        this.stat.targetUserInfo.nickname = obj.nickname
        this.stat.targetUserInfo.portraitUri = obj.avatar
        this.activeUser = val;
        this.getHistoryList()
        this.clearUnreadCountFun()
    },
    selectEmoji(){
          this.emojiShow = !this.emojiShow
          var emojis = this.getEmojiDetailList()
          return false
    },
    getEmojiDetailList() {
        var shadowDomList = [];
        this.emojiList = RongIMLib.RongIMEmoji.list
        console.log(RongIMLib.RongIMEmoji,'emojiList')
        console.log(RongIMLib)
        for (var i = 0; i < RongIMLib.RongIMEmoji.list.length; i++) {
            var value = RongIMLib.RongIMEmoji.list[i];
            shadowDomList.push(value.node);
        }
        return shadowDomList;
    },
    clickEmoji(event) {
      console.log(event,"event")
        this.stat.sendMsgVal = RongIMLib.RongIMEmoji.emojiToSymbol(this.stat.sendMsgVal+event.symbol)
        this.emojiShow = false
    },
    selectIMage(img) {
        this.imgUrl = img.url
        this.sendImageMsg()
    //   this.$emit("update:image", img.url);
    },
    showImageModal() {
      this.show = true;
    },
  },
  components:{
      ImageUpload
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.chatHeader {
    display: flex;
    line-height: 38px;
    width: 100%;
    height: 38px;
    background: #f5f5f5;
  .chatTitle{
      flex: 1;
    //   text-shadow: -1px -1px white, 1px 1px gray, 2px 2px #7a7a7a, 3px 3px #757575, 4px 4px #707070, 5px 5px #6b6b6b, 6px 6px #666666, 7px 7px #616161, 8px 8px #5c5c5c, 9px 9px #575757, 10px 10px #525252, 11px 11px #4d4d4d, 18px 18px 30px rgba(0, 0, 0, 0.4), 18px 18px 10px rgba(0, 0, 0, 0.4);
  }
  .chatClose{
      width: 38px;
      height: 38px;
      line-height: 38px;
      text-align: center;
      cursor: pointer;
      font-size: 18px;
  }
  .chatClose:hover{
      background: #F45454;
      color: #FFF;
  }
}

.chatBody {
    position: fixed;
  height: 617px;
  min-height: 400px;
  width: 100%;
  max-width: 970px;
  background-color: transparent;
  display: flex;
  border: 1px solid #ccc;
  border-radius: 2px;
  box-shadow: 1px 1px 50px rgba(0,0,0,.3);
  -moz-box-shadow: 1px 1px 50px rgba(0,0,0,.3);
  .chatMenu {
    width: 249px;
    min-width: 249px;
    height: 100%;
    color: #000;
    background: #eeeae8;
    // background-image: url('http://img4.imgtn.bdimg.com/it/u=2437490319,4223558315&fm=26&gp=0.jpg') ;
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
  .chatItemList {
    height: 93%;
    overflow-y: auto;
  }
  .chatContent {
    width: 100%;
  }
  .chatTitle {
    padding-left: 24px;
  }
  .userItemFix {
    padding: 8px 0 9px 20px;
    border-bottom: 1px solid #ccc;
    //   position:fixed;
    width: 230px;
  }
  .userItem {
    padding: 8px 0 8px 20px;
    display: flex;
    &.active{
        background: #c3c3c3;
    }
    .userItemAvatar {
      width: 40px;
    }
    .userItemContent {
      flex: 1;
      .userItemText {
        line-height: 20px;
        margin-left: 8px;
        width: 178px;
        display: flex;
        overflow: hidden;
        .userItemLastTime {
          justify-content: flex-end;
          text-align: right;
          padding-right: 4px;
          font-size: 10px;
          width: 76px;
        }
        .userItemName {
          flex: 1;
          width: 92px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      .userItemLastMsg {
        width: 130px;
        font-size: 14px;
        margin-left: 8px;
        color: #666;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
  .userItem:hover {
    background: #d2d2d2;
    cursor: pointer;
  }
  .chatContent {
    display: flex;
    flex-direction: column;
    .chat-content {
      height: 450px;
      width: 100%;
      background: #f5f5f5;
    //   background-image: url('http://hbimg.b0.upaiyun.com/e08f50197a176c763469b91ed093f0f835d7533617b400-c57GHE_fw658') ;
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
  }
  .msgTimeDiv{
      text-align: center;
      margin: 5px auto;
      .msgTime{
          background: #dadada;
          padding: 2px 4px;
          color: #FFF;
          border-radius: 2px;
          letter-spacing: 1px;
        font-size: 8px;
    }
  }
}
.message-wrap{
    padding: 8px 0;
    padding-left: 4px!important;
}
.message-body{
    font-size: 16px;
}
.emoji{
    text-align:left;
    position: relative;
    padding:6px;
    height:24px;
    line-height: 24px;
    font-size: 20px;
    background:#FFF;
    border-bottom: 1px solid #eeeae8;
    border-left: 1px solid #eeeae8;
    #chatbox-emoji-panel{
        transform-origin: center top;
        position: absolute;
        z-index: 1;
        top: -249px;
        left: -58px;
        background: #FFF;
        // margin-top: -150px;
        width: 474px;
        height: 256px;
        overflow: auto;
        font-size: 20px;
        box-shadow: 1px 1px 15px rgba(0,0,0,.3);
        -moz-box-shadow: 1px 1px 15px rgba(0,0,0,.3);
        ol{
            padding: 20px;
            height: 256px;
        }
        ol>li{
            list-style: none;
            float: left;
            padding: 2px;
            height: 29px;
            width: 29px;
            cursor: pointer;
        }
        ol>li:hover{
            background: #E7E7E7;
        }
    }
}
.footer{
    height: 90px;
    width: 100%;
    display: flex;
    flex-direction: row;
}
.footer .message-wrap{
    padding-left: 20px;
    -webkit-box-flex: 1;
    flex: 1;
    overflow: hidden;
}
.send-btn{
    background: #5FB878;
    color: #FFF;
}
.msg-image{
    width: 36px;
    height: 36px;
}
.cursor{
    cursor: pointer;
}
::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 4px;
}
::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
//   background: rgba(0, 0, 0, 0.2);
}
::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
//   -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: #f5f5f5;
}
</style>
