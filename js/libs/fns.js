
export const Container = x => ({
	map: fn => Container(fn(x)),
	fold: fn => fn(x),
	getValue: () => x,
	inspect: () => `Container(${x})`,
});

export const Just = x => ({
    map: fn => Just(fn(x)),
    fold: fn => fn(x),
	getValue: () => x,
	inspect: () => `Just(${x})`,
});
export const Nothing = x => ({
    map: () => Nothing(x),
    fold: () => x,
	getValue: () => x,
	inspect: () => `Nothing(${x})`,
});

export const Maybe = x => ((!!x) ? Just(x): Nothing(x));
