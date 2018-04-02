/* eslint-disable */

import resolveModules from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

import pkg from './package.json';

export default [
	{
		input: 'js/PatternLock.js',
		output: {
			name: 'patten-lock',
			file: pkg.main,
			format: 'umd'
		},
		plugins: [
            resolveModules({ extensions: ['.js', '.json', '.jsx'], preferBuiltins: true }),
			babel({ exclude: 'node_modules/**' }),
		],
	},
];
