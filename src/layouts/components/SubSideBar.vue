<template>
	<template v-for="(item, index) in menuData" :key="index">
		<!-- 只有一级菜单 -->
		<el-menu-item :index="item.name" v-if="!item.children || item.children.length == 0" @click="menuClick(item)">
			<i v-if="!store.state.isMobile" :class="item.icon"></i>
			<span>{{ item.name }}</span>
		</el-menu-item>
		<el-submenu v-else :index="item.name">
			<template #title>
				<i v-if="!store.state.isMobile" :class="item.icon"></i>
				<span>{{ item.name }}</span>
			</template>
			<el-menu-item :index="cItem.name" v-for="cItem in item.children" @click="menuClick(cItem)">
				<i v-if="!store.state.isMobile" :class="item.icon"></i>
				<span>{{ cItem.name }}</span>
			</el-menu-item>
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

const menuClick = item => {
	router.push(item.path);
};
</script>

<style lang="scss">
.mobile .el-menu-item {
	padding-left: 5px !important;
	padding: 0 5px;
}
.mobile .el-submenu__title {
	padding: 0 5px;
	padding-left: 5px !important;
}
.mobile .el-submenu__icon-arrow {
	right: 5px;
}
</style>
