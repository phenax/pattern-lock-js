import { h, app } from 'hyperapp';

import { OptionsGroup } from './example-helpers/Options';
import CodeExample from './example-helpers/CodeExample';
import PatternLockCanvas from './example-helpers/PatternLockCanvas';

import { component } from './example-helpers/component';

const App = component({
	state: {
		gridIndex: 1,
		themeIndex: 0,
		themeStateIndex: 0,
		password: '',
	},
	actions: {
		setGrid: gridIndex => () => ({ gridIndex }),
		setTheme: themeIndex => () => ({ themeIndex }),
		setThemeState: themeStateIndex => () => ({ themeStateIndex }),
		setPassword: password => () => ({ password }),
	},
	render: ({ grids, themes, themeStates }) => (state, actions) => h('div', {}, [
		h('div', { class: 'title' }, 'PatternLockJS'),
		h('div', { class: 'subtitle' }, 'Draw unlock pattern to generate a hash'),
		h('div', { class: 'canvas-wrapper' },
			h(PatternLockCanvas, {
				onComplete: ({ hash }) => actions.setPassword(hash),
				grid: grids[state.gridIndex],
				theme: themes[state.themeIndex],
				themeState: themeStates[state.themeStateIndex],
			}),
		),
		h('div', { class: 'password' }, [
			'Your password is: ',
			h('input', { value: state.password })
		]),
		h(CodeExample, {
			config: {
				$canvas: CodeExample.expression('document.getElementById(\'myCanvas\')'),
				width: 300,
				height: 430,
				grid: grids[state.gridIndex],
				theme: themes[state.themeIndex],
			}
		}),
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
});

document.addEventListener('DOMContentLoaded', () => {
	const { state, actions } = App.instance;
	const view = h(App, {
		grids: [ [2,2], [3,3], [3, 4], [4,4], [4,5] ],
		themes: [ 'dark', 'light' ],
		themeStates: [ 'default', 'success', 'failure' ],
	});

	app(state, actions, view, document.getElementById('root'));
});

