<template>
	<div class="contextmenu" v-show="menuShow" :style="{ top: menuTop + 'px', left: menuLeft + 'px' }">
		<ul @mouseup="handleMouseUp">
			<template v-if="currentComp">
				<template v-if="!currentComp.isLock">
					<li @click="topComponent" :class="[curComponentIndex == currentCompList.length - 1 ? 'disable' : '']">
						<i class="el-icon-upload2"></i>置顶
					</li>
					<li @click="bottomComponent" :class="[curComponentIndex ? '' : 'disable']">
						<i class="el-icon-download"></i>置底
					</li>
					<li @click="upComponent" :class="[curComponentIndex == currentCompList.length - 1 ? 'disable' : '']">
						<i class="el-icon-top"></i>上移一层
					</li>
					<li @click="downComponent" :class="[curComponentIndex ? '' : 'disable']">
						<i class="el-icon-bottom"></i>下移一层
					</li>
					<li @click="createGroup" :class="[!currentComp.isGroup ? '' : 'disable']">
						<i class="el-icon-suitcase"></i>成组
					</li>
					<li @click="cancelCreateGroup" :class="[currentComp.isGroup ? '' : 'disable']">
						<i class="el-icon-suitcase-1"></i>取消成组
					</li>
					<li @click="lock" :class="[!currentComp.isLock ? '' : 'disable']"><i class="el-icon-lock"></i>锁定</li>
					<li @click="unlock" :class="[currentComp.isLock ? '' : 'disable']"><i class="el-icon-unlock"></i>解锁</li>
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
import { Msgbox, Message } from "element3";
const store = useStore();
const state = reactive({
	copyData: null,
});
// 置顶
const topComponent = () => {
	store.commit("topComponent");
	store.commit("recordSnapshot");
};
// 置底
const bottomComponent = () => {
	store.commit("bottomComponent");
	store.commit("recordSnapshot");
};
// 上移一层
const upComponent = () => {
	store.commit("upComponent");
	store.commit("recordSnapshot");
};
// 下移一层
const downComponent = () => {
	store.commit("downComponent");
	store.commit("recordSnapshot");
};
// 成组
const createGroup = () => {
	// 单个组件未圈选时直接打组
	if (store.state.areaData.components.length == 0) {
		store.commit("setAreaData", {
			style: {
				height: store.state.currentComp.style.height,
				left: store.state.currentComp.style.left,
				top: store.state.currentComp.style.top,
				width: store.state.currentComp.style.width,
			},
			components: [store.state.currentComp],
		});
	}
	store.commit("compose");
	store.commit("recordSnapshot");
};
// 取消成组
const cancelCreateGroup = () => {
	store.commit("decompose");
	store.commit("recordSnapshot");
};
// 锁定
const lock = () => {
	store.commit("lock");
};
// 解锁
const unlock = () => {
	store.commit("unlock");
};
// 隐藏
const hide = () => {
	store.commit("hide");
};
// 重命名
const rename = () => {
	Msgbox.prompt("请输入组件名称", "提示", {
		confirmButtonText: "确定",
		cancelButtonText: "取消",
		// inputPattern:
		// 	/[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
		// inputErrorMessage: "邮箱格式不正确",
	})
		.then(({ value }) => {
			store.commit("rename", value);
			Message({
				type: "success",
				message: "重命名成功！",
			});
		})
		.catch(() => {
			Message({
				type: "info",
				message: "取消重命名",
			});
		});
};
// 复制
const copy = () => {
	store.commit("copy");
};
// 粘贴
const paste = () => {
	store.commit("paste", true);
	store.commit("recordSnapshot");
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
	store.commit("recordSnapshot");
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
	Message({
		message: "此功能尚未开放！",
		type: "warning",
	});
};
// 点击菜单时不取消当前组件的选中状态
const handleMouseUp = () => {
	store.commit("setClickComponentStatus", true);
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
				pointer-events: none;
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
