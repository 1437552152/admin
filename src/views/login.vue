<style lang="less">
@import "./login.less";
</style>

<template>
	<div class="login" @keydown.enter="handle">
		<div class="login-con">
			<Card :bordered="false">
				<p slot="title">
					<Icon type="log-in"></Icon> 欢迎登录
				</p>
				<div class="form-con">
					<Form ref="loginForm" :model="form" :rules="rules">
						<FormItem prop="username">
							<Input v-model="form.username" :disabled="btnDisable" placeholder="请输入用户名">
								<span slot="prepend">
									<Icon :size="16" type="person"></Icon>
								</span>
							</Input>
						</FormItem>

						<FormItem prop="password">
							<Input type="password" v-model="form.password" :disabled="btnDisable" placeholder="请输入密码">
								<span slot="prepend">
									<Icon :size="14" type="locked"></Icon>
								</span>
							</Input>
						</FormItem>

						<FormItem style="margin-top:10px">
							<Button @click="handle" type="primary" long>登录</Button>
						</FormItem>
						<p style="color:red;text-align:center" v-if="messshow">{{errormessage}}</p>
					</Form>
				</div>
			</Card>
		</div>
	</div>
</template>

<script>
import Cookies from "js-cookie";
import store from "../store";

import { setStore, getStore, removeStore } from "@/config/storage";
import { BASICURL, Login } from "@/service/getData";

export default {
  data() {
    return {
      btnDisable: false,
      form: {
        username: null,
        password: null
      },
      messshow: false,
      errormessage: null,
      rules: {
        username: [{ required: true, message: "不能为空", trigger: "blur" }],
        password: [{ required: true, message: "不能为空", trigger: "blur" }]
      },
      permissions: {}
    };
  },
  methods: {
    handle() {
      Login({ username: this.form.username, password: this.form.password })
        .then(res => {
         let permissions=res.data.permissions;       
         permissions.map((item, index) => {
           permissions[index].id = item.menuId;
           permissions[index].title = item.name;
           permissions[index].description = item.name;
           permissions[index].sort = item.orderNum;
             item.submenus.map((childitem, childindex) => {
              item.submenus[childindex].id = childitem.menuId;
              item.submenus[childindex].description = childitem.name;
              item.submenus[childindex].title = childitem.name;
              item.submenus[childindex].sort = childitem.orderNum;
            });
          });
           if (res.code==0) {
            Cookies.set("user", res.data.admin.username, { expires: 7 });
            Cookies.set("userInfo", res.data.admin, { expires: 7 });
            setStore("leftSidebarList",permissions);
            this.$router.push({ name: "home_index" });
          } else this.$Message.error(res.msg);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {}
};
</script>