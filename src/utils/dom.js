
export const unregisterEvent = (target, event, fn) =>
	event.split(' ').forEach(ev => target.removeEventListener(ev, fn, { passive: false }));

export const registerEvent = (target, event, fn) => {
	event.split(' ').forEach(ev => target.addEventListener(ev, fn, { passive: false }));
	return () => unregisterEvent(target, event, fn);
};

export const raf = requestAnimationFrame || (fn => setTimeout(fn, 16));

export const getPixelRatio = ctx => {
	const devicePixelRatio = window.devicePixelRatio || 1;
	const backingStorePixelRatio =
        ctx.webkitBackingStorePixelRatio ||
        ctx.mozBackingStorePixelRatio ||
        ctx.msBackingStorePixelRatio ||
        ctx.oBackingStorePixelRatio ||
        ctx.backingStorePixelRatio || 1;

	return devicePixelRatio / backingStorePixelRatio;
};
