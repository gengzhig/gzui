<template>
	<div class="star-container" ref="starContainer" :style="{ height: height + 'px', width: width + 'px' }">
		<span
			:class="['iconfont icon-star', starNum <= num ? 'active' : '']"
			v-active
			v-for="starNum in 5"
			:key="starNum"
			:style="{ fontSize: size + 'px' }"
			@click="changeSatr($event)"
		>
		</span>
	</div>
</template>

<script>
import { ref } from "vue";
import active from "../../directives/active";

export default {
	name: "gzFiveStar",
	directives: { active },
	props: {
		num: {
			type: Number,
			default: 0,
		},
		size: {
			type: Number,
			default: 50,
		},
		highColor: {
			type: String,
			default: "orange",
		},
		width: {
			type: [Number, String],
			default: 150,
		},
		height: {
			type: [Number, String],
			default: 26,
		},
	},
	setup(props, ctx) {
		const starContainer = ref(null);
		const changeSatr = e => {
			let currentClassName = e.target.className;
			if (currentClassName.includes("active")) {
				ctx.emit("change", -1);
			} else {
				ctx.emit("change", 1);
			}
		};
		return { starContainer, changeSatr };
	},
};
</script>

<style lang="scss" scoped>
.star-container {
	width: 100%;
	height: 100%;
}
@font-face {
	font-family: "iconfont"; /* Project id 2686328 */
	src: url("//at.alicdn.com/t/font_2686328_skauhedz5wm.woff2?t=1626747534640") format("woff2"),
		url("//at.alicdn.com/t/font_2686328_skauhedz5wm.woff?t=1626747534640") format("woff"),
		url("//at.alicdn.com/t/font_2686328_skauhedz5wm.ttf?t=1626747534640") format("truetype");
}
.iconfont {
	font-family: "iconfont" !important;
	font-size: 16px;
	font-style: normal;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #999;
	margin-right: 10px;
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
