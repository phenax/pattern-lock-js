import { h } from 'hyperapp';
import Clipboard from 'clipboard';

import { Maybe } from '../utils/libs';

import { component } from './component';

const copyBtnStyles = {
	position: 'absolute',
	right: '0',
	top: '0',
	border: '1px solid #011',
	background: '#0c1e30',
	color: '#fff',
	borderRadius: '0 0 0 10px',
	fontSize: '.8em',
	padding: '.3em 1em',
};

const CopyBtn = component({
	clipboard: Maybe(null),
	defaultProps: { text: '' },

	onCreate: (self, { text }) => $btn =>
		self.clipboard = Maybe(new Clipboard($btn)),
	onDestroy: self => () =>
		self.clipboard.map(clipboard => clipboard.destroy()),

	render: ({ text, rootProps, style, ...props }) => h(
		'button',
		{
			...rootProps,
			'data-clipboard-text': text,
			style: { ...copyBtnStyles, ...style, },
			class: 'copybtn',
			...props,
		},
		'Copy Code'
	),
});

export default CopyBtn;
