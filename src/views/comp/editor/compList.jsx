import { defineComponent,defineProps, inject } from "vue";

export default defineComponent(() => {
	const props = defineProps({
		json: {
			type: Object,
		},
	});
	const compInfo = inject("compInfo");
	console.log(props);
	//   return () => (
	//     <div>
	//      {
	// 		 json.blocks.map(c=>{
	// 			return  <div>{ compInfo.compMapList["0001"].render() }</div>
	// 		 })
	// 	 }
	//     </div>
	//   )
});
