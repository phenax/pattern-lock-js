/* eslint-disable */

import resolveModules from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

import pkg from './package.json';

export default [
	{
		input: 'src/PatternLock.js',
		output: {
			name: 'patten-lock',
			file: pkg.main,
			format: 'umd'
		},
		plugins: [
            resolveModules({ extensions: ['.js', '.json', '.jsx'] }),
			babel(pkg.babel),
		],
	},
	{
		input: 'src/example.js',
		output: {
			name: 'example',
			file: 'build/example.js',
			format: 'iife'
		},
		plugins: [
            resolveModules({ extensions: ['.js', '.json', '.jsx'] }),
			babel(pkg.babel),
		],
	}
];
