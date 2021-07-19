<template>
  <div class="page-component">
    <h1>Modal 模态框</h1>
    <p>在保留当前页面状态的情况下，告知用户并承载相关操作。</p>
    <h3>基础用法</h3>
    <p>Dialog 弹出一个对话框，适合需要定制性更大的场景。</p>

    <div class="meta">
      <div class="demo">
        <gz-modal
          ref="gzModel"
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
      <base-copy :code="code"></base-copy>
    </div>
  </div>
</template>

<script>
import { reactive, ref, toRefs } from "@vue/reactivity";
import baseCopy from "@/layouts/components/baseFunction/Copy.vue";
import copy from "@/libs/gz-ui/directives/copy.js";
export default {
  components: { baseCopy },
  directives: {
    copy
  },
  setup() {
    const gzModel = ref(null);
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
    const closeModal = (value) => {
      if (!value) {
        gzModel.value.changeModel();
      }
    };
    return { gzModel, ...toRefs(state), closeModal };
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
  }
}
</style>
