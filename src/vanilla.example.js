import { h, app } from 'hyperapp';

import { Maybe } from './utils/libs';
import PatternLockJs from './PatternLock';

import { OptionsGroup } from './example-helpers/Options';

const PatternLockCanvas = {
	locker: Maybe(null),

	onCreate: ({ grid, theme, themeState }) => $canvas => {
		const lock = PatternLockJs({
			$canvas,
			grid,
			theme,
			width: 300,
			height: 430,
		});
		PatternLockCanvas.locker = Maybe(lock);
	},
	onDestroy: () => () =>
		PatternLockCanvas.locker
			.map(lock => lock.destroy()),

	onReceiveProps: ({ grid, theme, themeState }) => {
		PatternLockCanvas.locker.map(lock => {
			return lock
				.setGrid(...grid)
				.setTheme(theme)
				.setThemeState(themeState);
		});
	},
	
	render: (props) => {
		PatternLockCanvas.onReceiveProps(props);
		return h('canvas', {
			oncreate: PatternLockCanvas.onCreate(props),
			ondestroy: PatternLockCanvas.onDestroy(),
		});
	},
};



const CodeExample = ({ tabSize = 4, ...props }) => (
	h('div',
		{ style: 'text-align: left; padding: .7em 1em; background-color: #eee;' },
		h('pre', {}, JSON.stringify(props, 0, tabSize))
	)
);

const App = {
	state: {
		gridIndex: 1,
		themeIndex: 0,
		themeStateIndex: 0,
	},
	actions: {
		setGrid: gridIndex => () => ({ gridIndex }),
		setTheme: themeIndex => () => ({ themeIndex }),
		setThemeState: themeStateIndex => () => ({ themeStateIndex }),
	},
	render: ({ grids, themes, themeStates }) => (state, actions) => h('div', {}, [
		h('div', { class: 'title' }, 'PatternLockJS'),
		h('div', { class: 'subtitle' }, 'Draw unlock pattern to generate a hash'),
		h('div', { class: 'canvas-wrapper' },
			PatternLockCanvas.render({
				onComplete: ({ hash }) => actions.setPassword(hash),
				grid: grids[state.gridIndex],
				theme: themes[state.themeIndex],
				themeState: themeStates[state.themeStateIndex],
			}),
		),
		h('div', { class: 'password' }, [
			'Your password is: ',
			h('input', { value: '' })
		]),
		h(CodeExample, { state }),
		h('div', {}, [
			h(OptionsGroup, {
				name: 'Grid',
				list: grids,
				selected: state.gridIndex,
				onItemSelect: index => () => actions.setGrid(index),
			}),
			h(OptionsGroup, {
				name: 'Theme',
				list: themes,
				selected: state.themeIndex,
				onItemSelect: index => () => actions.setTheme(index),
			}),
			h(OptionsGroup, {
				name: 'Theme State',
				list: themeStates,
				selected: state.themeStateIndex,
				onItemSelect: index => () => actions.setThemeState(index),
			}),
		]),
	]),
};

document.addEventListener('DOMContentLoaded', () => {
	const $appRoot = document.getElementById('root');

	const view = App.render({
		grids: [ [2,2], [3,3], [3, 4], [4,4], [4,5] ],
		themes: [ 'dark', 'light' ],
		themeStates: [ 'default', 'success', 'failure' ],
	});

	app(App.state, App.actions, view, $appRoot);
});

