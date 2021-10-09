<template>
	<div class="selector-input" :style="{ width: width + 'px' }">
		<input
			:style="{ height: height + 'px' }"
			type="text"
			ref="inputValue"
			:data-placeholder="placeholder"
			:placeholder="placeholder"
			:value="value"
			@input="searchValue($event)"
			@focus="searchValue($event)"
			@blur="setValue(value)"
		/>
		<span></span>
	</div>
</template>

<script>
import { getCurrentInstance } from "vue";
export default {
	name: "selectInput",
	props: {
		value: {
			type: String,
		},
		placeholder: {
			type: String,
			default: "请选择",
		},
		width: {
			type: Number,
			default: 200,
		},
		height: {
			type: Number,
			default: 40,
		},
	},
	setup(props, ctx) {
		const instance = getCurrentInstance();

		const searchValue = e => {
			ctx.emit("searchValue", e.target.value);
		};

		const setValue = value => {
			const _input = instance.refs.inputValue;
			if (_input.value.length > 0) {
				_input.value = value;
			}
		};
		return { searchValue, setValue };
	},
};
</script>

<style lang="scss" scoped>
.selector-input {
	display: flex;
	align-items: center;
	position: relative;
	height: 100%;
	input {
		width: 100%;
		height: 100%;
		padding: 0 40px 0 10px;
		overflow: auto;
		border: 1px solid #dcdfe6;
		outline: none;
		border-radius: 4px;
		cursor: pointer;
		box-sizing: border-box;
		&::-webkit-input-placeholder {
			color: #60626687;
		}
		&::-moz-placeholder {
			color: #60626687;
		}
		&::-ms-input-placeholder {
			color: #60626687;
		}
		&.focus {
			border-color: #409eff;
		}
	}
	span {
		width: 20px;
		height: 20px;
		position: absolute;
		right: 10px;
		color: #ccc;
		cursor: pointer;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		background-image: url("./image/arrow.png");
		&.focus {
			background-image: url("./image/search.png");
		}
		&.search {
			background-image: url("./image/search.png");
		}
	}
}
</style>
