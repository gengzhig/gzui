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
			width: `${props.block.width}px`,
			height: `${props.block.height}px`,
			zIndex: `${props.block.zIndex}`,
		}));

		const compInfo = inject("compInfo");
        
		return () => {
			const comp = compInfo.compMapList.get(props.block.key);
			const renderComp = comp.render();
			const clickComp=(e)=>{
				console.log(comp);
			}
			return (
				<div class="editor-block" style={blockStyle.value} onClick={clickComp}>
					{renderComp}
				</div>
			);
		};
	},
});
