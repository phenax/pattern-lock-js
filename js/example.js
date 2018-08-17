
import PatternLock from './PatternLock';

document.addEventListener('DOMContentLoaded', () => {

	const lock = PatternLock({
		$canvas: document.querySelector('#patternLock'),
		width: 300,
		height: 430,
		grid: [ 3, 3 ],
	});

	window.lock = lock;

	// lock.matchHash('somepasshash')
	// 	.onSuccess(() => lock.setTheme('success'))
	// 	.onFailure(() => lock.setTheme('failure'));

	// const $password = document.querySelector('.js-password');
	// lock.on('complete', ({ nodes, hash, password }) => {
	// 	$password.value = hash;
	// });
});

