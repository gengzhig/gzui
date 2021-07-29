<!--
 * @Author: gz
 * @Date: 2021-07-29 16:25:51
 * @LastEditors: gz
 * @LastEditTime: 2021-07-29 17:48:40
 * @Description: file content
 * @FilePath: \gi-ui\src\views\comp\custom\tabs.vue
-->
<template>
  <div class="page-component">
    <h1>Tabs 标签页</h1>
    <p>分隔内容上有关联但属于不同类别的数据集合。</p>
    <h3>基础用法</h3>
    <p>基础的、简洁的标签页。</p>

    <div class="meta">
      <div class="demo">
        <gz-tabs
          :width="400"
          :height="200"
          :headerHeight="60"
          :tabsData="tabsData"
        ></gz-tabs>
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
