let handleError = null;
export default {
	foo(fn) {
		callErrorHandler(fn);
	},
	bar(fn) {
		callErrorHandler(fn);
	},
	registerError(fn) {
		handleError = fn;
	},
};

function callErrorHandler(fn) {
	try {
		fn && fn();
	} catch (error) {
		handleError(error);
	}
}
