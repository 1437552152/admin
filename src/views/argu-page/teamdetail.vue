<template>
  <div>
    <!-- <Card>
      <h2>学生({{ $route.query.id }})详情:</h2>
    </Card> -->
<div style="margin:0 auto;width:700px">
 <Form :model="formItem" :label-width="80">
        <FormItem label="姓名">
            <Input v-model="formItem.studentname" placeholder="请输入学生姓名..."/>
        </FormItem>

        <FormItem label="地址">
            <Input v-model="formItem.address" placeholder="请输入学生地址..."/>
        </FormItem>
         <FormItem label="毕业学校">
            <Input v-model="formItem.school" placeholder="请输入毕业院校..."/>
        </FormItem>
         <FormItem label="留学成绩">
            <Input v-model="formItem.score" placeholder="请输入留学成绩..."/>
        </FormItem>
        <FormItem label="学历">
            <Select v-model="formItem.education">
                <Option value="中专及以下">中专及以下</Option>
                <Option value="大专">大专</Option>
                <Option value="本科">本科</Option>
                <Option value="研究生">研究生</Option>
                <Option value="博士及博士以上">博士及博士以上</Option>
            </Select>
        </FormItem>
      
       <FormItem label="指导老师">
            <Input v-model="formItem.teachname" placeholder="请输入指导姓名..."/>
        </FormItem>
         <FormItem label="国家选择切换">
            <RadioGroup v-model="formItem.country">
                <Radio  v-for="(item,index) in countrydata" :key="index"  :label='item.country' :value="item.country">{{item.country}}</Radio>
            </RadioGroup>
        </FormItem>  
        <FormItem label="语言等级">
             <Input v-model="formItem.languagelevel" placeholder="请输入语言等级..."/>
        </FormItem>
        <FormItem label="简介描述">
            <Input v-model="formItem.introduceBriefly" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
        </FormItem>
        <div class="acc_sc">
            <img  id="aliImg" style="width: 200px;height:170px;" :src="pic">
            <Upload ref="upload"  name="picUrl" :show-upload-list="false"  :on-success="aliHandleSuccess"  :action="uploadUrl" enctype="multipart/form-data">
              <Button type="success"   icon="ios-cloud-upload-outline">上传学生图片</Button>
            </Upload>
         <div class="clearfix"></div>
        </div>
         <div class="clearfix"></div> 
    </Form>
  </div>
  <div class="components-container" style="max-width:1300px;margin:0 auto">
      <div class="editor-container">
      <UE :defaultMsg="defaultMsg" :config=config :id="ue1" ref="ue"></UE>
    </div>
  </div>
      <Button type="primary"   @click="sure">保存</Button>
      <Button style="margin-left: 8px">删除</Button>
  </div>
</template>
<script>
import {
  BASICURL,
  teamdetail,
  teamdeupdate,
  country,
  teamdeadd
} from "@/service/getData";
// import Editor from "_c/editor";
import UE from "../../components/ue/ue.vue";
export default {
  name: "teamdetail",
  components: { UE },
  data() {
    return {
      uploadUrl: BASICURL + "admin/upload",
      pic: require("../../images/talkingdata.png"),
      countrydata: null,
      formItem: {
        studentname: "",
        address: "",
        score: "",
        education: "",
        teachname: "",
        country: "捷克",
        school: "",
        introduceBriefly: "",
        languagelevel: ""
      },
      content: "",
      defaultMsg: "",
      config: {
        initialFrameWidth: null,
        initialFrameHeight: 350
      },
      ue1: "ue1"
    };
  },
  created() {
    this.getCountry();
    console.log(this.$route.query.id)
    if (this.$route.query.id!= -1) {
      this.getData({ id: this.$route.query.id });
    } else {
      this.getblank();
    }
  },
  methods: {
    aliHandleSuccess(res, file) {
      this.pic = BASICURL + res.ret_code;
    },
    getCountry() {
      let that = this;
      country().then(res => {
        that.countrydata = res.data;
      });
    },
    getblank() {
      this.formItem.studentname = "";
      this.formItem.address = "";
      this.formItem.score = "";
      this.formItem.education = "";
      this.formItem.teachname = "";
      this.formItem.school = "";
      this.formItem.country = "捷克";
      this.formItem.languagelevel = "";
      this.formItem.introduceBriefly = "";
      this.pic = require("../../images/talkingdata.png");
      this.defaultMsg="请输入内容..."
    },
    getData(params) {
      teamdetail(params).then(res => {
        this.formItem.studentname = res.data[0].studentname;
        this.formItem.address = res.data[0].address;
        this.formItem.score = res.data[0].score;
        this.formItem.education = res.data[0].education;
        this.formItem.teachname = res.data[0].teachname;
        this.formItem.school = res.data[0].school;
        this.formItem.country = res.data[0].country;
        this.formItem.languagelevel = res.data[0].languagelevel;
        this.formItem.introduceBriefly = res.data[0].introduceBriefly;
        this.pic = res.data[0].pic;
        this.defaultMsg = res.data[0].content;
      });
    },
    sure() {
      let params = [];
      params["pic"] = this.pic;
      params["studentname"] = this.formItem.studentname;
      params["address"] = this.formItem.address;
      params["score"] = this.formItem.score;
      params["education"] = this.formItem.education;
      params["school"] = this.formItem.school;
      params["country"] = this.formItem.country;
      params["teachname"] = this.formItem.teachname;
      params["introduceBriefly"] = this.formItem.introduceBriefly;
      params["languagelevel"] = this.formItem.languagelevel;
      params["content"] =this.$refs.ue.getUEContent();
      params["Id"] = this.$route.query.id;
      if (this.$route.query.id != -1) {
        params["content"] = this.$refs.ue.getUEContent();
        teamdeupdate(params).then(res => {
          if (res.status == 200) {
            this.$Message.success("修改成功");
          } else {
            this.$Message.error("修改失败");
          }
        });
      } else {
        params["content"] =this.$refs.ue.getUEContent();
        teamdeadd(params).then(res => {
          if (res.status == 200) {
            this.$Message.success("增加成功");
          } else {
            this.$Message.error("增加失败");
          }
        });
      }
    }
  }
};
</script>

<style>
</style>
