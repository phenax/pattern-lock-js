import { h } from 'hyperapp';

export const OptionItem = ({ name, value, isSelected, onSelect }) => (
	h('label', { style: 'padding: .3em .5em;' }, [
		h('input', {
			type: 'radio',
			name,
			onchange: onSelect,
			checked: isSelected,
		}),
		value.toString(),
	])
);

export const OptionsGroup = ({ list, onItemSelect, name, selected }) => (
	h('div', { style: 'padding: 1em 0;' }, [
		h('div', { style: 'font-size: 1.3em;' }, h('strong', {}, name)),
		h('div', {},
			list.map((item, index) => h(OptionItem, {
				name,
				value: item,
				key: item,
				isSelected: index === selected,
				onSelect: onItemSelect(index),
			})),
		),
	])
);
