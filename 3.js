class Draw {
	constructor(el) {
		this.el = document.querySelector(el);
		this.ctx = this.el.getContext("2d");
	}
	run() {
		this.clear();
		const eventCallback = this.line.bind(this);
		this.el.addEventListener("mousedown", event => {
			//重新开始一条路径绘制
			this.ctx.beginPath();
			//移动画笔到指定坐标
			this.ctx.moveTo(event.offsetX, event.offsetY);
			//线条结束为圆角
			this.ctx.lineCap = "round";
			//线条拐角为圆角
			this.ctx.lineJoin = "round";
			this.ctx.lineWidth = 10;
			this.el.addEventListener("mousemove", eventCallback);
		});
		this.el.addEventListener("mouseup", () => {
			this.el.removeEventListener("mousemove", eventCallback);
		});
	}
	screenshot() {
		const img = document.querySelector("#img");
		//生成图片 base64 数据
		img.src = this.el.toDataURL("image/jpeg");
		console.log(img.src);
		img.width = 200;
		img.style = "border:solid 5px #16a085";
	}
	clear() {
		this.ctx.fillStyle = "#2c3e50";
		this.ctx.fillRect(0, 0, this.el.width, this.el.height);
	}
	line(event) {
		//添加一个绘制点
		this.ctx.lineTo(event.offsetX, event.offsetY);
		//设置线条颜色
		this.ctx.strokeStyle = "#fff";
		//将使用 lineTo 定义的点绘制出来
		this.ctx.stroke();
	}
}
