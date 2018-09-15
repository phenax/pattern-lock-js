import { h } from 'hyperapp';

const CodeKey = (_, children) => h('span',
	{ style: { color: '#DB696F' } },
	children,
);

const CodeValue = ({ value }) => h('span',
	{ style: { color: '#88CA5F' } },
	JSON.stringify(value)
);

const FunctionCall = (_, children) => h('span',
	{ style: { color: '#1abcdc', fontStyle: 'italic' } },
	children
);

const IndentedBlock = ({ level = 4 }, children) => h('div',
	{ style: { paddingLeft: `${level * 5}px` } },
	children
);

const CodeExample = ({ tabSize = 4, config }) => (
	h('div',
		{
			style: {
				fontSize: '.9em',
				textAlign: 'left',
				padding: '1.7em',
				backgroundColor: '#2c3e50',
				color: '#eee',
				fontFamily: '"Courier New", Courier, monospace',
				fontWeight: 'bold',
			}
		},
		h('div', {},
			h('span', { style: { color: '#cb89e6' } }, 'const'),
			' lock = ',
			h(FunctionCall, {}, 'PatternLock'),
			'({',
			h(IndentedBlock, {}, [
				h(CodeKey, {}, '$canvas'),
				': ',
				h('span', {}, [
					'document.',
					h(FunctionCall, {}, 'getElementById'),
					'(',
					h(CodeValue, { value: 'myCanvas' }),
					')',
				]),
				',',
			]),
			Object.keys(config).map(key => h(IndentedBlock, {}, [
				h(CodeKey, {}, key),
				': ',
				h(CodeValue, { value: config[key] }),
				',',
			])),
			'});'
		),
	)
);

export default CodeExample;
