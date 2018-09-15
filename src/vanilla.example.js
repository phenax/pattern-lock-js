import { h, app } from 'hyperapp';

import PatternLock from './PatternLock';
// import { div, input, text, h, onChange, render } from './example-helpers/bdom';


// const PatternLockCanvas = () => {
// 	const $canvas = h('canvas')();

// 	const lock = PatternLock({
// 		$canvas,
// 		width: 300,
// 		height: 430,
// 		grid: [ 3, 3 ],
// 	});

// 	// Right L, Diagonal L
// 	lock.matchHash([ 'LTExNjI0MjcxOTA=', 'MTQ2NjgyMjczMw==', 'LTYyMzEzNTM2Ng==' ])
// 		.onSuccess(() => lock.setThemeState('success'))
// 		.onFailure(() => lock.setThemeState('failure'));

// 	lock.onStart(() => lock.setThemeState('default'));

// 	return { lock, $canvas };
// };

// const App = ({ grids, themes, themeStates }) => {
// 	const { lock, $canvas } = PatternLockCanvas();
// 	const state = {
// 		grid: { value: '', index: 1 },
// 		theme: { value: '', index: 0 },
// 		themeState: { value: '', index: 0 },
// 	};

// 	const $password = input();
// 	lock.onComplete(({ hash } = {}) => $password.value = hash);
	
// 	const $codeBox = div();
// 	const renderCodeBox = () => render(CodeExample({ ...state }), $codeBox);

// 	renderCodeBox();
// 	const stateChange = (stateName, action) => (value, index) => {
// 		state[stateName] = { value, index };
// 		renderCodeBox();
// 		return action(value);
// 	};

// 	const $app = div({}, [
// 		div({ class: 'title' }, [ text('PatternLockJS') ]),
// 		div({ class: 'subtitle' }, [ text('Draw unlock pattern to generate a hash') ]),
// 		div({ class: 'canvas-wrapper' }, [ $canvas ]),
// 		div({ class: 'password' }, [ text('Your password is: '), $password ]),
// 		div({}, [ $codeBox ]),
// 		div({}, [
// 			OptionsGroup({
// 				name: 'Grid',
// 				list: grids,
// 				selected: state.grid.index,
// 				onItemSelect: stateChange('grid', grid => () => lock.setGrid(...grid)),
// 			}),
// 			OptionsGroup({
// 				name: 'Theme',
// 				list: themes,
// 				selected: state.theme.index,
// 				onItemSelect: stateChange('theme', theme => () => lock.setTheme(theme)),
// 			}),
// 			OptionsGroup({
// 				name: 'Theme State',
// 				list: themeStates,
// 				selected: state.themeState.index,
// 				onItemSelect: stateChange('themeState', ts => () => lock.setThemeState(ts)),
// 			}),
// 		]),
// 	]);

// 	return { $app, lock };
// };

const OptionItem = ({ name, value, isSelected, onSelect }) => (
	h('label', { style: 'padding: .3em .5em;' }, [
		h('input', {
			type: 'radio',
			name,
			onchange: onSelect,
			...(isSelected? { checked: true }: {}),
		}),
		value.toString(),
	])
);

const OptionsGroup = ({ list, onItemSelect, name, selected }) => (
	h('div', { style: 'padding: 1em 0;' }, [
		h('div', { style: 'font-size: 1.3em;' }, h('strong', {}, name)),
		h('div', {},
			list.map((item, index) => OptionItem({
				name,
				value: item,
				isSelected: index === selected,
				onSelect: onItemSelect(index),
			})),
		),
	])
);

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
		count: 0,
	},
	actions: {
		incr: () => ({ count }) => ({ count: count + 1 }),
		setGrid: gridIndex => () => ({ gridIndex }),
		setTheme: themeIndex => () => ({ themeIndex }),
		setThemeState: themeStateIndex => () => ({ themeStateIndex }),
	},
	render: ({ grids, themes, themeStates }) => (state, actions) => h('div', {}, [
		CodeExample({ state }),
		h('div', {}, [
			OptionsGroup({
				name: 'Grid',
				list: grids,
				selected: state.gridIndex,
				onItemSelect: index => () => actions.setGrid(index),
			}),
			OptionsGroup({
				name: 'Theme',
				list: themes,
				selected: state.themeIndex,
				onItemSelect: index => () => actions.setTheme(index),
			}),
			OptionsGroup({
				name: 'Theme State',
				list: themeStates,
				selected: state.themeStateIndex,
				onItemSelect: index => () => actions.setThemeState(index),
			}),
		]),
		h('button', { onclick: actions.incr }, 'incr'),
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

