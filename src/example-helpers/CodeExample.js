import { h } from 'hyperapp';

const CodeExample = ({ tabSize = 4, ...props }) => (
	h('div',
		{ style: 'text-align: left; padding: .7em 1em; background-color: #eee;' },
		h('pre', {}, JSON.stringify(props, 0, tabSize))
	)
);

export default CodeExample;
