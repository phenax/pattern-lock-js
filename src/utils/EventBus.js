
const EventBus = () => {
	const eventMap = {};

	const off = (eventName, cb) => {
		const fns = eventMap[eventName] = eventMap[eventName] || [];
		return fns.splice(fns.indexOf(cb) >>> 0, 1);
	};

	const on = (eventName, cb) => {
		const fns = eventMap[eventName] = eventMap[eventName] || [];
		fns.push(cb);
		return off.bind(null, fns, cb);
	};

	const emit = (event, ...args) => {
		const fns = eventMap[event];
		if (!fns || !fns.length) return [];
		return fns.map(fn => fn(...args));
	};

	return { on, off, emit };
};

export default EventBus;
