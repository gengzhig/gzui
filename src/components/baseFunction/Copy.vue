<template>
  <div class="description">
    介绍api
    <a href="javascript:;" v-copy>copy</a>
  </div>
  <div class="highlight code">
    <textarea rows="10" readonly :value="code.toString()"> </textarea>
  </div>
</template>

<script>
import copy from "@/libs/gz-ui/directives/copy.js";
export default {
  directives: { copy },
  props: {
    code: {
      type: String,
      default: ""
    }
  },
  setup() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.description {
  padding: 20px;
  box-sizing: border-box;
  border-top: 1px solid #ebebeb;
  border-bottom: 1px solid #ebebeb;
  a {
    color: rgba(24, 228, 24, 0.733);
    float: right;
    text-decoration: none;
  }
}
.highlight {
  font-size: 12px;
  padding: 18px 24px;
  background-color: #fafafa;
  textarea {
    width: 100%;
  }
}
</style>
