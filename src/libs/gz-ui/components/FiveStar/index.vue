<template>
  <div class="star-container" ref="starContainer">
    <span
      :class="['iconfont icon-star', starNum <= num ? 'active' : '']"
      v-active
      v-for="starNum in 5"
      :key="starNum"
      :style="{ fontSize: size + 'px' }"
      @click="changeSatr($event)"
    >
      {{ starNum }}
    </span>
  </div>
</template>

<script>
import { ref } from "vue";
import active from "../../directives/active";

export default {
  name: "gzFiveStar",
  directives:{active},
  props: {
    num: {
      type: Number,
      default: 0
    },
    size: {
      type: Number,
      default: 50
    },
    highColor: {
      type: String,
      default: "orange"
    }
  },
  setup(props, ctx) {
    const starContainer = ref(null);
    const changeSatr = (e) => {
      let currentClassName = e.target.className;
      console.log(e.target);
      //   if (currentClassName.includes("active")) {
      //       return;
      //   }else{
      //       currentClassName=""
      //   }
      //   let activeStarNum = starContainer.value.querySelectorAll(
      //     ".iconfont.icon-star.active"
      //   );
      //   console.log(activeStarNum);
      //   ctx.emit("change", 1);
    };
    return { starContainer, changeSatr };
  }
};
</script>

<style lang="scss" scoped>
@font-face {
  font-family: "iconfont"; /* Project id 2686328 */
  src: url("//at.alicdn.com/t/font_2686328_skauhedz5wm.woff2?t=1626747534640")
      format("woff2"),
    url("//at.alicdn.com/t/font_2686328_skauhedz5wm.woff?t=1626747534640")
      format("woff"),
    url("//at.alicdn.com/t/font_2686328_skauhedz5wm.ttf?t=1626747534640")
      format("truetype");
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #999;
  &.icon-star {
    transition: color 0.3s;
  }
  &.icon-star:before {
    content: "\e647";
  }
  &.active {
    color: #fbab06;
  }
}
</style>
