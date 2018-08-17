/* eslint-disable */

import resolveModules from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

import pkg from './package.json';

const createModule = (src, name) => ({
	input: src,
	output: {
		name: name,
		file: pkg.main,
		format: 'umd'
	},
	plugins: [
		resolveModules({ extensions: ['.js', '.json', '.jsx'] }),
		babel(pkg.babel),
	],
});

export default [
	createModule('src/PatternLock.js', 'patten-lock'),
	createModule('src/ReactPatternLock.js', 'react'),
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
