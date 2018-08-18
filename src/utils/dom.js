
export const unregisterEvent = (target, event, fn) =>
    event.split(' ').forEach(ev => target.removeEventListener(ev, fn));

export const registerEvent = (target, event, fn) => {
    event.split(' ').forEach(ev => target.addEventListener(ev, fn));
    return () => unregisterEvent(target, event, fn);
};

export const raf = requestAnimationFrame || (fn => setTimeout(fn, 16));
