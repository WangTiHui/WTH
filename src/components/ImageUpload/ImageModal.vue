<template>
  <div>

    <Modal :show.sync="getshow" title="选择图片" width="832px" style="height:1000px;margin-top: -2vh;" :showfooter="false">
      <div>
        <el-button-group>
          <el-button type="primary">阿里云图片库</el-button>
          <el-button @click="$refs.imgfile.click()">本地上传</el-button>
        </el-button-group>
        <input
                type="file"
                accept="image/*"
                style="display: none"
                ref="imgfile"
                @change="changefile($event.target)"
        />
        <div class="margintop"></div>

        <el-form :inline="true" :model="params">
          <el-form-item label="图片名称">
            <el-input v-model.trim="params.image_name" maxlength="100" placeholder="请输入图片名称"></el-input>
          </el-form-item>
          <el-form-item label="创建日期">
            <el-date-picker
                    v-model="form.date"
                    type="daterange"
                    align="right"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="pickerOptions"
                    value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">搜索</el-button>
          </el-form-item>
        </el-form>
        <div class="tablebox better-scrollbar" id="scrBller">
          <TmTable :columns="columns" :dataSource="list" @gownt="gownt">
            <template #url="{data: {url}}">
              <img :src="url" class="lineimg"/>
            </template>

            <template #created_at="{data: {created_at}}">
              <span>{{created_at | formatTime}}</span>
            </template>

            <div slot="handleColumn">
              <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                  <el-button
                          @click="selectimg(scope.row)"
                          size="mini"
                          icon="el-icon-check"
                          type="primary"
                  >选择</el-button>
                </template>
              </el-table-column>
            </div>
          </TmTable>
        </div>
        <div class="margintop"></div>
      </div>
      <Pagination  :total="total" :pageSize="params.page_size"  @handleSizeChange="handleSizeChange"   @handleCurrentChange="getlistdata"/>
    </Modal>

    <el-dialog title="图片预览" :visible.sync="isShowImageDialog">
      <div class="" style="display: flex;justify-content: center">
        <img :src="imgs"/>
      </div>
    </el-dialog>
  </div>


</template>

<script>
import { Modal, TmTable, Pagination } from "../FormTable";
import imgs from "@/assets/images";
import api from "@/api/ossimgApi";

export default {
  components: {
    Modal,
    TmTable,
    Pagination
  },
  props: {
    show: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    getshow: {
      get() {
        return this.show;
      },
      set(val) {
        this.$emit("update:show", val);
      }
    }
  },
  data() {
    return {
      form: {
        name: "",
        date: ""
      },
      columns: [
        {
          hasSort: false,
          isShow: true,
          prop: "id",
          label: "附件ID",
          width: 80
        },
        {
          hasSort: false,
          isShow: true,
          prop: "file_name",
          label: "图片名称"
        },
        {
          hasSort: false,
          isShow: true,
          prop: "url",
          label: "图片预览",
          style: true
        },
        {
          hasSort: false,
          isShow: true,
          prop: "width",
          label: "宽度"
        },
        {
          hasSort: false,
          isShow: true,
          prop: "height",
          label: "高度"
        },
        {
          hasSort: false,
          isShow: true,
          prop: "size",
          label: "文件大小"
        },

        {
          hasSort: false,
          isShow: true,
          prop: "created_at",
          label: "创建时间",
          style: true
        }
      ],
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      params: {
        page_no: 1,
        page_size: 20,
        image_name:"",
        start_time:"",
        end_time:""
      },
      total:0,
      list: [],
      imgs:"",
      isShowImageDialog:false
    };
  },
  methods: {
    onSubmit() {
      if(this.params.image_name.length>100){
           return this.$message.error("图片名称长度超过限制!")
      }
       this.getlistdata(1)
    },
    selectimg(row) {
      this.$emit("update:show", false);
      this.$emit("select", row);
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
      data.append("image", img);
      api
        .uploadImage(data)
        .then(res => {
          if (res) {
            this.$emit("update:show", false);
            this.$emit("select", { url: res });
          }
        })
        .catch(e => {
          this.$message.error(e);
          dom.value = "";
        });
    },
    getlistdata(size) {
      document.getElementById("scrBller")?document.getElementById("scrBller").scrollTop = 0:""
      this.form.date[0]?this.params.start_time = this.form.date[0]:""
      this.form.date[1]?this.params.end_time = this.form.date[1]:""
      size?this.params.page_no=size:this.params.page_no;
      api.getOssImageList(this.params).then(res => {
        this.list = res.list;
        this.total = parseInt(res.total_count);
      });
    },
    clearImg() {
      this.imgs = []
    },
    gownt(url){
      this.isShowImageDialog = true;
      this.imgs = url
    },
    handleSizeChange(size){

         this.params.page_size = size
      this.getlistdata();
    }
  },
  created() {
    this.getlistdata();
  }
};
</script>

<style lang="less" scoped>
.margintop {
  height: 20px;
}
.lineimg {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.tablebox {
  max-height: 500px;
}
/*.el-dialog-div{*/
/*  height: 60vh;*/
/*  overflow: auto;*/
/*}*/

</style>