{
	/* <template>
	<div>{{ compInfo.compList[0].render() }}</div>
</template>

<script setup>
import { inject } from "vue";
const compInfo = inject("compInfo");
console.log(compInfo);
</script>

<style lang="scss" scoped>
</style> */
}
import { defineComponent, inject } from "vue";
export default defineComponent({
	setup(props) {
		const compInfo = inject("compInfo");
		// const component = compInfo.compList[0];
		// const renderComponent = component.render();
		return () => {
			return (
				<div class="jsxx">
					{compInfo.compList.map(c => {
						return <div>{c.render()}</div>;
					})}
				</div>
			);
		};
	},
});
