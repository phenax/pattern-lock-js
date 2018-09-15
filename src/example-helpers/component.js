export const component = instance => {
	if (typeof instance === 'function') return instance;

	const noop = () => {};
	const {
		render,
		defaultProps,
		onReceiveProps = noop,
		onCreate = noop,
		onDestroy = noop,
	} = instance;
	let prevProps = { ...defaultProps };

	const Comp = passedProps => {
		const props = { ...defaultProps, ...passedProps };
		onReceiveProps(instance, props, prevProps);
		prevProps = props;
		return render({
			...props,
			rootProps: {
				oncreate: onCreate(instance, props),
				ondestroy: onDestroy(instance, props),
			},
		}, instance);
	};
	Comp.instance = instance;
	return Comp;
};

export const isEqual = (obj1, obj2) => {
	if (obj1 === obj2) return true;
	if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;
	for (let key in obj1) {
		if (obj1[key] !== obj2[key]) return false;
	}
	return true;
};
