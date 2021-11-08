<template>
	<div
		class="modal-mask"
		ref="modalMask"
		:style="{
			width: width + 'px',
			height: height + 'px',
		}"
		v-show="showModal"
	>
		<div
			class="ui-modal"
			ref="uiModal"
			:style="{
				// width: width + 'px',
				borderRadius: borderRadius + 'px',
				// marginLeft: -width / 2 + 'px',
				// marginTop: -modalHeight / 2 + 'px',
			}"
		>
			<!-- 标题 -->
			<header
				:style="{
					color: headerTitleColor,
					backgroundColor: headerTitleBackground,
				}"
			>
				{{ headerTitle }}<span class="icon close-icon" @click="closeModal">x</span>
			</header>
			<!-- 主题 -->
			<article><slot></slot></article>
			<!-- 底部按钮组 -->
			<div class="btn-group" v-if="showBtnGroup">
				<gz-button type="danger" @click="cancelModal">
					{{ cancelText }}
				</gz-button>
				<gz-button type="primary" @click="confirmModal">
					{{ confirmText }}
				</gz-button>
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
		height: {
			type: Number,
			default: 200,
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
			default: "#2ed573",
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
		console.log(props);
		const uiModal = ref(null);
		const modalMask = ref(null);
		const state = reactive({
			modalHeight: 0,
			showModal: props.show,
		});
		onMounted(() => {
			state.modalHeight = uiModal.value.offsetHeight;
		});
		// 改变弹窗
		const changeModel = () => {
			modalMask.value.style.position = "static";
		};
		// 打开弹窗
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
	width: 100%;
	height: 100%;
	position: absolute;
	top: 50%;
	left: 50%;
	background: rgba(0, 0, 0, 0.3);
	transform: translate(-50%, -50%);
	z-index: 2;
	.ui-modal {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		position: absolute;
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
			flex: 1;
		}
		.btn-group {
			padding: 10px 20px;
			display: flex;
			justify-content: flex-end;
			.gz-button:first-child {
				margin-right: 10px;
			}
		}
	}
}
</style>
