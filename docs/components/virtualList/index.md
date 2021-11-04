# VirtualList 虚拟列表

在工作中，有时会遇到需要一些不能使用分页方式来加载列表数据的业务情况，对于此，我们称这种列表叫做长列表。比如，在一些外汇交易系统中，前端会实时的展示用户的持仓情况(收益、亏损、手数等)，此时对于用户的持仓列表一般是不能分页的。

### 基础用法

虚拟列表其实是按需显示的一种实现，即只对可见区域进行渲染，对非可见区域中的数据不渲染或部分渲染的技术，从而达到极高的渲染性能。

::: demo

```vue
<template>
	<gz-virtual-list :data="data" :width="300" :height="200" :itemHeight="50"></gz-virtual-list>
</template>
<script setup>
import { ref } from 'vue';
const data = ref([
	{
		title: 1,
		desc: "说明：这是第1个虚拟列表",
	},
	{
		title: 2,
		desc: "说明：这是第2个虚拟列表",
	},
	{
		title: 3,
		desc: "说明：这是第3个虚拟列表",
	},
	{
		title: 4,
		desc: "说明：这是第4个虚拟列表",
	},
	{
		title: 5,
		desc: "说明：这是第5个虚拟列表",
	},
	{
		title: 6,
		desc: "说明：这是第6个虚拟列表",
	},
	{
		title: 7,
		desc: "说明：这是第7个虚拟列表",
	},
	{
		title: 8,
		desc: "说明：这是第8个虚拟列表",
	},
	{
		title: 9,
		desc: "说明：这是第9个虚拟列表",
	},
	{
		title: 10,
		desc: "说明：这是第10个虚拟列表",
	},
	{
		title: 11,
		desc: "说明：这是第11个虚拟列表",
	},
	{
		title: 12,
		desc: "说明：这是第12个虚拟列表",
	},
	{
		title: 13,
		desc: "说明：这是第13个虚拟列表",
	},
	{
		title: 14,
		desc: "说明：这是第14个虚拟列表",
	},
	{
		title: 15,
		desc: "说明：这是第15个虚拟列表",
	},
	{
		title: 16,
		desc: "说明：这是第16个虚拟列表",
	},
]);
</script>
```

:::
