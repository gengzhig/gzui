<template>
	<template v-for="(item, index) in menuData" :key="index">
		<!-- 只有一级菜单 -->
		<el-menu-item :index="index + 1 + ''" v-if="!item.children || item.children.length == 0">
			<i class="el-icon-menu"></i>
			<span>{{ item.name }}</span>
		</el-menu-item>
		<el-submenu v-else :index="index + 1 + ''" @click="menuClick(item)">
			<template #title>
				<i class="el-icon-location"></i>
				<span>{{ item.name }}{{ index }}</span>
			</template>
			<el-sub-menu v-if="item.children && item.children.length > 0" :index="index + 1 + ''">
				<sub-sideBar :menuData="item.children"></sub-sideBar>
			</el-sub-menu>
		</el-submenu>
	</template>
</template>

<script>
export default {
	name: "SubSideBar",
};
</script>

<script setup>
import { reactive, ref, onMounted, watch, computed, getCurrentInstance, useSlots, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
const props = defineProps({
	menuData: {
		type: Array,
		default: () => [],
	},
});
console.log(props.menuData);
const ctx = getCurrentInstance();
const emit = defineEmits();
const state = reactive({});
const contentHeight = computed(() => {});
const store = useStore();
const route = useRoute();
const slots = useSlots();
const router = useRouter();
const fn = val => {};
onMounted(() => {});
// watch(
// () => [name, title],
// ([nname, ntitle], [oname, otitle]) => {
// 	console.log(nname, oname), console.log(ntitle, otitle);
// }
// );

const menuClick = item => {
	console.log(item);
	// router.push(item.path);
	// router.push("/general");
};
</script>

<style scoped lang="scss"></style>
