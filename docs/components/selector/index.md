# Select 选择器

当选项过多时，使用下拉菜单展示并选择内容。

### 基础用法

适用广泛的基础单选 v-model 的值为当前被选中的 el-option 的 value 属性值

::: demo

```vue
<template>
	<gz-selector
		:width="200"
		:height="40"
		:filtrateData="true"
		:value=""
		:label=""
		:menuData="menuData"
		placeholder="请选择"
		@selectItem="selectItem"
	></gz-selector>
</template>
<script setup>
import { ref } from 'vue'
const menuData = ref([
		{
			value: "1",
			label: "选项1",
		},
		{
			value: "2",
			label: "选项2",
		},
		{
			value: "3",
			label: "选项3",
		},
		{
			value: "4",
			label: "选项4",
		},
		{
			value: "5",
			label: "选项5",
		},
		{
			value: "6",
			label: "选项6",
		},
		{
			value: "7",
			label: "选项7",
		},
		{
			value: "8",
			label: "选项8",
		},
		{
			value: "9",
			label: "选项9",
		},
		{
			value: "10",
			label: "选项10",
		},
		{
			value: "11",
			label: "选项11",
		},
		{
			value: "12",
			label: "选项12",
		},
	]);
const placeholder = ref("请输入内容");
</script>
```

:::
