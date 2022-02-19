<script setup lang="ts">
import login from "@/apis/login";

login({ username: "111", password: "xxx" }).then((res) => {
  console.log(res.data?.result.accessToken);
});
</script>

<template>
  <div>登陆页面</div>
  <HelloWorld />
</template>

<style scoped lang="scss">
div {
  width: 300px;
  height: 300px;
  background: #daa520ff;
}
</style>
