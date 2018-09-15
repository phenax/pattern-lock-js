
export const prettyPrint = (config, tabSize = 4) => {
	const tab = Array(tabSize).fill(' ').join('');

	const predicate = value =>
		value.expresssion ? value.expresssion : JSON.stringify(value);

	const code = Object.keys(config)
		.map(key => `${key}: ${predicate(config[key])},`)
		.map(code => `${tab}${code}`)
		.join('\n');

	return `{\n${code}\n}`;
};

prettyPrint.expresssion = expresssion => ({ expresssion });


export const isEqual = (obj1, obj2) => {
	if (obj1 === obj2) return true;
	if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;
	for (let key in obj1) {
		if (obj1[key] !== obj2[key]) return false;
	}
	return true;
};
