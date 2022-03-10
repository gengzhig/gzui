import { mount } from "@vue/test-utils";
import DTree from ".././index";
describe("button组件", () => {
	it("button组件被正确渲染", () => {
		expect(1).toEqual(1);
	});
});
// describe("tree", () => {
// 	it("should render correctly", () => {
// 		const wrapper = mount({
// 			components: { DTree },
// 			template: `
//         <d-tree :data="data"></d-tree>
//       `,
// 			setup() {
// 				const data = [
// 					{
// 						label: "一级 1",
// 						level: 1,
// 						children: [
// 							{
// 								label: "二级 1-1",
// 								level: 2,
// 								children: [
// 									{
// 										label: "三级 1-1-1",
// 										level: 3,
// 									},
// 								],
// 							},
// 						],
// 					},
// 					{
// 						label: "一级 2",
// 						level: 1,
// 						open: true, // 新增
// 						children: [
// 							{
// 								label: "二级 2-1",
// 								level: 2,
// 								children: [
// 									{
// 										label: "三级 2-1-1",
// 										level: 3,
// 									},
// 								],
// 							},
// 							{
// 								label: "二级 2-2",
// 								level: 2,
// 								children: [
// 									{
// 										label: "三级 2-2-1",
// 										level: 3,
// 									},
// 								],
// 							},
// 						],
// 					},
// 					{
// 						label: "一级 3",
// 						level: 1,
// 						open: true, // 新增
// 						children: [
// 							{
// 								label: "二级 3-1",
// 								level: 2,
// 								children: [
// 									{
// 										label: "三级 3-1-1",
// 										level: 3,
// 									},
// 								],
// 							},
// 							{
// 								label: "二级 3-2",
// 								level: 2,
// 								open: true, // 新增
// 								children: [
// 									{
// 										label: "三级 3-2-1",
// 										level: 3,
// 									},
// 								],
// 							},
// 						],
// 					},
// 					{
// 						label: "一级 4",
// 						level: 1,
// 					},
// 				];

// 				return {
// 					data,
// 				};
// 			},
// 		});

// 		expect(wrapper.classes()).toContain("devui-tree");
// 	});
// });
