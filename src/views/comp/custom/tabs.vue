<!--
 * @Author: gz
 * @Date: 2021-07-29 16:25:51
 * @LastEditors: gz
 * @LastEditTime: 2021-09-09 16:20:36
 * @Description: file content
 * @FilePath: \gi-ui\src\views\comp\custom\tabs.vue
-->
<template>
	<div class="page-component">
		<h1>Tabs 标签页</h1>
		<p>分隔内容上有关联但属于不同类别的数据集合。</p>
		<h3>基础用法</h3>
		<p>基础的、简洁的标签页。</p>

		<div class="meta">
			<div class="demo">
				<gz-tabs-pane label="用户管理" name="first">12313</gz-tabs-pane>
				<gz-tabs v-model:activeName="activeName" :width="400" :height="200" :headerHeight="60">
					<gz-tabs-pane label="用户管理" name="first" class="tab-pane"> 1212 </gz-tabs-pane>
					<gz-tabs-pane label="配置管理" name="second" class="tab-pane">222</gz-tabs-pane>
					<gz-tabs-pane label="角色管理" name="third" class="tab-pane">333</gz-tabs-pane>
				</gz-tabs>
			</div>
			<base-copy :code="code"></base-copy>
		</div>
	</div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { onMounted } from "vue";
import baseCopy from "@/components/baseFunction/Copy.vue";
export default {
	components: { baseCopy },
	setup() {
		const state = reactive({
			activeName: "first",
			code: `<gz-tabs v-model:activeName="activeName" :width="400" :height="200" :headerHeight="60">
	<div label="用户管理" name="first" class="tab-pane">111</div>
	<div label="配置管理" name="second" class="tab-pane">222</div>
	<div label="角色管理" name="third" class="tab-pane">333</div>
</gz-tabs>`,
		});
		return {
			...toRefs(state),
		};
	},
};
</script>
<style scoped lang="scss">
</style>
