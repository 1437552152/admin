<template>
  <div> 
      <Button type="primary"  @click="reflash">刷新</Button>
     <Button type="primary"    @click="add" style="float:right">增加</Button>
     <div class="clearfix"></div>
    <Row class="margin-top-10">
      <Table :columns="tableTitle" :data="tableData"></Table>
    </Row>
     <Row class="pageWrapper" >
        <Page :total="total"  :current="current" show-total  :page-size="10"   @on-change="changePage"></Page>
      </Row>
  </div>
</template>
<script>
import { team, teamdelete } from "@/service/getData";
export default {
  name: "team",
  data() {
    return {
      currentPageIdx: 1,
      current: 1,
      total: 1,
      tableTitle: [
        {
          title: "姓名",
          key: "studentname"
        },
        {
          title: "学历",
          key: "education"
        },
        {
          title: "毕业院校",
          key: "school"
        },
        {
          title: "导师名称",
          key: "teachname"
        },
        {
          title: "图片",
          key: "pic",
          render: (h, params) => {
            const pic = params.row.pic;
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
          title: "简介",
          key: "introduceBriefly",
           render: (h, params) => {
            return h("div", [
                h(
                  "span",
                  {
                    style: {
                     overflow:"hidden",
                     textOverflow:"ellipsis",
                     display:"-webkit-box",
                     webkitBoxOrient:"vertical",
                     webkitLineClamp:3
                    }
                  },
                  params.row.introduceBriefly
                )])
          }
        },
        {
          title: "国家",
          key: "country"
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
                      this.$router.push({
                        path:"/teamdetail",
                        query:{id:id}
                      });
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
    add() {
      this.$router.push({
                        path:"/teamdetail",
                        query:{id:-1}
                      });
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
      team(obj).then(res => {
        this.tableData = res.data;
        this.total = res.total;
        this.current = res.currentPage;
        this.$Spin.hide();
      });
    },
    godelete(id) {
      teamdelete({ Id: id }).then(res => {
        if (res.status == 200) {
          this.$Message.success("删除成功");
          this.getData({ pageNo: this.currentPageIdx, pageSize: 10 });
        } else {
          this.$Message.error("删除失败");
          this.getData({ pageNo: this.currentPageIdx, pageSize: 10 });
        }
      });
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
</style>
