import { defineComponent, computed, inject, toRef } from "vue";
import "./compList.css";
export default defineComponent({
	props: {
		block: {
			type: Object,
		},
	},
	setup(props, ctx) {
		const blockStyle = computed(() => ({
			top: `${props.block.top}px`,
			left: `${props.block.left}px`,
			zIndex: `${props.block.zIndex}`,
		}));

		const compInfo = inject("compInfo");
		console.log(compInfo, "blockStyle");

		return () => {
			const comp = compInfo.compMapList.get(props.block.key);
			const renderComp = comp.render();
			return (
				<div class="editor-block" style={blockStyle.value}>
					{renderComp}
				</div>
			);
		};
	},
});
