# PatternLockJS
A pattern lock library for the web. [Demo](https://phenax.github.io/pattern-lock-js/)

[![forthebadge](http://forthebadge.com/images/badges/uses-js.svg)](http://forthebadge.com)
[![forthebadge](http://forthebadge.com/images/badges/you-didnt-ask-for-this.svg)](http://forthebadge.com)
[![forthebadge](http://forthebadge.com/images/badges/no-ragrets.svg)](http://forthebadge.com)


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
const patternLock = new PatternLock({
    el: '#patternLock',
    dimens: { width: 300, height: 430 },
});
```

### Customize the theme
```javascript
patternLock.setTheme({
    accent: '#1abc9c',     // Accent color for node
    primary: '#ffffff',    // Primary node and line color
    bg: '#2c3e50',         // Canvas background color
    dimens: {
        node_radius: 20,   // Radius of the outer ring of a node
        line_width: 6,     // Thickness of the line joining nodes
        node_core: 8,      // Radius of the inner circle of a node
        node_ring: 1,      // Outer ring thickness
    }
});
```

### Create the grid
```javascript
patternLock.generateGrid(3, 3);
```

### Start
```javascript
patternLock.start();
```

### Callback for when the pattern is complete
```javascript
patternLock.onPatternComplete = nodes => {
    // Check if the pattern is right
};
```

### Converting pattern to mapped words and hashing
```javascript
patternLock.onPatternComplete= nodes => {
    const password = PatternLock.patternToWords(nodes);
    alert('hashed password is : ' + PatternLock.hashCode(password));
};
```


<br />
<br />



