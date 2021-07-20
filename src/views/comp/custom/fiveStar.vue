<template>
  <div>
    <gz-five-star :num="1" :size="20" highColor="orange" @change="change">
    </gz-five-star>
  </div>
</template>

<script>
export default {
  setup() {
    const change = (value) => {
      console.log(value);
    };
    return {
      change
    };
  }
};
</script>

<style lang="scss" scoped></style>
