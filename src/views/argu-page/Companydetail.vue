<template>
  <div>
    <!-- <Card>
      <h2>学生({{ $route.query.id }})详情:</h2>
    </Card> -->
<div style="margin:0 auto;width:700px">
 <Form :model="formItem" :label-width="80">  
        <FormItem label="文章类型" v-if="this.$route.query.id == -1">
            <Select v-model="formItem.type"  style="z-index:999">
                <Option value="1">捷航简介</Option>
                <Option value="2">企业文化</Option> 
                <Option value="3">企业环境</Option> 
                <!-- <Option value="4">隐私说明</Option>   -->
                <Option value="4">联系我们</Option>                
            </Select>
        </FormItem>  
        <FormItem label="文章关键词">
            <Input v-model="formItem.keywords" placeholder="请输入文章关键词..."/>
        </FormItem> 
   <div id="Test">
      <quill-editor ref="myTextEditor"
                v-model="content" :options="quillOption"  style="height:300px"   @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
        @change="onEditorChange($event)">
      </quill-editor>
    </div>
        <div  style="margin-top:100px">
            <Button type="primary"   @click="sure">保存</Button>
            <Button style="margin-left: 8px">取消</Button>
        </div>
    </Form>
  </div>
  </div>
</template>
<script>
import { quillEditor } from "vue-quill-editor";
import quillConfig from "../../libs/quill-config.js";
import {
  BASICURL,
  companydetail,
  companyupdate,
  companyadd
} from "@/service/getData";
import { mapMutations } from "vuex";
export default {
  name: "Companydetail",
  components: {
    quillEditor
  },
  data() {
    return {
      formItem: {
        // language: "zh",
        keywords: "",
        type: "1"
      },
      content: "",
      article: "",
      quillOption: quillConfig
    };
  },
  created() {
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
    getblank() {
      this.formItem.keywords = "";
      this.formItem.type = "1";
      this.content = "";
      this.article = "";
    },
    getData(params) {
      companydetail(params).then(res => {
        this.formItem.keywords = res.data[0].keywords;
        this.formItem.type = res.data[0].type;
        this.content = this.article = res.data[0].content;
      });
    },
    sure() {
      let params = {};
      params["type"] = this.formItem.type;
      params["content"] = this.content;
      params["keywords"] = this.formItem.keywords;
      if (this.$route.query.id != -1) {
        params["Id"] = this.$route.query.id;
        params["content"] = this.article;
        companyupdate(params).then(res => {
          if (res.status == 200) {
            this.$Message.success("修改成功");
          } else {
            this.$Message.error("修改失败");
          }
        });
      } else {
        params["content"] = this.article;
        companyadd(params).then(res => {
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
