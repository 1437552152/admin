<template>
  <div>
<div style="margin:0 auto;width:700px">
 <Form :model="formItem" :label-width="80">
        <FormItem label="文章标题">
            <Input v-model="formItem.title" placeholder="请输入文章标题..."/>
        </FormItem>
        <FormItem label="文章作者">
            <Input v-model="formItem.author" placeholder="请输入文章作者..."/>
        </FormItem>
         <FormItem label="文章描述">
            <Input v-model="formItem.des"  type="textarea"  placeholder="请输入描述内容..."/>
        </FormItem>
         <FormItem label="文章关键词">
            <Input v-model="formItem.keyword" placeholder="请输入文章关键词..."/>
        </FormItem>
        <FormItem label="文章类型">
            <Select v-model="formItem.newstype">
                <Option value="0">普通文章</Option>
                <Option value="1">热点文章</Option>             
            </Select>
        </FormItem>
        <FormItem label="国家选择切换">
            <RadioGroup v-model="formItem.country">
                <Radio  v-for="(item,index) in countrydata" :key="index"  :label='item.country' :value="item.country">{{item.country}}</Radio>
            </RadioGroup>
        </FormItem>   
        <div class="acc_sc">
            <img  id="aliImg" style="width: 200px;height:170px;" :src="pic">
            <Upload ref="upload"  name="picUrl" :show-upload-list="false"  :on-success="aliHandleSuccess"  :action="uploadUrl" enctype="multipart/form-data">
              <Button type="success"   icon="ios-cloud-upload-outline">上传焦点图片</Button>
            </Upload>
            <div class="clearfix"></div>
        </div>
         <div class="clearfix"></div>
   <div id="Test" style="background-color:#fff">
      <quill-editor ref="myTextEditor"
                v-model="content" :options="quillOption"  style="height:500px"   @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
        @change="onEditorChange($event)">
      </quill-editor>
    </div>
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
  newsdetail,
  newsUpdate,
  newsadd,
  country
} from "@/service/getData";
import { quillEditor } from "vue-quill-editor";
import quillConfig from "../../libs/quill-config.js";
export default {
  name: "articledetail",
  components: {
    quillEditor
  },
  data() {
    return {
      uploadUrl: BASICURL + "admin/upload",
      pic: "",
      countrydata: null,
      formItem: {
        title: "",
        country: "捷克",
        author: "",
        des: "",
        keyword: "",
        newstype: "0"
      },
      content: "",
      article: "",
      quillOption: quillConfig
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
    onEditorBlur() {
      //失去焦点事件
    },
    onEditorFocus() {
      //获得焦点事件
    },
    onEditorChange(value) {
      //内容改变事件
    },
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
      this.formItem.title = "";
      this.formItem.author = "";
      this.formItem.des = "";
      this.formItem.keyword = "";
      this.formItem.newstype = "";
      this.content = "";
      this.article = "";
      this.articlenewstype = "0";
    },
    getData(params) {
      newsdetail(params).then(res => {
        this.formItem.title = res.data[0].title;
        this.formItem.country = res.data[0].country;
        this.formItem.author = res.data[0].author;
        this.formItem.des = res.data[0].des;
        this.formItem.keyword = res.data[0].keyword;
        this.formItem.newstype = res.data[0].newstype;
        this.pic = res.data[0].focusPic;
        this.content = this.article = res.data[0].content;
      });
    },
    handleChange(html, text) {
      this.article = html;
    },
    sure() {
      let params = [];
      params["pic"] = this.pic;
      params["title"] = this.formItem.title;
      params["author"] = this.formItem.author;
      params["country"] = this.formItem.country;
      params["des"] = this.formItem.des;
      params["newstype"] = this.formItem.newstype;
      params["content"] = this.content;
      params["keyword"] = this.formItem.keyword;
      params["Id"] = this.$route.query.id;
      if (this.$route.query.id != -1) {
        params["content"] = this.article;
        newsUpdate(params).then(res => {
          if (res.status == 200) {
            this.$Message.success("修改成功");
          } else {
            this.$Message.error("修改失败");
          }
        });
      } else {
        params["content"] = this.article;
        newsadd(params).then(res => {
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
