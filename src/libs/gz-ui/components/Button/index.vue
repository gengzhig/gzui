<template>
	<button
		class="gz-button"
		:disabled="disabled"
		:class="[
			butttonTypeClass,
			butttonSizeClass,
			disabled ? 'isDisabled' : '',
			plain ? 'isPlain' : '',
			round ? 'isRound' : '',
		]"
	>
		<span>
			<slot></slot>
		</span>
	</button>
</template>
<script>
export default {
	name: "gzButton",
};
</script>
<script setup>
import { computed } from "vue";
const props = defineProps({
	type: {
		type: String,
		default: "default",
	},
	plain: {
		type: Boolean,
		default: false,
	},
	round: {
		type: Boolean,
		default: false,
	},
	size: {
		type: String,
		default: "default",
	},
	disabled: {
		type: Boolean,
		default: false,
	},
});
console.log(props.disabled);
const butttonSizeClass = computed(() => {
	let buttonClass = "gz-button-";
	switch (props.size) {
		case "default":
			buttonClass = ``;
			break;
		case "medium":
			buttonClass = `${buttonClass}medium`;
			break;
		case "small":
			buttonClass = `${buttonClass}small`;
			break;
		case "mini":
			buttonClass = `${buttonClass}mini`;
			break;
		default:
			break;
	}

	return buttonClass;
});
const butttonTypeClass = computed(() => {
	let buttonClass = "gz-button-";
	switch (props.type) {
		case "default":
			buttonClass = `${buttonClass}default`;
			break;
		case "primary":
			buttonClass = `${buttonClass}primary`;
			break;
		case "success":
			buttonClass = `${buttonClass}success`;
			break;
		case "info":
			buttonClass = `${buttonClass}info`;
			break;
		case "warning":
			buttonClass = `${buttonClass}warning`;
			break;
		case "danger":
			buttonClass = `${buttonClass}danger`;
			break;
		case "text":
			buttonClass = `${buttonClass}text`;
			break;
		default:
			break;
	}
	return buttonClass;
});
</script>

<style lang="scss" scoped>
.gz-button {
	display: inline-block;
	line-height: 1;
	min-height: 40px;
	white-space: nowrap;
	cursor: pointer;
	text-align: center;
	box-sizing: border-box;
	outline: none;
	margin: 0;
	padding: 12px 20px;
	border-radius: 4px;
	color: #606266;
	background: #fff;
	border: 1px solid #dcdfe6;
	-webkit-appearance: none;
	transition: 0.1s;
	&:hover,
	&:focus {
		color: #409eff;
		border-color: #c6e2ff;
		background-color: #ecf5ff;
		outline: none;
	}
	&.isDisabled {
		color: #c0c4cc;
		cursor: not-allowed;
		background-image: none;
		background-color: #ffffff;
		border-color: #e4e7ed;
		&:hover,
		&:focus {
			color: #c0c4cc;
			cursor: not-allowed;
			background-image: none;
			background-color: #ffffff;
			border-color: #e4e7ed;
		}
	}
	&.isRound {
		border-radius: 20px;
		padding: 12px 23px;
	}
	&-primary {
		color: #fff;
		background-color: #409eff;
		border-color: #409eff;
		&:hover,
		&:focus {
			color: #fff;
			border-color: #66b1ff;
			background-color: #66b1ff;
		}
		&.isPlain {
			color: #409eff;
			background-color: #ecf5ff;
			border-color: #b3d8ff;
			&:hover,
			&:focus {
				color: #fff;
				border-color: #66b1ff;
				background-color: #66b1ff;
			}
		}
	}
	&-success {
		color: #fff;
		background-color: #67c23a;
		border-color: 67c23a;
		&:hover,
		&:focus {
			color: #fff;
			border-color: #85ce61;
			background-color: #85ce61;
		}
		&.isPlain {
			color: #67c23a;
			background-color: #f0f9eb;
			border-color: #c2e7b0;
			&:hover,
			&:focus {
				color: #fff;
				border-color: #85ce61;
				background-color: #85ce61;
			}
		}
	}
	&-info {
		color: #fff;
		background-color: #909399;
		border-color: #909399;
		&:hover,
		&:focus {
			color: #fff;
			border-color: #a6a9ad;
			background-color: #a6a9ad;
		}
		&.isPlain {
			color: #909399;
			background-color: #f4f4f5;
			border-color: #d3d4d6;
			&:hover,
			&:focus {
				color: #fff;
				border-color: #a6a9ad;
				background-color: #a6a9ad;
			}
		}
	}
	&-warning {
		color: #fff;
		background-color: #e6a23c;
		border-color: #e6a23c;
		&:hover,
		&:focus {
			color: #fff;
			border-color: #ebb563;
			background-color: #ebb563;
		}
		&.isPlain {
			color: #e6a23c;
			background-color: #fdf6ec;
			border-color: #f5dab1;
			&:hover,
			&:focus {
				color: #fff;
				border-color: #ebb563;
				background-color: #ebb563;
			}
		}
	}
	&-danger {
		color: #fff;
		background-color: #f56c6c;
		border-color: #f56c6c;
		&:hover,
		&:focus {
			color: #fff;
			border-color: #f78989;
			background-color: #f78989;
		}
		&.isPlain {
			color: #f56c6c;
			background-color: #fef0f0;
			border-color: #fbc4c4;
			&:hover,
			&:focus {
				color: #fff;
				border-color: #f78989;
				background-color: #f78989;
			}
		}
	}
	&-medium {
		min-height: 36px;
		padding: 10px 20px;
		border-radius: 4px;
	}
	&-small {
		min-height: 32px;
		padding: 9px 15px;
		font-size: 12px;
	}
	&-mini {
		min-height: 28px;
		padding: 7px 15px;
		font-size: 12px;
	}
	&-text {
		background: #d22a2a00;
		border-color: transparent;
		&:hover,
		&:focus {
			color: #66b1ff;
			border-color: transparent;
			background-color: transparent;
		}
		&.isDisabled {
			cursor: not-allowed;
			background-color: transparent;
			border-color: transparent;
			&:hover,
			&:focus {
				background-color: transparent;
				border-color: transparent;
			}
		}
	}
}
</style>
