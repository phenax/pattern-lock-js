import { h, app } from 'hyperapp'

import { OptionsGroup } from './example-helpers/Options'
import CodeExample from './example-helpers/CodeExample'
import PatternLockCanvas from './example-helpers/PatternLockCanvas'

import { component } from './example-helpers/component'

const App = component({
  state: {
    gridIndex: 1,
    themeIndex: 0,
    themeStateIndex: 0,
    password: '',
    width: 300,
    height: 430,
    showArrows: false,
  },
  actions: {
    setGrid: (gridIndex) => () => ({ gridIndex }),
    setTheme: (themeIndex) => () => ({ themeIndex }),
    setThemeState: (themeStateIndex) => () => ({ themeStateIndex }),
    setPassword: (password) => () => ({ password }),
    setShowArrows: (showArrows) => () => ({ showArrows }),
  },
  render:
    ({ grids, themes, themeStates }) =>
    (state, actions) =>
      h('div', {}, [
        h('div', { class: 'title' }, 'PatternLockJS'),
        h(
          'div',
          { class: 'subtitle' },
          'Draw unlock pattern to generate a hash'
        ),
        h('div', { class: 'container' }, [
          h('div', { class: 'canvas-wrapper' }, [
            h(PatternLockCanvas, {
              width: state.width,
              height: state.height,
              onComplete: ({ hash }) => actions.setPassword(hash),
              grid: grids[state.gridIndex],
              showArrows: state.showArrows,
              theme: themes[state.themeIndex],
              themeState: themeStates[state.themeStateIndex],
            }),
            h('div', { class: 'password' }, [
              'Generated hash: ',
              h('input', { value: state.password || '-' }),
            ]),
          ]),
          h('div', { class: 'controls-container' }, [
            h('div', { class: 'controls-wrapper' }, [
              h(CodeExample, {
                config: {
                  width: state.width,
                  height: state.height,
                  grid: grids[state.gridIndex],
                  theme: themes[state.themeIndex],
                  showArrows: state.showArrows,
                },
              }),
              h('div', { style: { padding: '1em .3em' } }, [
                h(OptionsGroup, {
                  name: 'Grid',
                  list: grids,
                  selected: state.gridIndex,
                  onItemSelect: (index) => () => actions.setGrid(index),
                }),
                h(OptionsGroup, {
                  name: 'Theme',
                  list: themes,
                  selected: state.themeIndex,
                  onItemSelect: (index) => () => actions.setTheme(index),
                }),
                h(OptionsGroup, {
                  name: 'Theme State',
                  list: themeStates,
                  selected: state.themeStateIndex,
                  onItemSelect: (index) => () => actions.setThemeState(index),
                }),
                h(OptionsGroup, {
                  name: 'Arrows',
                  list: ['disabled', 'enabled'],
                  selected: state.showArrows ? 1 : 0,
                  onItemSelect: (index) => () => actions.setShowArrows(!!index),
                }),
              ]),
            ]),
          ]),
        ]),
        h('div', { style: { padding: '5em' } }),
      ]),
})

document.addEventListener('DOMContentLoaded', () => {
  const { state, actions } = App.instance
  const view = h(App, {
    grids: [
      [2, 2],
      [3, 3],
      [3, 4],
      [4, 4],
      [4, 5],
    ],
    themes: ['dark', 'light'],
    themeStates: ['default', 'success', 'failure'],
  })

  app(state, actions, view, document.getElementById('root'))
})
