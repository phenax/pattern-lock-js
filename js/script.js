
((PatternLock) => {

	document.addEventListener('DOMContentLoaded', () => {

		const patternLock= new PatternLock({
			el: '#patternLock',
			dimens: { width: 360, height: 500 },
		});

		patternLock.setTheme({
			accent: '#1abc9c',
			dimens: {
				node_radius: 25,
			}
		});

		patternLock.generateGrid(3, 3);
		patternLock.start();



		const $password= document.querySelector('.js-password');

		patternLock.onPatternComplete= nodes => {

			const password= PatternLock.patternToWords(nodes);

			$password.value= PatternLock.hashCode(password);
		};
	});

})(window.PatternLock);
