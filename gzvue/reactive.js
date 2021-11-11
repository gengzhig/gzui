//_get_ 回调  _set_ 回调
export function reactive(vm, _get_, _set_) {
	const _data = vm.$data;
	for (const key in _data) {
		Object.defineProperty(vm, key, {
			get() {
				_get_(key, _data[key]);
				return _data[key];
			},
			set(newValue) {
				let oldValue = _data[key];
				_data[key] = newValue;
				_set_(key, newValue, oldValue);
			},
		});
	}
}
