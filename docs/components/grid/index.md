# Grid 栅格

基于 CSS Grid，响应式，远离 IE。

### 基础用法

使用列创建基础网格布局(24列)。
::: demo

```vue
<template>
	<gz-row :gutter="20" justify="center">
		<gz-col :span="10">10</gz-col>
		<gz-col :span="4">测试文字</gz-col>
		<gz-col :span="10">10</gz-col>
	</gz-row>
</template>
```

:::
