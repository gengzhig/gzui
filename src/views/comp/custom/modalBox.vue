<!--
 * @Author: gz
 * @Date: 2021-08-11 09:36:48
 * @LastEditors: gz
 * @LastEditTime: 2021-09-13 09:31:07
 * @Description: file content
 * @FilePath: \gi-ui\src\views\comp\custom\modalBox.vue
-->
<template>
	<div class="page-component">
		<h1>Modal 模态框</h1>
		<p>在保留当前页面状态的情况下，告知用户并承载相关操作。</p>
		<h3>基础用法</h3>
		<p>弹出一个对话框，适合需要定制性更大的场景。</p>
		<div class="meta">
			<div class="demo">
				<gz-button type="primary" @click="openDialog">新增</gz-button>
				<gz-modal
					ref="gzModel"
					:show="show"
					:width="400"
					:borderRadius="1"
					headerTitle="新增"
					headerTitleColor="#fff"
					headerTitleBackground="#2ed573"
					:showBtnGroup="true"
					cancelText="取消"
					confirmText="确定"
					@closeModal="closeModal"
					>中间内容
				</gz-modal>
			</div>
			<base-copy :code="code"></base-copy>
		</div>
	</div>
</template>

<script>
import { reactive, ref, toRefs } from "vue";
import baseCopy from "@/components/baseFunction/Copy.vue";
export default {
	components: { baseCopy },
	setup() {
		const gzModel = ref(null);
		const state = reactive({
			show: false,
			code: `<gz-modal
    :show="true"
    :width="400"
    :borderRadius="1"
    headerTitle="新增"
    headerTitleColor="#fff"
    headerTitleBackground="#2ed573"
    :showBtnGroup="true"
    cancelText="取消"
    confirmText="确定"
    @closeModal="closeModal"
  >
  中间内容
  </gz-modal>`,
		});
		// 关闭 提交表单的数据用value接收
		const closeModal = value => {
			if (!value) {
				gzModel.value.changeModel();
			}
		};
		const openDialog = () => {
			gzModel.value.openModal();
		};
		return { gzModel, ...toRefs(state), closeModal, openDialog };
	},
};
</script>

<style lang="scss" scoped></style>
