<!--
 * @Author: gz
 * @Date: 2021-08-03 09:40:14
 * @LastEditors: gz
 * @LastEditTime: 2021-08-03 09:42:26
 * @Description: file content
 * @FilePath: \gi-ui\src\views\comp\custom\table.vue
-->
<template>
  <div class="page-component">
    <h1>Table表格</h1>
    <p>
      用于展示多条结构类似的数据，可对数据进行排序、筛选、对比或其他自定义操作。
    </p>
    <h3>基础用法</h3>
    <p>基础的表格展示用法。</p>

    <div class="meta">
      <div class="demo">
        <gz-table></gz-table>
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
      tabsData: [
        { name: "1", content: "111" },
        { name: "2", content: "222" },
        { name: "3", content: "333" }
      ],
      code: `<template>
    <gz-tabs
      :width="400"
      :height="200"
      :headerHeight="60"
      :tabsData="tabsData"
    >
    </gz-tabs>
</template>`
    });
    return {
      ...toRefs(state)
    };
  }
};
</script>

<style lang="scss" scoped></style>
