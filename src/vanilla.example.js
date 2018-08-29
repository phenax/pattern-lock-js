
import PatternLock from './PatternLock';
import { div, input, text, h, onChange, render } from './example-helpers/bdom';


const PatternLockCanvas = () => {
	const $canvas = h('canvas')();

	const lock = PatternLock({
		$canvas,
		width: 300,
		height: 430,
		grid: [ 3, 3 ],
	});

	// Right L, Diagonal L
	lock.matchHash([ 'LTExNjI0MjcxOTA=', 'MTQ2NjgyMjczMw==' ])
		.onSuccess(() => lock.setThemeState('success'))
		.onFailure(() => lock.setThemeState('failure'));

	lock.onStart(() => lock.setThemeState('default'));

	return { lock, $canvas };
};

const OptionsGroup = ({ list, onItemSelect, name, selected }) => (
	div({ style: 'padding: 1em 0;' }, [
		div({ style: 'font-size: 1.3em;' }, [ h('strong')({}, [ text(name) ]) ]),
		div({},
			list.map((item, index) => (
				h('label')({ style: 'padding: .3em .5em;' }, [
					onChange(
						onItemSelect(item, index),
						input({
							type: 'radio',
							name,
							[index === selected ? 'checked': 'unchecked']: true
						}),
					),
					text(item),
				])
			))
		),
	])
);

const App = () => {
	const { lock, $canvas } = PatternLockCanvas();

	const $password = input();
	lock.onComplete(({ hash } = {}) => $password.value = hash);

	const $app = div({}, [
		div({ class: 'title' }, [ text('PatternLockJS') ]),
		div({ class: 'subtitle' }, [ text('Draw unlock pattern to generate a hash') ]),
		div({ class: 'canvas-wrapper' }, [ $canvas ]),
		div({ class: 'password' }, [ text('Your password is: '), $password ]),
		OptionsGroup({
			name: 'Grid',
			list: [ [2,2], [3,3], [3, 4], [4,4], [4,5] ],
			selected: 1,
			onItemSelect: grid => () => lock.setGrid(...grid),
		}),
		OptionsGroup({
			name: 'Theme',
			list: [ 'dark', 'light' ],
			selected: 0,
			onItemSelect: theme => () => lock.setTheme(theme),
		}),
		OptionsGroup({
			name: 'Theme State',
			list: [ 'default', 'success', 'failure' ],
			selected: 0,
			onItemSelect: state => () => lock.setThemeState(state),
		}),
	]);

	return { $app, lock };
};

document.addEventListener('DOMContentLoaded', () => {
	const { $app, lock } = App();
	const $appRoot = document.getElementById('root');
	render($app, $appRoot);
	lock.recalculateBounds();
});

