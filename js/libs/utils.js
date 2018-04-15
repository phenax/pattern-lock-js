
import { wordMap } from '../constants';
import { split, reduce, map, add } from 'rambda';
import { Container, Maybe } from './fns';


// nodeToWord :: ({ row: Number, col: Number }) -> String
const nodeToWord = ({ row, col }) => wordMap[row - 1][col - 1];

// hashCharacter :: Number -> Number
const hashCharacter = a => (a << 5) - a;

// getCharCode :: String -> Number
const getCharCode = c => c.charCodeAt(0);


// patternToWords :: Array<Array<String>> -> String
export const patternToWords = nodes =>
    Container(nodes)
        .map(map(nodeToWord))
		.fold(reduce(add, ''));

// hashReduceFn :: (Number, Number) -> Number
const hashReduceFn = (a, b) => 
    Container(a)
        .map(hashCharacter)
        .map(add(b))
        .fold(a => a & a);

// hashCode :: String -> String
export const hashCode = inputStr =>
	Maybe(inputStr || '')
		.map(split(''))
		.map(map(getCharCode))
		.map(reduce(hashReduceFn, 0))
		.fold(btoa);

console.log('MTc5NDEwNjA1Mg==', hashCode('hello world'));