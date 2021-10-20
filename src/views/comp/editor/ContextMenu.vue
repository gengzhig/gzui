<template>
	<div class="contextmenu" v-show="menuShow" :style="{ top: menuTop + 'px', left: menuLeft + 'px' }">
		<ul @mouseup="handleMouseUp">
			<template v-if="currentComp">
				<template v-if="!currentComp.isLock">
					<li @click="topComponent" v-if="curComponentIndex != currentCompList.length - 1">
						<i class="el-icon-upload2"></i>置顶
					</li>
					<li @click="bottomComponent" v-if="curComponentIndex"><i class="el-icon-download"></i>置底</li>
					<li @click="upComponent" v-if="curComponentIndex != currentCompList.length - 1">
						<i class="el-icon-top"></i>上移一层
					</li>
					<li @click="downComponent" v-if="curComponentIndex"><i class="el-icon-bottom"></i>下移一层</li>
					<li @click="createGroup"><i class="el-icon-suitcase"></i>成组</li>
					<li @click="cancelCreateGroup"><i class="el-icon-suitcase-1"></i>取消成组</li>
					<li @click="lock"><i class="el-icon-lock"></i>锁定</li>
					<li @click="unlock"><i class="el-icon-unlock"></i>解锁</li>
					<li @click="hide"><i class="el-icon-view"></i>隐藏</li>
					<li @click="rename"><i class="el-icon-delete"></i>重命名</li>
					<li @click="copy"><i class="el-icon-copy-document"></i>复制</li>
					<li @click="paste"><i class="el-icon-delete"></i>粘贴</li>
					<li @click="cut"><i class="el-icon-delete"></i>剪切</li>
					<li @click="deleteComponent"><i class="el-icon-delete"></i>删除</li>
					<li @click="collect"><i class="el-icon-star-on"></i>收藏</li>
					<li @click="locateInBlueprint" class="disable"><i class="el-icon-s-promotion"></i>在蓝图编辑器中定位</li>
				</template>
				<li v-else @click="unlock"><i class="el-icon-unlock"></i>解锁</li>
			</template>
		</ul>
	</div>
</template>

<script>
import { mapState } from "vuex";

export default {
	computed: mapState(["menuTop", "menuLeft", "menuShow", "currentComp", "curComponentIndex", "currentCompList"]),
};
</script>
<script setup>
import { reactive, ref, computed } from "vue";
import { useStore } from "vuex";
import { Message } from "element3";
const store = useStore();
const state = reactive({
	copyData: null,
});
// 置顶
const topComponent = () => {
	store.commit("topComponent");
	// store.commit("recordSnapshot");
};
// 置底
const bottomComponent = () => {
	store.commit("bottomComponent");
	// store.commit("recordSnapshot");
};
// 上移一层
const upComponent = () => {
	store.commit("upComponent");
	// store.commit("recordSnapshot");
};
// 下移一层
const downComponent = () => {
	store.commit("downComponent");
	// store.commit("recordSnapshot");
};
// 成组
const createGroup = () => {
	Message({
		message: "此功能尚未开放！",
		type: "warning",
	});
};
// 取消成组
const cancelCreateGroup = () => {
	Message({
		message: "此功能尚未开放！",
		type: "warning",
	});
};
// 锁定
const lock = () => {
	Message({
		message: "此功能尚未开放！",
		type: "warning",
	});
};
// 解锁
const unlock = () => {
	Message({
		message: "此功能尚未开放！",
		type: "warning",
	});
};
// 重命名
const rename = () => {
	Message({
		message: "此功能尚未开放！",
		type: "warning",
	});
};
// 复制
const copy = () => {
	store.commit("copy");
};
// 粘贴
const paste = () => {
	store.commit("paste", true);
	// store.commit("recordSnapshot");
};
// 剪切
const cut = () => {
	Message({
		message: "此功能尚未开放！",
		type: "warning",
	});
};

// 删除
const deleteComponent = () => {
	store.commit("deleteComponent");
	// store.commit("recordSnapshot");
};

// 收藏
const collect = () => {
	Message({
		message: "此功能尚未开放！",
		type: "warning",
	});
};

// 在蓝图编辑器中定位
const locateInBlueprint = () => {
	store.commit("deleteComponent");
	// store.commit("recordSnapshot");
};
// 点击菜单时不取消当前组件的选中状态
const handleMouseUp = () => {
	// store.commit("setClickComponentStatus", true);
};
</script>

<style lang="scss" scoped>
.contextmenu {
	z-index: 9999;
	background: hsl(215deg, 15%, 20%);
	color: #bcc9d4;
	position: absolute;
	user-select: none;
	min-width: 220px;

	ul {
		li {
			padding: 0 6px;
			line-height: 28px;
			height: 28px;
			border-left: 2px solid transparent;
			cursor: pointer;
			overflow: hidden;
			padding-right: 3em;
			display: flex;
			align-items: center;
			i {
				margin-right: 3px;
			}
			&.disable {
				color: #576369 !important;
				cursor: auto;
			}
			&:hover {
				background-color: #1d262e;
				color: #2681ff;
				border-left: 2px solid #2681ff;
			}
		}
	}
}
</style>
