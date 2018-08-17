
import PatternLock from './PatternLock';

document.addEventListener('DOMContentLoaded', () => {
	
	const lock = PatternLock({
		$canvas: document.querySelector('#patternLock'),
		dimens: { width: 300, height: 430 },
		grid: [ 3, 3 ],
		theme: {
			colors: {
				accent: '#1abc9c',
			},
			dimens: {
				line_width: 6,
				node_radius: 28,
				node_core: 8,
				node_ring: 1,
			}
		},
	});
	

	lock.matchHash('somepasshash')
		.onSuccess(() => lock.setTheme('success'))
		.onFailure(() => lock.setTheme('failure'));

	const $password = document.querySelector('.js-password');
	lock.on('complete', ({ nodes, hash, password }) => {
		$password.value = hash;
	});
});

