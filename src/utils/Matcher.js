
export default values => {
	let _onSuccess = () => {};
	let _onFailure = () => {};
	const matcher = {
		check: val => (values.indexOf(val) !== -1) ? _onSuccess() : _onFailure(),
		onSuccess(fn) { _onSuccess = fn; return matcher; },
		onFailure(fn) { _onFailure = fn; return matcher; },
	};
	return matcher;
};