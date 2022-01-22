<script setup lang="ts">
import { computed, withDefaults } from "vue";

// 限制类型
interface Props {
  prefix?: string;
  name?: string;
  color?: string;
}

// 设置默认值
const props = withDefaults(defineProps<Props>(), {
  prefix: "icon",
  name: "",
  color: "#000000",
});

const symbolId = computed(() => `#${props.prefix}-${props.name}`);
</script>

<template>
  <svg aria-hidden="true">
    <use :xlink:href="symbolId" :fill="color" />
  </svg>
</template>
