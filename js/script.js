
((PatternLock) => {


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


	patternLock.onPatternComplete= nodes => {
		const password= PatternLock.patternToWords(nodes);

		console.log(PatternLock.hashCode(password));
	};

	patternLock.start();

})(window.PatternLock);
