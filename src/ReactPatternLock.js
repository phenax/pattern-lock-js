import React from 'react';

import PatternLock from './PatternLock';

export default class ReactPatternLock extends React.Component {

    componentDidMount() {
        this.lock = PatternLock({
            ...this.props,
            $canvas: this.$canvas,
        });
    }

    render() {
        return (
            <canvas
                ref={$c => this.$canvas = $c}
                {...this.props.canvasProps}
            />
        );
    }
}
