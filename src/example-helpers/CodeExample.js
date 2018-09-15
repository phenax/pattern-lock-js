import { h } from 'hyperapp';

const CodeKey = (_, children) => h('span',
	{ style: { color: '#e74c3c' } },
	children,
);

const CodeValue = ({ value }) => h('span',
	{ style: { color: '#2ecc71' } },
	[ value.expression? `${value.expression}`: JSON.stringify(value) ]
);

const IndentedBlock = ({ level = 4 }, children) => h('div',
	{ style: { paddingLeft: `${level * 5}px` } },
	children
);

const CodeExample = ({ tabSize = 4, config }) => (
	h('div',
		{
			style: {
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
			h('span', { style: { color: '#1abcdc' } }, 'PatternLock'),
			'({',
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

CodeExample.expression = expression => ({ expression });

export default CodeExample;
