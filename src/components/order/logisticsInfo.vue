<template>
  <div class="mf-logisticsInfo">
      <el-dialog class="mf-dialog" title="物流详情" width="70%" :append-to-body="true" :visible.sync="showLogisticsInfoDialog" @close="closeLOgisticsInfoDialog">
          <div class="flex">
              <div class="width100">
                  <!-- <div class="center">
                      <el-image :src="img"></el-image>
                  </div> -->
                  <div>
                      <p><span>快递公司：</span>{{expName}} <span v-show="isShow"><el-link type="success" @click="changeLogistics" :underline="false">修改</el-link></span> </p>
                      <p><span>快递单号：</span>{{number}}</p>
                      <p><span>发货时间：</span>{{send_time}}</p>
                  </div>
              </div>
              <div class="flex1">
                    <el-timeline>
                        <el-timeline-item
                            v-for="(item, index) in logisticsInfoList"
                            :key="index"
                            :icon="item.icon"
                            :type="item.type"
                            :size="item.size"
                            :timestamp="item.time">
                            <span class="redColor" v-if="item.status.indexOf('签收')!=-1">{{item.status}}</span>
                            <span v-else>{{item.status}}</span>
                        </el-timeline-item>
                    </el-timeline>
              </div>
          </div>
          <span slot="footer" class="dialog-footer">
              <el-button @click="showLogisticsInfoDialog=false">关闭</el-button>
          </span>
      </el-dialog>
      <el-dialog class="mf-dialog" title="物流修改" width="40%" @close="closeEditLogisticsInfo" :append-to-body="true" :visible.sync="showEditLogisticsInfoDialog">
        <el-form :rules="rules" label-width="120px" :model="editForm">
          <el-form-item label="物流公司：">
            <el-select v-model="editForm.express_id">
              <el-option v-for="(item,index) in expressList" :key="index" :label="item.title" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="快递单号：" prop="express_no">
            <el-input v-model="editForm.express_no" placeholder="请输入新快递单号"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="closeEditLogisticsInfo">取消</el-button>
          <el-button type="success" @click="saveChange">确定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
export default {
    data(){
        return{
            showLogisticsInfoDialog:false,
            showEditLogisticsInfoDialog:false,
            logisticsInfoList:[],
            expressList:[],
            editForm:{
              order_id:'',
              express_id:'',
              express_no:'',
            },
            rules:{
              express_no:[
                {required:true,message:'请输入新的物流单号',trigger:'blur'}
              ]
            },
            detailId:'',
            express_id:'',
            express_no:'',
            redColor:false,
            isShow:false,
            type:[
                'primary',
                'success',
                'warning',
                'danger',
                'info'
            ],
            icon:[
                "el-icon-check",//对号
                "el-icon-s-flag",//红旗
                "el-icon-guide",//方向标
                "el-icon-truck",//汽车
                "el-icon-bicycle",//自行车
            ],
            img:'',
            expName:'',
            number:'',
            send_time:''
        }
    },
    mounted(){
      this.getLogicList()
    },
    methods:{
        getLogisticsInfoDetailInit(row){
            this.img = row.img
            this.detailId = row.id
            this.express_no = row.express_no
            this.express_id = row.express_id
            this.isShow = row.show
            this.getLogisticsInfoDetail()
        },
        getLogisticsInfoDetail(){
          this.$http.posts('/express/get-express',{express_id:this.express_id,express_no:this.express_no}).then(res=>{
            this.logisticsInfoList = res.list
            this.expName = res.expName
            this.number = res.number
            this.send_time = res.list[res.list.length-1].time
            this.logisticsInfoList.forEach(e=>{
                if(e.status.indexOf("到达")!=-1){
                    e.type = this.type[2]
                    e.icon = this.icon[3]
                    e.size = 'large'
                }
                if(e.status.indexOf("签收")!=-1){
                    e.type = this.type[1]
                    e.icon = this.icon[0]
                    e.size = 'large'
                    this.redColor = true
                }
                if(e.status.indexOf("派件")!=-1){
                    e.type = this.type[3]
                    e.icon = this.icon[4]
                    e.size = 'large'
                    this.redColor = true
                }
            })
          }).catch(error=>{
            this.$message.error(error)
          })
          this.showLogisticsInfoDialog = true
        },
        getLogicList(){
          this.$http.get('/express/system-express').then(res=>{
            this.expressList = res
          })
        },
        changeLogistics(){
          this.showEditLogisticsInfoDialog = true
        },
        closeEditLogisticsInfo(){
          this.editForm={
            order_id:'',
            express_id:'',
            express_no:'',
          }
          this.showEditLogisticsInfoDialog = false
        },
        saveChange(){
          this.editForm.order_id = this.detailId
          if(this.editForm.express_no==''){
            this.$message.error("请输入快递单号！")
            return false;
          }
          if(this.editForm.express_id==''){
            this.$message.error("物流公司不能为空！")
            return false;
          }
          this.$http.posts('/order/change-express',this.editForm).then(res=>{
            this.$message.success("修改物流成功")
            this.getLogisticsInfoDetail()
            this.getLogisticsInfoDetail()
          }).catch(error=>{
            console.log(error)
          })
        },
        closeLOgisticsInfoDialog(){

        }
    },
    components:{

    }
}
</script>

<style  lang="less" scoped>
.flex{
    display: flex;
}
.flex1{
    margin-left: 20px;
    flex: 1;
    height: 583px;
    padding-left: 4px;
    overflow: scroll;
}
.center{

    text-align: center;
    vertical-align: middle;
}
.redColor{
  color: red;
}
.el-input{
  width:260px;
}
.el-select{
  width:260px;
}
.width100{
    width: 220px;
}
.el-image{
    width: 80px;
    height: 80px;
}
  ::-webkit-scrollbar {
  /*滚动条整体样式*/
  width : 4px;  /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
  }
  ::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius   : 4px;
  background-color: rgba(0, 0, 0, 0.3);
  }
  ::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
  background   : #ededed;
  border-radius: 4px;
  }
</style>