<template>
  <div class="modal-mask">
    <div
      class="ui-modal"
      ref="uiModal"
      :style="{
        width: width + 'px',
        borderRadius: borderRadius + 'px',
        marginLeft: -width / 2 + 'px',
        marginTop: -modalHeight / 2 + 'px',
      }"
    >
      <header :style="{color:headerTitleColor}">{{headerTitle}}</header>
      <article>article</article>
      <div class="btn-group">
        <button class="btn btn-confirm">确定</button>
        <button class="btn btn-cancel">取消</button>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, ref, toRefs } from "vue";
export default {
  name: "gzModal",
  props: {
    width: {
      type: Number,
      default: 400,
    },
    borderRadius: {
      type: Number,
      default: 10,
    },
    headerTitle: {
      type: String,
      default: "dfsfsd",
    },
    headerTitleColor: {
      type: String,
      default: "#fff",
    },
  },
  setup() {
    const uiModal = ref(null);
    const state = reactive({
      modalHeight: 0,
    });
    onMounted(() => {
      state.modalHeight = uiModal.value.offsetHeight;
    });
    return {
      uiModal,
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  .ui-modal {
    position: fixed;
    left: 50%;
    top: 50%;
    border: 1px solid #fff;
    overflow: hidden;
  }
}
</style>