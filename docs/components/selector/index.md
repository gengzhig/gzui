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
		:menuData="[]"
		placeholder="请选择"
		@selectItem="selectItem"
	></gz-selector>
</template>
```

:::
