
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

const OptionsGroup = ({ list, onSelect, name }) => (
	div({ style: 'padding: 1em 0;' }, [
		div({ style: 'font-size: 1.3em;' }, [ h('strong')({}, [ text(name) ]) ]),
		div({},
			list.map((item, index) => (
				h('label')({ style: 'padding: .3em .5em;' }, [
					onChange(onSelect(item, index), input({ type: 'radio', name })),
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
			onSelect: grid => () => lock.setGrid(...grid),
		}),
		// OptionsGroup({
		// 	name: 'Theme',
		// 	list: [ 'dark', 'light' ],
		// 	onSelect: theme => () => lock.setTheme(theme),
		// }),
	]);

	return { $app, lock };
};

document.addEventListener('DOMContentLoaded', () => {
	const { $app, lock } = App();
	const $appRoot = document.getElementById('root');
	render($app, $appRoot);
	lock.recalculateBounds();
});

