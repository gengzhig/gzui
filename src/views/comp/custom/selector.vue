<!--
 * @Author: your name
 * @Date: 2021-01-30 09:48:09
 * @LastEditTime: 2021-02-02 10:11:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zimeigui-vite2-vue3\src\views\home.vue
-->
<template>
  <div class="page-component">
    <h1>Select 下拉菜单</h1>
    <p>当选项过多时，使用下拉菜单展示并选择内容。</p>
    <h3>基础用法</h3>
    <p>适用广泛的基础单选，支持搜索</p>

    <div class="meta">
      <div class="demo">
        <gz-selector
          :value="value"
          :menuData="menuData"
          placeholder="请选择"
          @selectItem="selectItem"
        ></gz-selector>
      </div>
      <base-copy :code="code"></base-copy>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import baseCopy from "@/layouts/components/baseFunction/Copy.vue";

import copy from "@/libs/gz-ui/directives/copy.js";
export default {
  directives: {
    copy
  },
  components: { baseCopy },
  setup() {
    const state = reactive({
      value: "",
      code: `<template>
  <gz-selector
    :value="value"
    placeholder="请选择"
    @selectItem="selectItem"
  >
  </gz-selector>
</template>`,
      menuData: [
        {
          id: 1,
          value: "1",
          text: "选项1"
        },
        {
          id: 2,
          value: "2",
          text: "选项2"
        },
        {
          id: 3,
          value: "3",
          text: "选项3"
        },
        {
          id: 4,
          value: "4",
          text: "选项4"
        },
        {
          id: 5,
          value: "5",
          text: "选项5"
        },
        {
          id: 6,
          value: "6",
          text: "选项6"
        },
        {
          id: 7,
          value: "7",
          text: "选项7"
        },
        {
          id: 8,
          value: "8",
          text: "选项8"
        },
        {
          id: 9,
          value: "9",
          text: "选项9"
        },
        {
          id: 10,
          value: "10",
          text: "选项10"
        },
        {
          id: 11,
          value: "11",
          text: "选项11"
        },
        {
          id: 12,
          value: "12",
          text: "选项12"
        }
      ]
    });
    const selectItem = (item) => {
      state.value = item;
    };
    return { ...toRefs(state), selectItem };
  }
};
</script>

<style scoped lang="scss">
.page-component {
  h1 {
    color: #1f2f3d;
    margin: 20px 0 20px;
  }
  p {
    font-size: 14px;
    color: #5e6d82;
    line-height: 1.5em;
    margin: 1em 0;
  }
  h3 {
    color: #1f2f3d;
    font-size: 22px;
    margin: 55px 0 20px;
  }
  .meta {
    border: 1px solid #ebebeb;
    border-radius: 3px;
    .demo {
      padding: 24px;
    }
  }
}
</style>
