<template>
    <div>
      <Button type="primary"  @click="reflash">刷新</Button>
       <Modal
   v-model="addModal" title="添加国家"
   @on-ok="ok"  @on-cancel="cancel">
           <Form :model="formItem" :label-width="80">                 
            <FormItem label="地区选择">
                <RadioGroup v-model="formItem.typeid">
                    <Radio label="zo">中欧</Radio>
                    <Radio label="do">东欧</Radio>
                    <Radio label="xo">西欧</Radio>
                    <Radio label="no">南欧</Radio>
                    <Radio label="bo">北欧</Radio>
                    <Radio label="dny">东南亚</Radio>
                </RadioGroup>
            </FormItem>

            <FormItem label="请填写国家名">
               <Input v-model="formItem.country" placeholder="输入国家名称..."/>
            </FormItem>

            <div class="clearfix"></div>
            <div class="acc_sc">
                <img  id="aliImg" :src="logo">
                <Upload ref="upload"  name="picUrl" :show-upload-list="false"  :on-success="aliHandleSuccess"  :action="uploadUrl" enctype="multipart/form-data">
                  <Button type="primary"   icon="ios-cloud-upload-outline">上传logo</Button>
                </Upload>
            </div> 
              <div class="acc_sc">
                <img  id="aliImg" :src="pic1">
                <Upload ref="upload"  name="picUrl" :show-upload-list="false"  :on-success="aliHandleSuccess1"  :action="uploadUrl" enctype="multipart/form-data">
                  <Button type="primary"   icon="ios-cloud-upload-outline">上传banner1</Button>
                </Upload>
            </div> 
              <div class="clearfix"></div>
             <div class="acc_sc">
                <img  id="aliImg" :src="pic2">
                <Upload ref="upload"  name="picUrl" :show-upload-list="false"  :on-success="aliHandleSuccess2"  :action="uploadUrl" enctype="multipart/form-data">
                  <Button type="primary"   icon="ios-cloud-upload-outline">上传banner2</Button>
                </Upload>
            </div>   
             <div class="acc_sc">
                <img  id="aliImg" :src="pic3">
                <Upload ref="upload"  name="picUrl" :show-upload-list="false"  :on-success="aliHandleSuccess3"  :action="uploadUrl" enctype="multipart/form-data">
                  <Button type="primary"   icon="ios-cloud-upload-outline">上传banner3</Button>
                </Upload>
            </div>  
              <div class="clearfix"></div>               
        </Form>
    </Modal>
     <Modal
   v-model="UPModal" title="修改国家"
   @on-ok="okUP"  @on-cancel="cancel">
          <Form :model="formItem" :label-width="80">                 
            <FormItem label="地区选择">
                <RadioGroup v-model="formItem.typeid">
                    <Radio label="zo">中欧</Radio>
                    <Radio label="do">东欧</Radio>
                    <Radio label="xo">西欧</Radio>
                    <Radio label="no">南欧</Radio>
                    <Radio label="bo">北欧</Radio>
                    <Radio label="dny">东南亚</Radio>
                </RadioGroup>
            </FormItem>

            <FormItem label="请填写国家名">
               <Input v-model="formItem.country" placeholder="输入国家名称..."/>
            </FormItem>

            <div class="clearfix"></div>
            <div class="acc_sc">
                <img  id="aliImg" :src="logo">
                <Upload ref="upload"  name="picUrl" :show-upload-list="false"  :on-success="aliHandleSuccess"  :action="uploadUrl" enctype="multipart/form-data">
                  <Button type="primary"   icon="ios-cloud-upload-outline">上传logo</Button>
                </Upload>
            </div> 
              <div class="acc_sc">
                <img  id="aliImg" :src="pic1">
                <Upload ref="upload"  name="picUrl" :show-upload-list="false"  :on-success="aliHandleSuccess1"  :action="uploadUrl" enctype="multipart/form-data">
                  <Button type="primary"   icon="ios-cloud-upload-outline">上传banner1</Button>
                </Upload>
            </div> 
              <div class="clearfix"></div>
             <div class="acc_sc">
                <img  id="aliImg" :src="pic2">
                <Upload ref="upload"  name="picUrl" :show-upload-list="false"  :on-success="aliHandleSuccess2"  :action="uploadUrl" enctype="multipart/form-data">
                  <Button type="primary"   icon="ios-cloud-upload-outline">上传banner2</Button>
                </Upload>
            </div>   
             <div class="acc_sc">
                <img  id="aliImg" :src="pic3">
                <Upload ref="upload"  name="picUrl" :show-upload-list="false"  :on-success="aliHandleSuccess3"  :action="uploadUrl" enctype="multipart/form-data">
                  <Button type="primary"   icon="ios-cloud-upload-outline">上传banner3</Button>
                </Upload>
            </div>  
              <div class="clearfix"></div>             
        </Form>
    </Modal>
        <Button type="primary"    @click="add" style="float:right">增加</Button>
        <div class="clearfix"></div>
        <Row class="margin-top-10">
          <Table :columns="tableTitle" :data="tableData"/>
        </Row>
        <Row class="pageWrapper">
          <Page :total="total"  :current="current" show-total  :page-size="10"   @on-change="changePage"></Page>
        </Row>
             </div>
