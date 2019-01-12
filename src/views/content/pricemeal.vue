<template>
    <div>
      <Button type="primary"  @click="reflash">刷新</Button>
       <Modal
   v-model="addModal" title="添加套餐"
   @on-ok="ok"  @on-cancel="cancel">
           <Form :model="formItem" :label-width="80">                       
           <FormItem label="国家选择切换">
                <RadioGroup v-model="formItem.country">
                    <Radio  v-for="(item,index) in countrydata" :key="index"  :label='item.country' :value="item.country">{{item.country}}</Radio>
                </RadioGroup>
            </FormItem> 
          <FormItem label="请填写价格">
               <Input v-model="formItem.price" placeholder="输入价格..."/>
            </FormItem>
            <FormItem label="输入时间范围">
                <Input v-model="formItem.addtime" placeholder="输入时间范围..."/>
            </FormItem> 
            <FormItem label="请填写地址">
               <Input v-model="formItem.address" placeholder="输入地址..."/>
            </FormItem>
           <FormItem label="请填写描述信息">
               <Input v-model="formItem.des" type="textarea" :autosize="{minRows: 2,maxRows: 5}"  placeholder="输入描述信息..."/>
            </FormItem>      
        </Form>
    </Modal>
     <Modal
   v-model="UPModal" title="修改国家"
   @on-ok="okUP"  @on-cancel="cancel">
          <Form :model="formItem" :label-width="80">                       
           <FormItem label="国家选择切换">
                <RadioGroup v-model="formItem.country">
                    <Radio  v-for="(item,index) in countrydata" :key="index"  :label='item.country' :value="item.country">{{item.country}}</Radio>
                </RadioGroup>
            </FormItem> 
          <FormItem label="请填写价格">
               <Input v-model="formItem.price" placeholder="输入价格..."/>
            </FormItem>
            <FormItem label="输入时间范围">
               <Input v-model="formItem.addtime" placeholder="输入时间范围..."/>
                <!-- <DatePicker :value="formItem.addtime" format="yyyy-MM-dd" type="datetimerange" placement="bottom-end" placeholder="Select date" style="width: 200px"></DatePicker> -->
            </FormItem> 
            <FormItem label="请填写地址">
               <Input v-model="formItem.address" placeholder="输入地址..."/>
            </FormItem>
           <FormItem label="请填写描述信息">
               <Input v-model="formItem.des" type="textarea" :autosize="{minRows: 2,maxRows: 5}"  placeholder="输入描述信息..."/>
            </FormItem>      
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
  pricedelete,
  priceList,
  priceUpdate,
  country,
  pricedetail,
  priceadd
} from "@/service/getData";
export default {
  name: "pricemeal",
  data() {
    return {
      countrydata: null,
      currentPageIdx: 1,
      current: 1,
      total: 1,
      id: 0,
      addModal: false,
      UPModal: false,
      formItem: {
        country: "捷克",
        addtime:"",
        price: 0,
        address: "",
        des: ""
      },
      tableTitle: [
        {
          title: "价格",
          key: "price",
          align: "center"
        },
        {
          title: "地址",
          key: "address",
          align: "center"
        },
        {
          title: "描述",
          key: "des",
          align: "center"
        },
        {
          title: "时间",
          key: "addtime",
          align: "center"
        },
        {
          title: "国家",
          key: "country",
          align: "center"
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
    },
    // 点击确定时
    ok() {
      let params = [];
      params["country"] = this.formItem.country;
      params["price"] = this.formItem.price;
      params["addtime"] = this.formItem.addtime;
      params["address"] = this.formItem.address;
      params["des"] = this.formItem.des;
      priceadd(params).then(res => {
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
      params["country"] = this.formItem.country;
      params["price"] = this.formItem.price;
      params["addtime"] = this.formItem.addtime;
      params["address"] = this.formItem.address;
      params["des"] = this.formItem.des;
      params["Id"] = this.id;
      priceUpdate(params).then(res => {
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
    timeChange(val){
      console.log(val)
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
      priceList(obj).then(res => {
        this.tableData = res.data;
        this.total = res.total;
        this.current = res.currentPage;
        this.$Spin.hide();
      });
    },
    godelete(id) {
      pricedelete({ Id: id }).then(res => {
        if (res.status == 200) {
          this.$Message.success("删除成功");
          this.getData({ pageNo: this.currentPageIdx, pageSize: 10 });
        } else {
          this.$Message.error("删除失败");
          this.getData({ pageNo: this.currentPageIdx, pageSize: 10 });
        }
      });
    },
    priceIdShow(id) {
      pricedetail({ Id: id }).then(res => {
        this.formItem.country = res.data[0].country;
        this.formItem.price = res.data[0].price;
        this.formItem.addtime = res.data[0].addtime;
        this.formItem.address = res.data[0].address;
        this.formItem.des = res.data[0].des;
      });
    },
    goupdate(id) {
      this.UPModal = true;
      this.priceIdShow(id);
    },
    getCountry() {
      let that = this;
      country().then(res => {
        that.countrydata = res.data;
      });
    }
  },
  created() {
    this.getCountry();
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
