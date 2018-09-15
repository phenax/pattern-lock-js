import { h } from 'hyperapp';

import { Maybe } from '../utils/libs';
import PatternLockJs from '../PatternLock';

import { component } from './component';

const PatternLockCanvas = component({
	locker: Maybe(null),
	defaultProps: { onComplete: () => {} },

	onCreate: (self, { grid, theme, onComplete }) => $canvas => {
		const lock = PatternLockJs({
			$canvas,
			grid,
			theme,
			width: 300,
			height: 430,
		});
		// lock.onComplete(onComplete);
		self.locker = Maybe(lock);
	},
	onDestroy: (self) => () =>
		self.locker
			.map(lock => lock.destroy()),

	onReceiveProps: (self, { grid, theme, themeState }, prevProps) => {
		self.locker.map(lock => {
			return lock
				.setGrid(...grid)
				.setTheme(theme)
				.setThemeState(themeState);
		});
	},

	render: ({ rootProps, ...props }) => h('canvas', rootProps),
});

export default PatternLockCanvas;
