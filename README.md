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
const lock = PatternLock({
    $canvas: document.querySelector('#patternLock'),
    width: 300,
    height: 430,
    grid: [ 3, 3 ],
});
```

### Customize the theme
```javascript
patternLock.setTheme('default');
patternLock.setTheme('success');
patternLock.setTheme('failure');

// Or pass a custom theme

patternLock.setTheme({
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
});
```

### Callback for when the pattern is complete
```javascript
lock.onComplete(({ hash }) => (myRealHash === hash) ? success() : failure());
```

### Check if the hash matches your set of passwords
```javascript
// If the pattern drawn is a Right L or a Diagonal L,
//    then turn the pattern green
//    else turn it red
lock.matchHash('LTU2MTIyNjM0Ng==', 'MTk1OTMwNzY2NQ==')
    .onSuccess(() => lock.setTheme('success'))
    .onFailure(() => lock.setTheme('failure'));
```


<br />
