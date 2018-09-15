import { h } from 'hyperapp';

import { Maybe } from '../utils/libs';
import PatternLockJs from '../PatternLock';

import { component } from './component';
import { isEqual } from './utils';

const PatternLockCanvas = component({
	locker: Maybe(null),
	defaultProps: { onComplete: () => {} },

	onCreate: (self, { onComplete, ...props }) => $canvas => {
		const lock = PatternLockJs({ $canvas, ...props });
		lock.onComplete(onComplete);
		self.locker = Maybe(lock);
	},

	onDestroy: self => () =>
		self.locker.map(lock => lock.destroy()),

	onReceiveProps: (self, props, prevProps) => {
		if (isEqual(props, prevProps)) return;

		self.locker.map(lock => {
			return lock
				.setGrid(...props.grid, false)
				.setTheme(props.theme, false)
				.setThemeState(props.themeState, false)
				.forceRender();
		});
	},

	render: ({ rootProps }) => h('canvas', rootProps),
});

export default PatternLockCanvas;
