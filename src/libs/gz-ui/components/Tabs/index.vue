<!--
 * @Author: gz
 * @Date: 2021-07-29 16:33:23
 * @LastEditors: gz
 * @LastEditTime: 2021-07-29 17:43:17
 * @Description: file content
 * @FilePath: \gi-ui\src\libs\gz-ui\components\Tabs\index.vue
-->
<template>
  <div class="tag" :style="{ width: width + 'px', height: height + 'px' }">
    <div class="header" :style="{ height: headerHeight + 'px' }">
      <span
        :class="['tab', index == curIndex ? 'active' : '']"
        v-for="(item, index) in tabsData"
        :key="index"
        @click="select(index)"
      >
        {{ item.name }}
      </span>
    </div>
    <div class="content">{{ content }}</div>
  </div>
</template>

<script>
import {
  computed,
  onMounted,
  reactive,
  toRefs,
  ref,
  nextTick,
  watch
} from "vue";
export default {
  name: "gzTabs",
  props: {
    tabsData: {
      type: Array,
      required: true
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 200
    },
    headerHeight: {
      type: Number,
      default: 60
    }
  },
  setup(props, ctx) {
    const state = reactive({
      visibleData: [],
      content: "",
      curIndex: 0
    });
    onMounted(() => {
      state.content = props.tabsData[0].content;
    });
    const select = (index) => {
      state.curIndex = index;
      state.content = props.tabsData[index].content;
    };
    return {
      ...toRefs(state),
      select
    };
  }
};
</script>

<style lang="scss" scoped>
.tag {
  border: 1px solid #ccc;
  .header {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    background: #ff7c40;
    .tab {
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      cursor: pointer;
      &.active {
        background: chartreuse;
      }
    }
  }
}
</style>
