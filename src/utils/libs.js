import wordMap from './word-map.js';

// type Node = { row :: Number, col :: Number }

// patternToWords :: Array<Node> -> String
export const patternToWords = nodes =>
	nodes.reduce((string = '', node) =>
		wordMap[node.row - 1][node.col - 1] + string);

// hashCode :: String -> String
export const hashCode = str => {
	if(!str.length) return '';

	const hash = str.split('').reduce((a = 0, b) => {
		a = ( (a << 5) - a ) + b.charCodeAt(0);
		return a & a;
	});

	return btoa(hash + '');
};

// bindContext :: (Object, Array<Function>) -> ()
export const bindContext = (ctx, fns) =>
	fns.forEach(fnName => ctx[fnName] = ctx[fnName] && ctx[fnName].bind(ctx));

// gcd :: (Number, Number) -> Number
export const gcd = (x, y) => {
	while (y != 0) {
		let tmp = x;
		x = y;
		y = tmp % y;
	}
	return x;
}
