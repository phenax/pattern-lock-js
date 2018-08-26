
import PatternLock from './PatternLock';
import { div, input, text, h, onChange, render } from './example-helpers/bdom';


const PatternLockCanvas = () => {
	const $canvas = document.createElement('canvas');

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

const App = () => {

	const { lock, $canvas } = PatternLockCanvas();

	const $password = input();
	lock.onComplete(({ hash } = {}) => $password.value = hash);

	const onCheckChange = ({ target: $radio }) => {
		if($radio.checked && $radio.value) {
			const theme = $radio.value;
			lock.setTheme(theme);
		}
	};

	const themes = [ 'dark', 'light' ];

	const $app = div({}, [
		div({ class: 'title' }, [ text('PatternLockJS') ]),
		div({ class: 'subtitle' }, [ text('Draw unlock pattern to generate a hash') ]),
		div({ class: 'canvas-wrapper' }, [ $canvas ]),
		div({},
			themes
				.map(value => div({}, [
					h('label')({}, [
						input({ type: 'radio', name: 'themes', value }),
						text(`Theme: ${value}`),
					])
				]))
				.map($el => onChange(onCheckChange, $el))
		),
		div({ class: 'password' }, [ text('Your password is: '), $password ]),
	]);

	return { $app, lock };
};


document.addEventListener('DOMContentLoaded', () => {
	const { $app, lock } = App();
	const $appRoot = document.getElementById('root');
	render($app, $appRoot);
	lock.recalculateBounds();
});

