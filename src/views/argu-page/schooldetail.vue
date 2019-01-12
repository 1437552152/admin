<template>
  <div>
<div style="margin:0 auto;width:700px">
 <Form :model="formItem" :label-width="80">
        <FormItem label="学校名称">
            <Input v-model="formItem.schoolName" placeholder="请输入学校名称..."/>
        </FormItem>
        <FormItem label="学校描述">
            <Input v-model="formItem.des"  type="textarea"  placeholder="请输入描述内容..."/>
        </FormItem>
         <FormItem label="申请学校录取率">
            <Input v-model="formItem.acceptanceRate" placeholder="请输入申请该学校的录取率..."/>
        </FormItem>
       
        <FormItem label="国家选择切换">
            <RadioGroup v-model="formItem.country">
                <Radio  v-for="(item,index) in countrydata" :key="index"  :label='item.country' :value="item.country">{{item.country}}</Radio>
            </RadioGroup>
        </FormItem>   
        <div class="acc_sc">
            <img  id="aliImg" style="width: 200px;height:170px;" :src="pic">
            <Upload ref="upload"  name="picUrl" :show-upload-list="false"  :on-success="aliHandleSuccess"  :action="uploadUrl" enctype="multipart/form-data">
              <Button type="success"   icon="ios-cloud-upload-outline">上传学校logo</Button>
            </Upload>
            <div class="clearfix"></div>
        </div>
         <div class="clearfix"></div>
    <editor ref="editor" :value="content" @on-change="handleChange"/>
    <!-- <button @click="changeContent">修改编辑器内容</button> -->
        <FormItem>
            <Button type="primary"   @click="sure">保存</Button>
            <Button style="margin-left: 8px">删除</Button>
        </FormItem>
    </Form>
  </div>
  </div>
</template>
<script>
import {
  BASICURL,
  schooldetail,
  schoolUpdate,
  schoolAdd,
  country
} from "@/service/getData";
import Editor from "_c/editor";
import { mapMutations } from "vuex";
export default {
  name: "schooldetail",
  components: {
    Editor
  },
  data() {
    return {
      uploadUrl: BASICURL + "admin/upload",
      pic: require("../../assets/images/talkingdata.png"),
      countrydata: null,
      formItem: {
        schoolName: "",
        country: "捷克",
        des: "",
        acceptanceRate: ""
      },
      content: "",
      article: ""
    };
  },
  created() {
    this.getCountry();
    if (this.$route.query.id != -1) {
      this.getData({ id: this.$route.query.id });
    } else {
      this.getblank();
    }
  },
  methods: {
    ...mapMutations(["closeTag"]),
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
      this.$refs.editor.setHtml("");
      this.formItem.schoolName = "";
      this.formItem.des = "";
      this.formItem.acceptanceRate = "";
      this.formItem.country = "";
      this.content = "";
      this.article = "";
    },
    getData(params) {
      schooldetail(params).then(res => {
        this.formItem.schoolName = res.data[0].schoolName;
        this.formItem.country = res.data[0].country;
        this.formItem.des = res.data[0].des;
        this.formItem.acceptanceRate = res.data[0].acceptanceRate;
        this.pic = res.data[0].logo;
        this.content = this.article = res.data[0].content;
        this.$refs.editor.setHtml(this.content);
      });
    },
    handleChange(html, text) {
      this.article = html;
    },
    sure() {
      let params = [];
      params["pic"] = this.pic;
      params["schoolName"] = this.formItem.schoolName;
      params["country"] = this.formItem.country;
      params["des"] = this.formItem.des;
      params["acceptanceRate"] = this.formItem.acceptanceRate;
      params["content"] = this.content;
      params["Id"] = this.$route.query.id;
      if (this.$route.query.id != -1) {
        params["content"] = this.article;
        schoolUpdate(params).then(res => {
          this.closeTag({
            name: "articledetail"
          });
          if (res.status == 200) {
            this.$Message.success("修改成功");
          } else {
            this.$Message.error("修改失败");
          }
        });
      } else {
        params["content"] = this.article;
        schoolAdd(params).then(res => {
          this.closeTag({
            name: "articledetail"
          });
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
