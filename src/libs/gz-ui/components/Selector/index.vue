<template>
  <div class="select" v-focus>
    <SelectInput
      :value="value"
      :placeholder="placeholder"
      @searchValue="searchValue"
    />
    <SelectMenu
      :searchValue="inputSearchValue"
      :data="menuData"
      @selectItem="selectItem"
    />
  </div>
</template>

<script>
import SelectInput from "./selectInput.vue";
import SelectMenu from "./selectMenu.vue";

import focus from "../../directives/focus";
import { reactive, toRef, toRefs } from "vue";
export default {
  name: "gzSelector",
  components: {
    SelectInput,
    SelectMenu,
  },
  directives: {
    focus,
  },
  props: {
    placeholder: String,
    value: String,
    menuData: Array,
  },
  setup(props, ctx) {
    const state = reactive({
      inputSearchValue: "",
    });
    const selectItem = (item) => {
      ctx.emit("selectItem", item.text);
    };

    const searchValue = (value) => {
      state.inputSearchValue = value;
    };
    return {
      ...toRefs(state),
      selectItem,
      searchValue,
    };
  },
};
</script>

<style scoped lang="scss">
.select {
  position: relative;
}
</style>
