<script lang="ts" setup>
import login from "@/apis/login";

// 引入userStore仓库
import { useUserStore } from "@/store/modules/user";
const userStore = useUserStore();

const clickLogin = () => {
  login({ username: "ls", password: "456" }).then((res) => {
    // res.data && sessionStorage.setItem('Authorization', res.data.result.accessToken)
    // console.log("res==>", res);
    return res;
  });
};

const value1 = ref("");
</script>

<template>
  <div class="demo-date-picker">
    <el-row class="mb-4">
      <el-button round>Round</el-button>
      <el-button type="primary" round>Primary</el-button>
      <el-button type="success" round @click="clickLogin">Success</el-button>
    </el-row>
    <div class="block">
      <span class="demonstration">Default</span>
      <el-date-picker v-model="value1" type="date" placeholder="Pick a day">
      </el-date-picker>
    </div>
    <div class="box" @click="userStore.age++">
      {{ userStore.name }}|{{ userStore.age }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.box {
  display: flex;
  width: 200px;
  height: 200px;
  background: #6876aa;
}
</style>
