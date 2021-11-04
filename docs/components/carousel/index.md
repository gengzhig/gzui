# Carousel 轮播图

在有限空间内，循环播放同一类型的图片、文字等内容。

### 基础用法

::: demo

```vue
<template>
	<gz-carousel
		width="100%"
		dotBgColor="#333"
		imgFit="cover"
		:autoplay="true"
		:duration="2000"
		:initial="0"
		:hasDot="true"
		:hasDirector="true"
		@dotClickIndex="dotClickIndex"
	>
		<gz-carousel-item v-for="(item, index) in cData" :key="index">
			<img :src="item.src" />
		</gz-carousel-item>
	</gz-carousel>
</template>
<script setup>
// import cData from '../../../gzui/carousel/data'
</script>
```

:::
