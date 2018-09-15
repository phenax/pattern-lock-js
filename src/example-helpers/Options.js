import { h } from 'hyperapp';

export const OptionItem = ({ name, value, checked, onCheck }) => (
	h('label', { style: 'padding: .3em .5em;' }, [
		h('input', {
			name,
			checked,
			type: 'radio',
			onchange: onCheck,
		}),
		value.toString(),
	])
);

export const OptionsGroup = ({ list, onItemSelect, name, selected }) => (
	h('div', { style: 'padding: 1em 0;' }, [
		h('div', { style: 'font-size: 1.3em;' }, h('strong', {}, name)),
		h('div', {},
			list.map((value, index) => h(OptionItem, {
				name,
				value,
				key: value,
				checked: index === selected,
				onCheck: onItemSelect(index),
			})),
		),
	])
);
