<template>
	<div class="drawer-mask" :class="computedClass" @click="maskClick">
		<div class="drawer-content">
			<slot></slot>
		</div>
	</div>
</template>

<script>
export default {
	name: "gzDrawer",
};
</script>

<script setup>
import { reactive, ref, onMounted, watch, computed, getCurrentInstance, useSlots, nextTick } from "vue";
const props = defineProps({
	modelValue: {
		type: Boolean,
		default: false,
	},
	direction: {
		type: String,
		default: "rtl",
	},
});
const ctx = getCurrentInstance();
const emits = defineEmits(["modelValue"]);
const openStatus = ref(false);
const computedClass = computed(() => {
	let direction = props.direction;
	return [
		{
			"is-open": openStatus.value,
			"is-close": !openStatus.value,
		},
		direction,
	];
});
watch(
	() => props.modelValue,
	value => {
		openStatus.value = value;
	}
);

const maskClick = e => {
	if (e.target !== ctx.ctx.$el) {
		return;
	}
	emits("update:modelValue", false);
};
</script>

<style scoped lang="scss">
.drawer-mask {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.5);
	&.btt {
		transition: opacity 200ms, height 1ms;
		&.is-open {
			height: 100%;
			opacity: 1;
			.drawer-content {
				transform: translateY(0);
			}
		}
		&.is-close {
			height: 0;
			opacity: 0;
			transition-delay: 300ms;
			.drawer-content {
				transform: translateY(100%);
			}
		}
	}
	&.ttb {
		transition: opacity 200ms, height 1ms;
		&.is-open {
			height: 100%;
			opacity: 1;
			.drawer-content {
				transform: translateY(0);
			}
		}
		&.is-close {
			height: 0;
			opacity: 0;
			transition-delay: 300ms;
			.drawer-content {
				transform: translateY(-100%);
			}
		}
	}
	&.rtl {
		transition: opacity 200ms, width 1ms;
		&.is-open {
			width: 100%;
			opacity: 1;
			.drawer-content {
				transform: translateX(0);
			}
		}
		&.is-close {
			height: 0;
			opacity: 0;
			transition-delay: 300ms;
			.drawer-content {
				transform: translateX(100%);
			}
		}
	}
	&.ltr {
		transition: opacity 200ms, width 1ms;
		&.is-open {
			width: 100%;
			opacity: 1;
			.drawer-content {
				transform: translateX(0);
			}
		}
		&.is-close {
			height: 0;
			opacity: 0;
			transition-delay: 300ms;
			.drawer-content {
				transform: translateX(-100%);
			}
		}
	}
	&.is-open {
		height: 100%;
		opacity: 1;
		.drawer-content {
			transform: translateY(0);
		}
	}
	&.is-close {
		height: 0;
		opacity: 0;
		transition-delay: 300ms;
		.drawer-content {
			transform: translateY(100%);
		}
	}
	.drawer-content {
		position: absolute;
		background: #fff;
		color: #333;
		padding: 50px;
		box-sizing: border-box;
		transition: transform 300ms;
	}
	&.rtl {
		.drawer-content {
			left: auto;
			right: 0;
			bottom: 0;
			top: 0;
		}
	}
	&.ltr {
		.drawer-content {
			left: 0;
			right: auto;
			bottom: 0;
			top: 0;
		}
	}
	&.ttb {
		.drawer-content {
			left: 0;
			right: 0;
			bottom: auto;
			top: 0;
		}
	}
	&.btt {
		.drawer-content {
			left: 0;
			right: 0;
			bottom: 0;
			top: auto;
		}
	}
}
</style>
