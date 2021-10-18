let tools = {
	// 获取dom元素css属性值
	getStyle(obj, attr) {
		if (obj.currentStyle) {
			// 兼容IE
			return obj.currentStyle[attr];
		} else {
			return window.getComputedStyle(obj, null)[attr];
		}
	},
	deepCopy(target) {
		if (typeof target == "object") {
			const result = Array.isArray(target) ? [] : {};
			for (const key in target) {
				if (typeof target[key] == "object") {
					result[key] = tools.deepCopy(target[key]);
				} else {
					result[key] = target[key];
				}
			}
			return result;
		}
		return target;
	},
	// 重新设置组件列表的zIndex
	resetZindex(data) {
		data.map((c, i) => {
			c.zIndex = i + 1;
		});
	},
	// 保留n位小数并格式化输出（不足的部分补0）
	fomatFloat(value, n) {
		var f = Math.round(value * Math.pow(10, n)) / Math.pow(10, n);
		var s = f.toString();
		var rs = s.indexOf(".");
		if (rs < 0) {
			s += ".";
		}
		for (var i = s.length - s.indexOf("."); i <= n; i++) {
			s += "0";
		}
		return s;
	},
	// 清除画布内所有组件的选中样式
	clearAllEditorBlock(editorBlock) {
		// let editorBlock = document.querySelectorAll(".canvas .editor-block");
		[...editorBlock].map(b => {
			b.classList.remove("editor-block-focus");
		});
	},
	mod360(deg) {
		return (deg + 360) % 360;
	},
	angleToRadian(angle) {
		return (angle * Math.PI) / 180;
	},
	// 获取一个组件旋转 rotate 后的样式
	getComponentRotatedStyle(style) {
		style = { ...style };
		if (style.rotate != 0) {
			const newWidth = style.width * cos(style.rotate) + style.height * sin(style.rotate);
			const diffX = (style.width - newWidth) / 2; // 旋转后范围变小是正值，变大是负值
			style.left += diffX;
			style.right = style.left + newWidth;

			const newHeight = style.height * cos(style.rotate) + style.width * sin(style.rotate);
			const diffY = (newHeight - style.height) / 2; // 始终是正
			style.top -= diffY;
			style.bottom = style.top + newHeight;

			style.width = newWidth;
			style.height = newHeight;
		} else {
			style.bottom = style.top + style.height;
			style.right = style.left + style.width;
		}

		return style;
	},
	/**
	 * 计算根据圆心旋转后的点的坐标
	 * @param   {Object}  point  旋转前的点坐标
	 * @param   {Object}  center 旋转中心
	 * @param   {Number}  rotate 旋转的角度
	 * @return  {Object}         旋转后的坐标
	 */
	calculateRotatedPointCoordinate(point, center, rotate) {
		/**
		 * 旋转公式：
		 *  点a(x, y)
		 *  旋转中心c(x, y)
		 *  旋转后点n(x, y)
		 *  旋转角度θ                tan ??
		 * nx = cosθ * (ax - cx) - sinθ * (ay - cy) + cx
		 * ny = sinθ * (ax - cx) + cosθ * (ay - cy) + cy
		 */

		return {
			x:
				(point.x - center.x) * Math.cos(tools.angleToRadian(rotate)) -
				(point.y - center.y) * Math.sin(tools.angleToRadian(rotate)) +
				center.x,
			y:
				(point.x - center.x) * Math.sin(tools.angleToRadian(rotate)) +
				(point.y - center.y) * Math.cos(tools.angleToRadian(rotate)) +
				center.y,
		};
	},
	// 求两点之间的中点坐标
	getCenterPoint(p1, p2) {
		return {
			x: p1.x + (p2.x - p1.x) / 2,
			y: p1.y + (p2.y - p1.y) / 2,
		};
	},
	calculateComponentPositonAndSize(name, style, curPositon, proportion, needLockProportion, pointInfo) {
		funcs[name](style, curPositon, proportion, needLockProportion, pointInfo);
	},

	calculateLeftTop(style, curPositon, proportion, needLockProportion, pointInfo) {
		const { symmetricPoint } = pointInfo;
		let newCenterPoint = tools.getCenterPoint(curPositon, symmetricPoint);
		let newTopLeftPoint = tools.calculateRotatedPointCoordinate(curPositon, newCenterPoint, -style.rotate);
		let newBottomRightPoint = tools.calculateRotatedPointCoordinate(symmetricPoint, newCenterPoint, -style.rotate);

		let newWidth = newBottomRightPoint.x - newTopLeftPoint.x;
		let newHeight = newBottomRightPoint.y - newTopLeftPoint.y;

		if (needLockProportion) {
			if (newWidth / newHeight > proportion) {
				newTopLeftPoint.x += Math.abs(newWidth - newHeight * proportion);
				newWidth = newHeight * proportion;
			} else {
				newTopLeftPoint.y += Math.abs(newHeight - newWidth / proportion);
				newHeight = newWidth / proportion;
			}

			// 由于现在求的未旋转前的坐标是以没按比例缩减宽高前的坐标来计算的
			// 所以缩减宽高后，需要按照原来的中心点旋转回去，获得缩减宽高并旋转后对应的坐标
			// 然后以这个坐标和对称点获得新的中心点，并重新计算未旋转前的坐标
			const rotatedTopLeftPoint = tools.calculateRotatedPointCoordinate(newTopLeftPoint, newCenterPoint, style.rotate);
			newCenterPoint = tools.getCenterPoint(rotatedTopLeftPoint, symmetricPoint);
			newTopLeftPoint = tools.calculateRotatedPointCoordinate(rotatedTopLeftPoint, newCenterPoint, -style.rotate);
			newBottomRightPoint = tools.calculateRotatedPointCoordinate(symmetricPoint, newCenterPoint, -style.rotate);

			newWidth = newBottomRightPoint.x - newTopLeftPoint.x;
			newHeight = newBottomRightPoint.y - newTopLeftPoint.y;
		}

		if (newWidth > 0 && newHeight > 0) {
			style.width = Math.round(newWidth);
			style.height = Math.round(newHeight);
			style.left = Math.round(newTopLeftPoint.x);
			style.top = Math.round(newTopLeftPoint.y);
		}
	},

	calculateRightTop(style, curPositon, proportion, needLockProportion, pointInfo) {
		const { symmetricPoint } = pointInfo;
		let newCenterPoint = tools.getCenterPoint(curPositon, symmetricPoint);
		let newTopRightPoint = tools.calculateRotatedPointCoordinate(curPositon, newCenterPoint, -style.rotate);
		let newBottomLeftPoint = tools.calculateRotatedPointCoordinate(symmetricPoint, newCenterPoint, -style.rotate);

		let newWidth = newTopRightPoint.x - newBottomLeftPoint.x;
		let newHeight = newBottomLeftPoint.y - newTopRightPoint.y;

		if (needLockProportion) {
			if (newWidth / newHeight > proportion) {
				newTopRightPoint.x -= Math.abs(newWidth - newHeight * proportion);
				newWidth = newHeight * proportion;
			} else {
				newTopRightPoint.y += Math.abs(newHeight - newWidth / proportion);
				newHeight = newWidth / proportion;
			}

			const rotatedTopRightPoint = tools.calculateRotatedPointCoordinate(
				newTopRightPoint,
				newCenterPoint,
				style.rotate
			);
			newCenterPoint = tools.getCenterPoint(rotatedTopRightPoint, symmetricPoint);
			newTopRightPoint = tools.calculateRotatedPointCoordinate(rotatedTopRightPoint, newCenterPoint, -style.rotate);
			newBottomLeftPoint = tools.calculateRotatedPointCoordinate(symmetricPoint, newCenterPoint, -style.rotate);

			newWidth = newTopRightPoint.x - newBottomLeftPoint.x;
			newHeight = newBottomLeftPoint.y - newTopRightPoint.y;
		}

		if (newWidth > 0 && newHeight > 0) {
			style.width = Math.round(newWidth);
			style.height = Math.round(newHeight);
			style.left = Math.round(newBottomLeftPoint.x);
			style.top = Math.round(newTopRightPoint.y);
		}
	},

	calculateRightBottom(style, curPositon, proportion, needLockProportion, pointInfo) {
		const { symmetricPoint } = pointInfo;
		let newCenterPoint = tools.getCenterPoint(curPositon, symmetricPoint);
		let newTopLeftPoint = tools.calculateRotatedPointCoordinate(symmetricPoint, newCenterPoint, -style.rotate);
		let newBottomRightPoint = tools.calculateRotatedPointCoordinate(curPositon, newCenterPoint, -style.rotate);

		let newWidth = newBottomRightPoint.x - newTopLeftPoint.x;
		let newHeight = newBottomRightPoint.y - newTopLeftPoint.y;

		if (needLockProportion) {
			if (newWidth / newHeight > proportion) {
				newBottomRightPoint.x -= Math.abs(newWidth - newHeight * proportion);
				newWidth = newHeight * proportion;
			} else {
				newBottomRightPoint.y -= Math.abs(newHeight - newWidth / proportion);
				newHeight = newWidth / proportion;
			}

			const rotatedBottomRightPoint = tools.calculateRotatedPointCoordinate(
				newBottomRightPoint,
				newCenterPoint,
				style.rotate
			);
			newCenterPoint = tools.getCenterPoint(rotatedBottomRightPoint, symmetricPoint);
			newTopLeftPoint = tools.calculateRotatedPointCoordinate(symmetricPoint, newCenterPoint, -style.rotate);
			newBottomRightPoint = tools.calculateRotatedPointCoordinate(
				rotatedBottomRightPoint,
				newCenterPoint,
				-style.rotate
			);

			newWidth = newBottomRightPoint.x - newTopLeftPoint.x;
			newHeight = newBottomRightPoint.y - newTopLeftPoint.y;
		}

		if (newWidth > 0 && newHeight > 0) {
			style.width = Math.round(newWidth);
			style.height = Math.round(newHeight);
			style.left = Math.round(newTopLeftPoint.x);
			style.top = Math.round(newTopLeftPoint.y);
		}
	},

	calculateLeftBottom(style, curPositon, proportion, needLockProportion, pointInfo) {
		const { symmetricPoint } = pointInfo;
		let newCenterPoint = tools.getCenterPoint(curPositon, symmetricPoint);
		let newTopRightPoint = tools.calculateRotatedPointCoordinate(symmetricPoint, newCenterPoint, -style.rotate);
		let newBottomLeftPoint = tools.calculateRotatedPointCoordinate(curPositon, newCenterPoint, -style.rotate);

		let newWidth = newTopRightPoint.x - newBottomLeftPoint.x;
		let newHeight = newBottomLeftPoint.y - newTopRightPoint.y;

		if (needLockProportion) {
			if (newWidth / newHeight > proportion) {
				newBottomLeftPoint.x += Math.abs(newWidth - newHeight * proportion);
				newWidth = newHeight * proportion;
			} else {
				newBottomLeftPoint.y -= Math.abs(newHeight - newWidth / proportion);
				newHeight = newWidth / proportion;
			}

			const rotatedBottomLeftPoint = tools.calculateRotatedPointCoordinate(
				newBottomLeftPoint,
				newCenterPoint,
				style.rotate
			);
			newCenterPoint = tools.getCenterPoint(rotatedBottomLeftPoint, symmetricPoint);
			newTopRightPoint = tools.calculateRotatedPointCoordinate(symmetricPoint, newCenterPoint, -style.rotate);
			newBottomLeftPoint = tools.calculateRotatedPointCoordinate(rotatedBottomLeftPoint, newCenterPoint, -style.rotate);

			newWidth = newTopRightPoint.x - newBottomLeftPoint.x;
			newHeight = newBottomLeftPoint.y - newTopRightPoint.y;
		}

		if (newWidth > 0 && newHeight > 0) {
			style.width = Math.round(newWidth);
			style.height = Math.round(newHeight);
			style.left = Math.round(newBottomLeftPoint.x);
			style.top = Math.round(newTopRightPoint.y);
		}
	},

	calculateTop(style, curPositon, proportion, needLockProportion, pointInfo) {
		const { symmetricPoint, curPoint } = pointInfo;
		// 由于用户拉伸时是以任意角度拉伸的，所以在求得旋转前的坐标时，只取 y 坐标（这里的 x 坐标可能是任意值），x 坐标用 curPoint 的。
		// 这个中心点（第二个参数）用 curPoint, center, symmetricPoint 都可以，只要他们在一条直线上就行
		const rotatedcurPositon = tools.calculateRotatedPointCoordinate(curPositon, curPoint, -style.rotate);

		// 算出旋转前 y 坐标，再用 curPoint 的 x 坐标，重新计算它们旋转后对应的坐标
		const rotatedTopMiddlePoint = tools.calculateRotatedPointCoordinate(
			{
				x: curPoint.x,
				y: rotatedcurPositon.y,
			},
			curPoint,
			style.rotate
		);

		// 用旋转后的坐标和对称点算出新的高度（勾股定理）
		const newHeight = Math.sqrt(
			(rotatedTopMiddlePoint.x - symmetricPoint.x) ** 2 + (rotatedTopMiddlePoint.y - symmetricPoint.y) ** 2
		);

		const newCenter = {
			x: rotatedTopMiddlePoint.x - (rotatedTopMiddlePoint.x - symmetricPoint.x) / 2,
			y: rotatedTopMiddlePoint.y + (symmetricPoint.y - rotatedTopMiddlePoint.y) / 2,
		};

		let width = style.width;
		// 因为调整的是高度 所以只需根据锁定的比例调整宽度即可
		if (needLockProportion) {
			width = newHeight * proportion;
		}

		style.width = width;
		style.height = Math.round(newHeight);
		style.top = Math.round(newCenter.y - newHeight / 2);
		style.left = Math.round(newCenter.x - style.width / 2);
	},

	calculateRight(style, curPositon, proportion, needLockProportion, pointInfo) {
		const { symmetricPoint, curPoint } = pointInfo;
		const rotatedcurPositon = tools.calculateRotatedPointCoordinate(curPositon, curPoint, -style.rotate);
		const rotatedRightMiddlePoint = tools.calculateRotatedPointCoordinate(
			{
				x: rotatedcurPositon.x,
				y: curPoint.y,
			},
			curPoint,
			style.rotate
		);

		const newWidth = Math.sqrt(
			(rotatedRightMiddlePoint.x - symmetricPoint.x) ** 2 + (rotatedRightMiddlePoint.y - symmetricPoint.y) ** 2
		);

		const newCenter = {
			x: rotatedRightMiddlePoint.x - (rotatedRightMiddlePoint.x - symmetricPoint.x) / 2,
			y: rotatedRightMiddlePoint.y + (symmetricPoint.y - rotatedRightMiddlePoint.y) / 2,
		};

		let height = style.height;
		// 因为调整的是宽度 所以只需根据锁定的比例调整高度即可
		if (needLockProportion) {
			height = newWidth / proportion;
		}

		style.height = height;
		style.width = Math.round(newWidth);
		style.top = Math.round(newCenter.y - style.height / 2);
		style.left = Math.round(newCenter.x - newWidth / 2);
	},

	calculateBottom(style, curPositon, proportion, needLockProportion, pointInfo) {
		const { symmetricPoint, curPoint } = pointInfo;
		const rotatedcurPositon = tools.calculateRotatedPointCoordinate(curPositon, curPoint, -style.rotate);
		const rotatedBottomMiddlePoint = tools.calculateRotatedPointCoordinate(
			{
				x: curPoint.x,
				y: rotatedcurPositon.y,
			},
			curPoint,
			style.rotate
		);

		const newHeight = Math.sqrt(
			(rotatedBottomMiddlePoint.x - symmetricPoint.x) ** 2 + (rotatedBottomMiddlePoint.y - symmetricPoint.y) ** 2
		);

		const newCenter = {
			x: rotatedBottomMiddlePoint.x - (rotatedBottomMiddlePoint.x - symmetricPoint.x) / 2,
			y: rotatedBottomMiddlePoint.y + (symmetricPoint.y - rotatedBottomMiddlePoint.y) / 2,
		};

		let width = style.width;
		// 因为调整的是高度 所以只需根据锁定的比例调整宽度即可
		if (needLockProportion) {
			width = newHeight * proportion;
		}

		style.width = width;
		style.height = Math.round(newHeight);
		style.top = Math.round(newCenter.y - newHeight / 2);
		style.left = Math.round(newCenter.x - style.width / 2);
	},

	calculateLeft(style, curPositon, proportion, needLockProportion, pointInfo) {
		const { symmetricPoint, curPoint } = pointInfo;
		const rotatedcurPositon = tools.calculateRotatedPointCoordinate(curPositon, curPoint, -style.rotate);
		const rotatedLeftMiddlePoint = tools.calculateRotatedPointCoordinate(
			{
				x: rotatedcurPositon.x,
				y: curPoint.y,
			},
			curPoint,
			style.rotate
		);

		const newWidth = Math.sqrt(
			(rotatedLeftMiddlePoint.x - symmetricPoint.x) ** 2 + (rotatedLeftMiddlePoint.y - symmetricPoint.y) ** 2
		);

		const newCenter = {
			x: rotatedLeftMiddlePoint.x - (rotatedLeftMiddlePoint.x - symmetricPoint.x) / 2,
			y: rotatedLeftMiddlePoint.y + (symmetricPoint.y - rotatedLeftMiddlePoint.y) / 2,
		};

		let height = style.height;
		if (needLockProportion) {
			height = newWidth / proportion;
		}

		style.height = height;
		style.width = Math.round(newWidth);
		style.top = Math.round(newCenter.y - style.height / 2);
		style.left = Math.round(newCenter.x - newWidth / 2);
	},
};
let funcs = {
	lt: tools.calculateLeftTop,
	t: tools.calculateTop,
	rt: tools.calculateRightTop,
	r: tools.calculateRight,
	rb: tools.calculateRightBottom,
	b: tools.calculateBottom,
	lb: tools.calculateLeftBottom,
	l: tools.calculateLeft,
};
export default tools;
