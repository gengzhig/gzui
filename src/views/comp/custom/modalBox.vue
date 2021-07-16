<template>
  <div class="page-component">
    <h1>Modal 模态框</h1>
    <p>在保留当前页面状态的情况下，告知用户并承载相关操作。</p>
    <h3>基础用法</h3>
    <p>Dialog 弹出一个对话框，适合需要定制性更大的场景。</p>

    <div class="meta">
      <div class="demo">
        <gz-modal
          :show="true"
          :width="400"
          :borderRadius="1"
          headerTitle="新增"
          headerTitleColor="#fff"
          headerTitleBackground="#ff7c40"
          :showBtnGroup="true"
          cancelText="取消"
          confirmText="确定"
          @closeModal="closeModal"
          >中间内容
        </gz-modal>
      </div>
      <div class="description">介绍api</div>
      <div class="highlight">
        <pre>{{ code.toString() }}</pre>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "@vue/reactivity";
export default {
  setup() {
    const state = reactive({
      code: `<template>
  <gz-modal
    :show="true"
    :width="400"
    :borderRadius="1"
    headerTitle="新增"
    headerTitleColor="#fff"
    headerTitleBackground="#ff7c40"
    :showBtnGroup="true"
    cancelText="取消"
    confirmText="确定"
    @closeModal="closeModal"
  >
  中间内容
  </gz-modal>
</template>`
    });
    // 关闭 提交表单的数据用value接收
    const closeModal = (value) => {};
    return { ...toRefs(state), closeModal };
  }
};
</script>

<style lang="scss" scoped>
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
    .description {
      padding: 20px;
      box-sizing: border-box;
      border-top: 1px solid #ebebeb;
      border-bottom: 1px solid #ebebeb;
    }
    .highlight {
      font-size: 12px;
      padding: 18px 24px;
      background-color: #fafafa;
    }
  }
}
</style>
