# PatternLockJS
A pattern lock library for the web.

[![forthebadge](http://forthebadge.com/images/badges/uses-js.svg)](http://forthebadge.com)
[![forthebadge](http://forthebadge.com/images/badges/you-didnt-ask-for-this.svg)](http://forthebadge.com)
[![forthebadge](http://forthebadge.com/images/badges/no-ragrets.svg)](http://forthebadge.com)


### If you wanna use it
Import the library with
```html
<script src='https://rawgit.com/phenax/pattern-lock-js/master/js/PatternLock.js'></script>
```

NOTE: The library is currently written in es2015 so if you want to use it for production, build it to es5 with babel.

### Instantiation
```javascript
const patternLock= new PatternLock({
    el: '#patternLock',
    dimens: { width: 300, height: 430 },
});
```

### Customize the theme
```javascript
patternLock.setTheme({
    accent: '#1abc9c',
    primary: '#ffffff',
    bg: '#2c3e50',
    dimens: {
        node_radius: 20,
        line_width: 6,
        node_core: 8,
        node_ring: 1,
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
patternLock.onPatternComplete= nodes => {
    // Check if the pattern is right
};
```

### Converting pattern to mapped words and hashing
```javascript
patternLock.onPatternComplete= nodes => {
    const password= PatternLock.patternToWords(nodes);
    alert('hashed password is : ' + PatternLock.hashCode(password));
};
```


<br />
<br />



