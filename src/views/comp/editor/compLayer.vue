<template>
	<div class="compLayer">
		<div class="compLayer-top">
			<div class="layer-num">图层</div>
		</div>
		<div class="layer-toolbar layer-toolbar-top">
			<el-tooltip class="item" effect="dark" content="上移一层" placement="bottom">
				<el-button
					:disabled="!store.state.currentCompList.length"
					size="mini"
					type="primary"
					icon="el-icon-top"
					@click="moveUp"
				></el-button>
			</el-tooltip>
			<el-tooltip class="item" effect="dark" content="下移一层" placement="bottom">
				<el-button
					:disabled="!store.state.currentCompList.length"
					size="mini"
					type="primary"
					icon="el-icon-bottom"
					@click="moveDown"
				></el-button>
			</el-tooltip>
			<el-tooltip class="item" effect="dark" content="置顶" placement="bottom">
				<el-button
					:disabled="!store.state.currentCompList.length"
					size="mini"
					type="primary"
					icon="el-icon-upload2"
					@click="moveTop"
				></el-button>
			</el-tooltip>
			<el-tooltip class="item" effect="dark" content="置底" placement="bottom">
				<el-button
					:disabled="!store.state.currentCompList.length"
					size="mini"
					type="primary"
					icon="el-icon-download"
					@click="moveBottom"
				></el-button>
			</el-tooltip>
		</div>
		<gz-tree :hoverBgColor="hoverBgColor" :data="currentCompLayerTreeList"></gz-tree>
		<div class="layer-toolbar layer-toolbar-bottom">
			<el-tooltip class="item" effect="dark" content="成组" placement="bottom">
				<el-button
					:disabled="!store.state.currentCompList.length"
					size="mini"
					type="primary"
					icon="el-icon-folder"
					@click="moveUp"
				></el-button>
			</el-tooltip>
			<el-tooltip class="item" effect="dark" content="删除" placement="bottom">
				<el-button
					:disabled="!store.state.currentCompList.length"
					size="mini"
					type="primary"
					icon="el-icon-delete"
					@click="moveDown"
				></el-button>
			</el-tooltip>
			<el-tooltip class="item" effect="dark" content="锁定" placement="bottom">
				<el-button
					:disabled="!store.state.currentCompList.length"
					size="mini"
					type="primary"
					icon="el-icon-s-goods"
					@click="moveTop"
				></el-button>
			</el-tooltip>
			<el-tooltip class="item" effect="dark" content="隐藏" placement="bottom">
				<el-button
					:disabled="!store.state.currentCompList.length"
					size="mini"
					type="primary"
					icon="el-icon-view"
					@click="moveBottom"
				></el-button>
			</el-tooltip>
		</div>
		<!-- <el-tree
			ref="compTreeRef"
			:data="currentCompLayerTreeList"
			default-expand-all
			@node-drag-start="handleDragStart"
			@node-drag-enter="handleDragEnter"
			@node-drag-leave="handleDragLeave"
			@node-drag-over="handleDragOver"
			@node-drag-end="handleDragEnd"
			@node-drop="handleDrop"
			draggable
			:allow-drop="allowDrop"
			:allow-drag="allowDrag"
		>
		</el-tree> -->
	</div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
	name: "compLayer",
	computed: {
		...mapGetters(["currentCompLayerTreeList"]),
	},
};
</script>

<script setup>
import { reactive, ref, onMounted, watch, computed, getCurrentInstance, useSlots, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
const props = defineProps({});
const ctx = getCurrentInstance();
const emit = defineEmits();
const store = useStore();
const compTreeRef = ref(null);
const hoverBgColor = ref("#2181ff");
// watch(
// 	() => store.getters.currentCompLayerTreeList,
// 	value => {
// 		console.log(value);
// 		compTreeRef.value.initRoot();
// 	}
// );
const route = useRoute();
const slots = useSlots();
const router = useRouter();
onMounted(() => {});

// 置顶
const moveTop = () => {
	store.commit("topComponent");
};
// 置底
const moveBottom = () => {
	store.commit("bottomComponentt");
};
// 上移
const moveUp = () => {
	store.commit("upComponent");
};
// 下移
const moveDown = () => {
	store.commit("downComponent");
};
const handleDragStart = (node, ev) => {
	console.log("drag start", node);
};
const handleDragEnter = (draggingNode, dropNode, ev) => {
	console.log("tree drag enter: ", dropNode);
};
const handleDragLeave = (draggingNode, dropNode, ev) => {
	console.log("tree drag leave: ", dropNode);
};
const handleDragOver = (draggingNode, dropNode, ev) => {
	console.log("tree drag over: ", dropNode);
};
const handleDragEnd = (draggingNode, dropNode, ev) => {
	console.log("tree drag end: ", dropNode);
};
const handleDrop = (draggingNode, dropNode, dropType, ev) => {
	console.log("tree drop: ", dropNode, dropType);
};
const allowDrop = (draggingNode, dropNode, type) => {
	if (dropNode.data.raw.label === "二级 3-1") {
		return type !== "inner";
	} else {
		return true;
	}
};
const allowDrag = draggingNode => {
	return draggingNode.data.raw.label.indexOf("三级 3-2-2") === -1;
};
</script>

<style scoped lang="scss">
.compLayer {
	display: flex;
	flex-direction: column;
	flex: auto;
	height: 100%;
	.compLayer-top {
		background: #2e343c;
		text-indent: 10px;
		height: 30px;
		color: #bcc9d4;
		line-height: 30px;
		position: relative;
		user-select: none;
	}
	.layer-toolbar {
		height: 30px;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 18px;
		background: #20242a;
		flex: none;
		button + button {
			margin-left: 5px;
		}
		&.layer-toolbar-top {
			border-bottom: 1px solid #282f3a;
		}
	}
	.gz-tree {
		height: 100%;
		overflow-y: auto;
	}
}
</style>
