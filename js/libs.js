
import {wordMap} from './constants';


/**
 * Convert pattern to a string of random words
 * 
 * @param {Array<{ row: Number, col: Number }>} nodes
 * 
 * @returns {String}
 */
export const patternToWords = nodes =>
	nodes.reduce((string = '', node) =>
		wordMap[node.row - 1][node.col - 1] + string);


/**
 * Hashcode algorithm implementation
 * 
 * @param {String} str
 * 
 * @returns {String}
 */
export const hashCode = str => {
	if(!str.length) return '';

	const hash = str.split('').reduce((a = 0, b) => {
		a = ( (a << 5) - a ) + b.charCodeAt(0);
		return a & a;
	});

	return btoa(hash + '');
};
