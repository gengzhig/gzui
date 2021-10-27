<template>
	<div ref="container" class="monaco-editor" :style="'height: ' + height + 'px'"></div>
</template>

<script>
import * as monaco from "monaco-editor";
export default {
	name: "AcMonaco",
	props: {
		opts: {
			type: Object,
			default() {
				return {};
			},
		},
		height: {
			type: Number,
			default: 300,
		},
	},
	data() {
		return {
			// 主要配置
			defaultOpts: {
				value: "123", // 编辑器的值
				theme: "vs-dark", // 编辑器主题：vs, hc-black, or vs-dark，更多选择详见官网
				roundedSelection: false, // 右侧不显示编辑器预览框
				autoIndent: true, // 自动缩进
			},
		};
	},
	watch: {
		opts: {
			handler(n) {
				this.init();
			},
			deep: true,
		},
	},
	mounted() {
		this.init();
	},
	methods: {
		init() {
			// 初始化container的内容，销毁之前生成的编辑器
			this.$refs.container.innerHTML = "";
			this.editorOptions = Object.assign(this.defaultOpts, this.opts);
			// 生成编辑器对象
			this.monacoEditor = monaco.editor.create(this.$refs.container, this.editorOptions);
			monaco.languages.registerCompletionItemProvider("java", {
				provideCompletionItems: function (model, position) {
					// 获取当前行数
					const line = position.lineNumber;
					// 获取当前列数
					const column = position.column;
					// 获取当前输入行的所有内容
					const content = model.getLineContent(line);
					// 通过下标来获取当前光标后一个内容，即为刚输入的内容
					const sym = content[column - 2];
					var textUntilPosition = model.getValueInRange({
						startLineNumber: 1,
						startColumn: 1,
						endLineNumber: position.lineNumber,
						endColumn: position.column,
					});
					var word = model.getWordUntilPosition(position);
					var range = {
						startLineNumber: position.lineNumber,
						endLineNumber: position.lineNumber,
						startColumn: word.startColumn,
						endColumn: word.endColumn,
					};
					//---------------------------------------------------
					//上面的代码仅仅是为了获取sym，即提示符
					//---------------------------------------------------
					var suggestions = [];
					if (sym == "$") {
						//...
						//拦截到用户输入$，开始设置提示内容，同else中代码一致，自行拓展
					} else {
						//直接提示，以下为sql语句关键词提示
						var sqlStr = [
							"abstract",
							"continue",
							"for",
							"new",
							"switch",
							"assert",
							"default",
							"goto",
							"package",
							"synchronized",
							"boolean",
							"do",
							"if",
							"private",
							"this",
							"break",
							"double",
							"implements",
							"protected",
							"throw",
							"byte",
							"else",
							"import",
							"public",
							"throws",
							"case",
							"enum",
							"instanceof",
							"return",
							"transient",
							"catch",
							"extends",
							"int",
							"short",
							"try",
							"char",
							"final",
							"interface",
							"static",
							"void",
							"class",
							"finally",
							"long",
							"strictfp",
							"volatile",
							"const",
							"float",
							"native",
							"super",
							"while",
							"true",
							"false",
							"System",
							"out",
							"println",
						];
						for (var i in sqlStr) {
							suggestions.push({
								label: sqlStr[i], // 显示的提示内容
								kind: monaco.languages.CompletionItemKind["Function"], // 用来显示提示内容后的不同的图标
								insertText: sqlStr[i], // 选择后粘贴到编辑器中的文字
								detail: "", // 提示内容后的说明
								range: range,
							});
						}
					}
					return {
						suggestions: suggestions,
					};
				},
				triggerCharacters: ["$", ""],
			});
			// 编辑器内容发生改变时触发
			this.monacoEditor.onDidChangeModelContent(() => {
				this.$emit("change", this.monacoEditor.getValue());
			});
		},
		// 供父组件调用手动获取值
		getVal() {
			return this.monacoEditor.getValue();
		},
	},
};
</script>
