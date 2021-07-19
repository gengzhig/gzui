<template>
  <div class="modal-mask" ref="modalMask" style="position: static">
    <div
      class="ui-modal"
      ref="uiModal"
      :style="{
        width: width + 'px',
        borderRadius: borderRadius + 'px',
        marginLeft: -width / 2 + 'px',
        marginTop: -modalHeight / 2 + 'px',
      }"
      v-show="showModal"
    >
      <!-- 标题 -->
      <header
        :style="{
          color: headerTitleColor,
          backgroundColor: headerTitleBackground,
        }"
      >
        {{ headerTitle
        }}<span class="icon close-icon" @click="closeModal">x</span>
      </header>
      <!-- 主题 -->
      <article><slot></slot></article>
      <!-- 底部按钮组 -->
      <div class="btn-group" v-if="showBtnGroup">
        <button class="gz-btn gz-btn-cancel" @click="cancelModal">
          {{ cancelText }}
        </button>
        <button class="gz-btn gz-btn-confirm" @click="confirmModal">
          {{ confirmText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, ref, toRefs, watch } from "vue";
export default {
  name: "gzModal",
  props: {
    show: {
      type: Boolean,
      default: true,
    },
    width: {
      type: Number,
      default: 400,
    },
    borderRadius: {
      type: Number,
      default: 1,
    },
    headerTitle: {
      type: String,
      default: "提示",
    },
    headerTitleColor: {
      type: String,
      default: "#303133",
    },
    headerTitleBackground: {
      type: String,
      default: "#ff7c40",
    },
    showBtnGroup: {
      type: Boolean,
      default: true,
    },
    cancelText: {
      type: String,
      default: "取消",
    },
    confirmText: {
      type: String,
      default: "确定",
    },
  },
  setup(props, ctx) {
    const uiModal = ref(null);
    const modalMask = ref(null);
    const state = reactive({
      modalHeight: 0,
      showModal: props.show,
    });
    onMounted(() => {
      state.modalHeight = uiModal.value.offsetHeight;
    });
    const changeModel = () => {
      modalMask.value.style.position = "static";
    };
    const openModal = () => {
      state.showModal = true;
      modalMask.value.style.position = "fixed";
    };
    // 关闭弹窗
    const closeModal = () => {
      state.showModal = false;
      ctx.emit("closeModal", false);
    };
    // 取消
    const cancelModal = () => {
      state.showModal = false;
      ctx.emit("closeModal", false);
    };
    // 确定
    const confirmModal = () => {
      state.showModal = false;
      ctx.emit("closeModal", false);
    };

    return {
      modalMask,
      uiModal,
      ...toRefs(state),
      changeModel,
      openModal,
      closeModal,
      cancelModal,
      confirmModal,
    };
  },
};
</script>

<style lang="scss" scoped>
.modal-mask {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 2;
  .ui-modal {
    position: absolute;
    left: 50%;
    top: 50%;
    overflow: hidden;
    background-color: #fff;
    box-shadow: 0 1px 3px rgb(0 0 0 / 30%);
    box-sizing: border-box;
    border-radius: 2px;

    header {
      line-height: 24px;
      font-size: 18px;
      padding: 10px 20px;
      .icon {
        cursor: pointer;
        font-size: 16px;
        float: right;
      }
    }
    article {
      padding: 10px 20px;
      margin: 20px 0;
    }
    .btn-group {
      padding: 10px 20px;
      display: flex;
      justify-content: flex-end;
      .gz-btn:first-child {
        margin-right: 10px;
      }
    }
  }
}
</style>
