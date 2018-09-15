"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OptionsGroup = exports.OptionItem = void 0;

var _hyperapp = require("hyperapp");

var OptionItem = function OptionItem(_ref) {
  var name = _ref.name,
      value = _ref.value,
      isSelected = _ref.isSelected,
      onSelect = _ref.onSelect;
  return (0, _hyperapp.h)('label', {
    style: 'padding: .3em .5em;'
  }, [(0, _hyperapp.h)('input', {
    type: 'radio',
    name: name,
    onchange: onSelect,
    checked: isSelected
  }), value.toString()]);
};

exports.OptionItem = OptionItem;

var OptionsGroup = function OptionsGroup(_ref2) {
  var list = _ref2.list,
      onItemSelect = _ref2.onItemSelect,
      name = _ref2.name,
      selected = _ref2.selected;
  return (0, _hyperapp.h)('div', {
    style: 'padding: 1em 0;'
  }, [(0, _hyperapp.h)('div', {
    style: 'font-size: 1.3em;'
  }, (0, _hyperapp.h)('strong', {}, name)), (0, _hyperapp.h)('div', {}, list.map(function (item, index) {
    return (0, _hyperapp.h)(OptionItem, {
      name: name,
      value: item,
      key: item,
      isSelected: index === selected,
      onSelect: onItemSelect(index)
    });
  }))]);
};

exports.OptionsGroup = OptionsGroup;