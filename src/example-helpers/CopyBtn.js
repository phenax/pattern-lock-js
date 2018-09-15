import { h } from 'hyperapp';
import Clipboard from 'clipboard';

import { Maybe } from '../utils/libs';

import { component } from './component';

const CopyBtn = component({
	clipboard: Maybe(null),
	defaultProps: { text: '' },

	onCreate: (self, { text }) => $btn =>
		self.clipboard = Maybe(new Clipboard($btn)),
	onDestroy: self => () =>
		self.clipboard.map(clipboard => clipboard.destroy()),

	render: ({ text, rootProps }) => h(
		'button',
		{ ...rootProps, 'data-clipboard-text': text },
		'Copy Code'
	),
});

export default CopyBtn;
