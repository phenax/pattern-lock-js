
// patternToWords :: Array<Node> -> String
export const patternToWords = nodes => JSON.stringify(nodes);
//	nodes.reduce((string = '', node) => wordMap[node.row - 1][node.col - 1] + string);

// hashCode :: String -> String
export const hashCode = str => {
	if(!str.length) return '';

	const hash = str.split('').reduce((a = 0, b) => {
		a = ( (a << 5) - a ) + b.charCodeAt(0);
		return a & a;
	});

	return btoa(hash + '');
};

// gcd :: (Number, Number) -> Number
export const gcd = (x, y) => {
	while (y !== 0) {
		let tmp = x;
		x = y;
		y = tmp % y;
	}
	return x;
};
