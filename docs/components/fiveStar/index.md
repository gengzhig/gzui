# 五星好评

直接地表达对应分数。

### 基础用法

::: demo

```vue
<template>
	<gz-five-star :num="num" :size="20" highColor="orange" @change="change"> </gz-five-star>
</template>
<script setup>
import { ref } from 'vue'
const num=ref(1)
const change=(value)=>{
  num.value += value;
}
</script>
```

:::
