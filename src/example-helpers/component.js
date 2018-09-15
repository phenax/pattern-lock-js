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

