import { defineComponent, computed, inject, ref, toRef, onMounted } from "vue";
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
		const blockRef = ref(null);
		onMounted(() => {
			let { offsetWidth, offsetHeight } = blockRef.value;
		});
		return () => {
			const comp = compInfo.compMapList.get(props.block.key);
			const renderComp = comp.render();
			let compFocus = comp.focus;
			const blockMouseDown = (e, comp) => {
				if (!compFocus) {
					compFocus = true;
				} else {
					compFocus = false;
				}
				console.log(compFocus);
			};
			return (
				<div
					class={["editor-block", compFocus ? "editor-block-focus" : ""].join(" ")}
					style={blockStyle.value}
					onMousedown={e => blockMouseDown(e, comp)}
					ref={blockRef}
				>
					{renderComp}
					<div class="assistDom"></div>
				</div>
			);
		};
	},
});
