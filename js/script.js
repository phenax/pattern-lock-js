
((PatternLock) => {


	const patternLock= new PatternLock({
		el: '#patternLock',
		dimens: { width: 500, height: 500 },
	});


	patternLock.generateGrid(3, 3);
	// patternLock.joinNodes(1, 1, 2, 2);
	// patternLock.joinNodes(2, 2, 3, 1);



})(window.PatternLock);
