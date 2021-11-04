# Input 输入框

通过鼠标或键盘输入字符

### 基础用法

::: demo

```vue
<template>
	<gz-input v-model:inputValue="inputValue" inputType="text" :disabled="false" :placeholder="placeholder"> </gz-input>
</template>
<script setup>
import { ref } from 'vue'
const inputValue = ref("");
const placeholder = ref("请输入内容");
</script>
```

:::
