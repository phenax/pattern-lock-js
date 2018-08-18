
import PatternLock from './PatternLock';

document.addEventListener('DOMContentLoaded', () => {

	const lock = PatternLock({
		$canvas: document.querySelector('#patternLock'),
		width: 300,
		height: 430,
		grid: [ 3, 3 ],
	});

	// Right L, Diagonal L
	lock.matchHash('LTExNjI0MjcxOTA=', 'MTQ2NjgyMjczMw==')
		.onSuccess(() => lock.setTheme('success'))
		.onFailure(() => lock.setTheme('failure'));

	const $password = document.querySelector('.js-password');

	lock.onStart(() => lock.setTheme('default'));
	lock.onComplete(({ hash } = {}) => $password.value = hash);
});

