<template>
  <div class="player-container" v-if="showVideo">
      <video-player :options="playerOptions" class="vjs-big-play-centered"></video-player>
    </div>
</template>
<script>
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
// import 'videojs-contrib-hls.js/src/videojs.hlsjs'
export default {
  data () {
    return {
        showVideo:true,
        playerOptions: {
            playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
            autoplay: false, //如果true,浏览器准备好时开始回放。
            controls: true, //控制条
            preload: 'auto', //视频预加载
            muted: false, //默认情况下将会消除任何音频。
            loop: false, //导致视频一结束就重新开始。
            language: 'zh-CN',
            aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
            fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
            sources: [{
                  type: 'video/mp4',
                  src: 'https://mifbb-upload-image.oss-cn-hangzhou.aliyuncs.com/mifbb_test_app/o2o_shop/video/20200319/e89603dd29292e77bf7d982b64d175a2.mp4'
            }],
            poster: "https://mifbb-upload-image.oss-cn-hangzhou.aliyuncs.com/mifbb_app/decoration/20191217/47e6f24206a78e284d8dd7c88980eb0f.jpg", //你的封面地址
            width: document.documentElement.clientWidth,
            notSupportedMessage: '此视频暂无法播放，请稍后再试' //允许覆盖Video.js无法播放媒体源时显示的默认信息。
          }
        }
  },
  props:{
      videoUrl:{
          type:String,
          default:"https://mifbb-upload-image.oss-cn-hangzhou.aliyuncs.com/mifbb_test_app/o2o_shop/video/20200319/e89603dd29292e77bf7d982b64d175a2.mp4"
      }
  },
  methods: {
    updateVideo(){
        this.showVideo = false
        this.$nextTick(()=>{
            this.playerOptions.sources[0].src = this.videoUrl
            if(this.videoUrl==''){
                this.showVideo = false
            }else{
                this.showVideo = true
            }
        })
    }
  },
  computed: {
    
  }
};
</script>

<style lang="less" scoped>
/* @import "@/assets/scss/player.scss"; */
</style>