</template>
<script>
import {
  countryconfigdelete,
  countryconfiglist,
  BASICURL,
  countryconfigUpdate,
  countryconfigdetail,
  countryconfigadd
} from "@/service/getData";
export default {
  name: "countryconfig",
  data() {
    return {
      currentPageIdx: 1,
      current: 1,
      total: 1,
      id: 0,
      addModal: false,
      UPModal: false,
      // showModal:false,
      uploadUrl: BASICURL + "admin/upload",
      logo: require("../../assets/images/talkingdata.png"),
      pic1: require("../../assets/images/talkingdata.png"),
      pic2: require("../../assets/images/talkingdata.png"),
      pic3: require("../../assets/images/talkingdata.png"),
      formItem: {
        country: "",
        typeid: "zo"
      },
      tableTitle: [
        {
          title: "logo图片",
          key: "logo",
          align:"center",
          render: (h, params) => {
            const pic = params.row.logo;
            let text = "";
            return h("div", [
              h("img", {
                attrs: {
                  src: pic
                },
                style: {
                  width: "100px",
                  height: "70px"
                }
              }),
              h("span", {}, text)
            ]);
          }
        },
        {
          title: "banner1",
          key: "pic1",
             align:"center",
          render: (h, params) => {
            const pic = params.row.pic1;
            let text = "";
            return h("div", [
              h("img", {
                attrs: {
                  src: pic
                },
                style: {
                  width: "100px",
                  height: "70px"
                }
              }),
              h("span", {}, text)
            ]);
          }
        },
        {
          title: "banner2",
          key: "pic2",
             align:"center",
          render: (h, params) => {
            const pic = params.row.pic2;
            let text = "";
            return h("div", [
              h("img", {
                attrs: {
                  src: pic
                },
                style: {
                  width: "100px",
                  height: "70px"
                }
              }),
              h("span", {}, text)
            ]);
          }
        },
        {
          title: "banner3",
          key: "pic3",
             align:"center",
          render: (h, params) => {
            const pic = params.row.pic3;
            let text = "";
            return h("div", [
              h("img", {
                attrs: {
                  src: pic
                },
                style: {
                  width: "100px",
                  height: "70px"
                }
              }),
              h("span", {}, text)
            ]);
          }
        },
        {
          title: "地区类型",
          key: "typeid",
             align:"center",
          render: (h, params) => {
            const typeid = params.row.typeid;
            let text = "";
            if (typeid == "zo") {
              text = "中欧";
            } else if (typeid == "xo") {
              text = "西欧";
            } else if (typeid == "no") {
              text = "南欧";
            } else if (typeid == "bo") {
              text = "北欧";
            } else if (typeid == "do") {
              text = "东欧";
            } else if(typeid=='dny'){
              text="东南亚"
            }
             return h("div", {},text)
          }
        },
        {
          title: "国家",
          key: "country",
             align:"center",
        },
        {
          title: "操作",
          align: "center",
          width: 240,
          key: "introduceBriefly",
          render: (h, params) => {
            const id = params.row.Id;
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "20px"
                  },
                  class: {
                    // disabled: authStatus === 0 ? false : true
                  },
                  on: {
                    click: () => {
                      this.godelete(id);
                    }
                  }
                },
                "删除"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "20px"
                  },
                  class: {
                    // disabled: authStatus === 0 ? false : true
                  },
                  on: {
                    click: () => {
                      this.id = id;
                      this.goupdate(id);
                    }
                  }
                },
                "修改"
              )
            ]);
          }
        }
      ],
      tableData: []
    };
  },
  methods: {
    reflash() {
      this.$Spin.show({
        render: h => {
          return h("div", [
            h("Icon", {
              class: "demo-spin-icon-load",
              props: {
                type: "ios-loading",
                size: 18
              }
            }),
            h("div", "Loading")
          ]);
        }
      });
      this.getData({ pageNo: this.currentPageIdx, pageSize: 10 });
    },
    // 模态框的出现与隐藏
    add() {
      this.addModal = true;
      this.logo = require("../../assets/images/talkingdata.png");
      this.pic1 = require("../../assets/images/talkingdata.png");
      this.pic2 = require("../../assets/images/talkingdata.png");
      this.pic3 = require("../../assets/images/talkingdata.png");
      this.formItem.typeid = "zo";
      this.formItem.country = "";
    },
    // 点击确定时
    ok() {
      let params = [];
      params["logo"] = this.logo||"";
      params["pic1"] = this.pic1||"";
      params["pic2"] = this.pic2||"";
      params["pic3"] = this.pic3||"";
      params["country"] = this.formItem.country;
      params["typeid"] = this.formItem.typeid;
      countryconfigadd(params).then(res => {
        if (res.status == 200) {
          this.$Message.success("增加成功");
          this.getData({ pageNo: this.currentPageIdx, pageSize: 10 });
        } else {
          this.$Message.error("增加失败");
          this.getData({ pageNo: this.currentPageIdx, pageSize: 10 });
        }
      });
    },
    okUP() {
      let params = [];
      params["logo"] = this.logo || "";
      params["pic1"] = this.pic1 || "";
      params["pic2"] = this.pic2 || "";
      params["pic3"] = this.pic3 || "";
      params["typeid"] = this.formItem.typeid;
      params["country"] = this.formItem.country;
      params["Id"] = this.id;
      countryconfigUpdate(params).then(res => {
        console.log(res);
        if (res.status == 200) {
          this.$Message.success("修改成功");
          this.getData({ pageNo: this.currentPageIdx, pageSize: 10 });
        } else {
          this.$Message.error("修改失败");
          this.getData({ pageNo: this.currentPageIdx, pageSize: 10 });
        }
      });
    },
    cancel() {
      this.addModal = false;
      this.UPModal = false;
    },
    aliHandleSuccess(res, file) {
      this.logo = BASICURL + res.ret_code;
    },
    aliHandleSuccess1(res, file) {
      this.pic1 = BASICURL + res.ret_code;
    },
    aliHandleSuccess2(res, file) {
      this.pic2 = BASICURL + res.ret_code;
    },
    aliHandleSuccess3(res, file) {
      this.pic3 = BASICURL + res.ret_code;
    },
    changePage(pageIndex) {
      this.currentPageIdx = pageIndex;
      let obj = {
        pageNo: pageIndex,
        pageSize: 10
      };
      this.getData(obj);
    },
    getData(obj) {
      countryconfiglist(obj).then(res => {
        this.tableData = res.data;
        this.total = res.total;
        this.current = res.currentPage;
        this.$Spin.hide();
      });
    },
    godelete(id) {
      countryconfigdelete({ Id: id }).then(res => {
        if (res.status == 200) {
          this.$Message.success("删除成功");
          this.getData({ pageNo: this.currentPageIdx, pageSize: 10 });
        } else {
          this.$Message.error("删除失败");
          this.getData({ pageNo: this.currentPageIdx, pageSize: 10 });
        }
      });
    },
    countryconfigIdShow(id) {
      countryconfigdetail({ Id: id }).then(res => {
        this.logo = res.data[0].logo;
        this.pic1 = res.data[0].pic1;
        this.pic2 = res.data[0].pic2;
        this.pic3 = res.data[0].pic3;
        this.formItem.typeid = res.data[0].typeid;
        this.formItem.country = res.data[0].country;
      });
    },
    goupdate(id) {
      this.UPModal = true;
      this.countryconfigIdShow(id);
    }
  },
  created() {
    this.getData({ pageNo: this.currentPageIdx, pageSize: 10 });
  }
};
</script>
<style lang="less" scoped>
.clearfix {
  clear: both;
}
#aliImg {
  width: 80px;
  height: 30px;
}
</style>
