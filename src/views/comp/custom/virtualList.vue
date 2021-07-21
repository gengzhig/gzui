<template>
  <div class="page-component">
    <h1>virtualList 虚拟列表</h1>
    <p>
      在数据量爆发的今天，很多时候一个可能从服务器加载非常多的数据，然而浏览器在一次性把这些数据渲染到页面上的时候会出现卡顿甚至是崩溃的情况，所以虚拟化技术应运而生，为了更好的用户体验和更好的使用体验，我决定开发这个组件。
    </p>
    <h3>基础用法</h3>
    <p>适用广泛的基础单选，支持搜索</p>

    <div class="meta">
      <div class="demo">
        <gz-virtual-list
          :data="data"
          :height="200"
          :itemHeight="30"
        ></gz-virtual-list>
      </div>
      <base-copy :code="code"></base-copy>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { onMounted } from "vue";
import baseCopy from "@/components/baseFunction/Copy.vue";
export default {
  components: { baseCopy },
  setup() {
    const state = reactive({
      data: [],
      code: `<template>
    <gz-virtual-list
      v-if="data.length > 0"
      :data="data"
      :height="100"
      :itemHeight="30"
    ></gz-virtual-list>
</template>`
    });
    onMounted(() => {
      let result = [];
      for (let i = 1; i <= 2000; i++) {
        result.push({
          title: i,
          desc: "说明：这是第" + i + "个虚拟列表"
        });
      }
      state.data = result;
    });
    return {
      ...toRefs(state)
    };
  }
};
</script>

<style lang="scss" scoped></style>
