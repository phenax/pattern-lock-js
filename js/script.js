
((PatternLock) => {


	const patternLock= new PatternLock({
		el: '#patternLock',
		dimens: { width: 500, height: 500 },
	});


	patternLock.generateGrid(3, 3);

})(window.PatternLock);
