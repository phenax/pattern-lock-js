import { h } from 'hyperapp';

import { prettyPrint } from './utils';

import CopyBtn from './CopyBtn';


const withColoredText = (color, predicate = ((props, children) => children)) => (props, children) =>
	h('span', { style: { color } }, predicate(props, children));

const CodeKey = withColoredText('#DB696F');
const FunctionCall = withColoredText('#1abcdc');
const CodeValue = withColoredText('#88CA5F', ({ value }) => JSON.stringify(value));

const IndentedBlock = ({ level = 4 }, children) => h('div',
	{ style: { paddingLeft: `${level * 7}px` } },
	children
);

const CodeExample = ({ tabSize = 4, config }) => (
	h('div',
		{
			style: {
				position: 'relative',
				fontSize: '.9em',
				textAlign: 'left',
				padding: '2em',
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
		h(CopyBtn, {
			text: `const lock = PatternLock(${prettyPrint({
				$canvas: prettyPrint.expresssion('document.getElementById("myCanvas")'),
				...config,
			})});`,
		}),
	)
);

export default CodeExample;
