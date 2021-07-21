<template>
  <div class="container" ref="container"></div>
</template>

<script setup>
import { ref, toRefs, defineProps, onMounted, watch } from "vue";
import * as echarts from "echarts";
const props = defineProps({
  options: {
    type: Object,
    default: {},
    required: true
  }
});
const { options } = toRefs(props);
const container = ref(null);
const chart = ref(null);
watch(
  options,
  (newOptions) => {
    chart.value.clear();
    chart.value.setOption(newOptions);
  },
  { deep: true }
);
onMounted(() => {
  chart.value = echarts.init(container.value);
  chart.value.setOption(props.options);
});
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
}
</style>
