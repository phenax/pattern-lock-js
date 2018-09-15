# PatternLockJS
A pattern lock library for the web. [Demo](https://phenax.github.io/pattern-lock-js/)


![npm (scoped)](https://img.shields.io/npm/v/@phenax/pattern-lock-js.svg?style=flat-square)
![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/@phenax/pattern-lock-js.svg?style=flat-square)
![NpmLicense](https://img.shields.io/npm/l/@phenax/pattern-lock-js.svg?style=flat-square)




### Installation

Install the library with
```bash
yarn add @phenax/pattern-lock-js
```

Import the library with
```js
import PatternLock from '@phenax/pattern-lock-js';
```

### Get started
```javascript
const lock = PatternLock({
    $canvas: document.querySelector('#patternLock'),
    width: 300,
    height: 430,
    grid: [ 3, 3 ],
});
```

### Customize the theme
```javascript
lock.setTheme('dark');
lock.setTheme('light');

// Or pass a custom theme

lock.setTheme({
    default: {
        colors: {
            accent: '#1abc9c',     // Accent color for node
            primary: '#ffffff',    // Primary node and line color
            bg: '#2c3e50',         // Canvas background color
        },
        dimens: {
            node_radius: 20,       // Radius of the outer ring of a node
            line_width: 6,         // Thickness of the line joining nodes
            node_core: 8,          // Radius of the inner circle of a node
            node_ring: 1,          // Outer ring thickness
        }
    },
    success: {
		colors: {
			accent: '#51e980',     // Green accent on successful match
		}
	},
	failure: {
		colors: {
			accent: '#e74c3c',     // Red accent on an unsuccessful match
		}
    },
    customState: {                 // Your custom state
        dimens: {
            node_radius: 25,       // Increases the node radius
        }
    },
});
```

### Manually change the state
```javascript
lock.setThemeState('success'); // Switch state to successful
lock.setThemeState('customState'); // Switch to your custom state
```

### You can even change the grid size dynamically
```javascript
lock.setGrid(4, 4); // 4x4 grid instead of the default 3x3
```


### Callback for when the pattern is complete
```javascript
lock.onComplete(({ hash }) => (myRealHash === hash) ? success() : failure());
```

### Or you can use the matchHash helper to check if the hash matches your set of correct passwords
```javascript
// If the pattern drawn is a Right L or a Diagonal L,
//    then turn the pattern green
//    else turn it red
lock.matchHash([ 'LTU2MTIyNjM0Ng==', 'MTk1OTMwNzY2NQ==' ])
    .onSuccess(() => lock.setThemeState('success'))
    .onFailure(() => lock.setThemeState('failure'));
```

<br />
