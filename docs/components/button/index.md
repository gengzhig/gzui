# Button 按钮

常用的操作按钮。

### 基础用法

使用 type 来定义按钮的样式。
::: demo

```vue
<template>
	<gz-button>Default</gz-button>
	<gz-button type="primary">Primary</gz-button>
	<gz-button type="success">Success</gz-button>
	<gz-button type="info">Info</gz-button>
	<gz-button type="warning">Warning</gz-button>
	<gz-button type="danger">Danger</gz-button>
</template>
```

:::

### 朴素按钮

使用 plain 。
::: demo

```vue
<template>
	<gz-button plain>Plain</gz-button>
	<gz-button type="primary" plain>Primary</gz-button>
	<gz-button type="success" plain>Success</gz-button>
	<gz-button type="info" plain>Info</gz-button>
	<gz-button type="warning" plain>Warning</gz-button>
	<gz-button type="danger" plain>Danger</gz-button>
</template>
```

:::

### 圆角按钮

使用 round 。
::: demo

```vue
<template>
	<gz-button round>Round</gz-button>
	<gz-button type="primary" round>Primary</gz-button>
	<gz-button type="success" round>Success</gz-button>
	<gz-button type="info" round>Info</gz-button>
	<gz-button type="warning" round>Warning</gz-button>
	<gz-button type="danger" round>Danger</gz-button>
</template>
```

:::

### 禁用状态

使用 disabled 来定义按钮的样式。
::: demo

```vue
<template>
	<gz-button disabled>Default</gz-button>
	<gz-button type="primary" disabled>Primary</gz-button>
	<gz-button type="success" disabled>Success</gz-button>
	<gz-button type="info" disabled>Info</gz-button>
	<gz-button type="warning" disabled>Warning</gz-button>
	<gz-button type="danger" disabled>Danger</gz-button>
</template>
```

:::

### 文字按钮

使用 type="text" 来定义按钮的样式。
::: demo

```vue
<template>
	<gz-button type="text">Text Button</gz-button>
	<gz-button type="text" disabled>Text Button</gz-button>
</template>
```

:::

### 各种尺寸的尺寸按钮

除了默认的大小，按钮组件还提供了几种额外的尺寸可供选择，以便适配不同的场景。

通过设置 size，属性来设置不同的按钮尺寸，可供选择的尺寸有：medium、small、mini。
::: demo

```vue
<template>
	<gz-button>Default</gz-button>
	<gz-button size="medium">Medium</gz-button>
	<gz-button size="small">Small</gz-button>
	<gz-button size="mini">Mini</gz-button>
</template>
```

:::
