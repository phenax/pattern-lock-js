
((PatternLock) => {

	document.addEventListener('DOMContentLoaded', () => {

		const patternLock= new PatternLock({
			el: '#patternLock',
			dimens: { width: 300, height: 430 },
		});

		patternLock.setTheme({
			accent: '#1abc9c',
			dimens: {
				node_radius: 20,
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
