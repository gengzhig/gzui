# Image 图片

图片容器，在保留所有原生 img 的特性下，支持懒加载，自定义占位、加载失败等

### 基础用法

可通过 fit 确定图片如何适应到容器框，同原生 object-fit。

::: demo

```vue
<template>
	<gz-image
		width="100"
		height="100"
		src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
		fit="fill"
		alt="gz图片"
	></gz-image>
</template>
```

:::

### 加载失败

可通过 slot = error 可自定义加载失败内容

::: demo

```vue
<template>
	<gz-image
		width="100"
		height="100"
		src="https://fuss11110.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
		fit="fill"
		alt="gz图片"
	>
		<template #error>
			<img
				src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F01%2F37%2F81%2F48573c62a9aea6d.jpg&refer=http%3A%2F%2Fbpic.588ku.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1638339927&t=6d8170481e5b352044bd58f90fb367de"
			/>
		</template>
	</gz-image>
</template>
```

:::
