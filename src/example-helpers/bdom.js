
const isValidAttribute = attrName => {
	const invalidAttributes = [ 'style' ];
	return invalidAttributes.indexOf(attrName) === -1;
};

export const h = tagName => (props = {}, children = []) => {
	const $el = document.createElement(tagName);

	Object.keys(props)
		.filter(isValidAttribute)
		.forEach(key => $el.setAttribute(key, props[key]));
	
	Object.assign($el.style, props.style);
	children.forEach(child => $el.appendChild(child));

	return $el;
};

export const text = str => document.createTextNode(str);
export const div = h('div');
export const input = h('input');

export const onEvent = ev => (fn, $el) => {
	$el.addEventListener(ev, fn);
	return $el;
};
export const onChange = onEvent('change');

export const render = ($child, $parent) => $parent.appendChild($child);
