<script setup lang="ts">
/*
  该模板使用了Vue3.2<script setup>语法糖
  由于 vue3.2 版本的发布，<script setup> 的实验性标志已经去掉，说明这个语法提案已经正式开始使用
  官方文档：https://v3.cn.vuejs.org/api/sfc-script-setup.html
*/
// Element-Plus国际化
import zhCn from 'element-plus/lib/locale/lang/zh-cn';
const locale = zhCn;
</script>

<template>
  <el-config-provider :locale="locale">
    <img alt="Vue logo" src="./assets/logo.png" />
    <SvgIcon class="icon" name="wx" color="#FFF" />
    <section>
      <!-- 测试 Tailwind CSS -->
      <div class="w-1/2 h-3/5 bg-green-900"></div>
    </section>
    <router-view></router-view>
  </el-config-provider>
</template>

<style scoped lang="scss">
#app{
  /*-webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;*/
}
// nprogress样式配置
#nprogress .bar {
  background: #35495E !important; //自定义颜色
}
</style>
