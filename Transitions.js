'use strict';

var { Mixin, easingTypes } = require('react-tween-state');

var Transitions = Object.assign(Mixin, {
  getInitialState() {
    return {
      isTransitioning: false,
      tweenQueue: [],
      tweenProperties: [],
    };
  },

  transition(property, options) {
    this.setState({isTransitioning: true});

    // Add the property to the list of tweenProperties if it isn't already there
    if (this.state.tweenProperties.indexOf(property) === -1) {
      // Ugly, pushing it directly, but if I clone and setState then only one property
      // will be registered at a time and it interferes with multiple tweens
      this.state.tweenProperties.push(property);
    }

    // If no initial value is given, use the current value in the state
    var begin = (typeof options.begin === 'undefined' ? this.state[property] : options.begin);
    this.tweenState(property, {
      easing: options.easing || easingTypes.easeInOutQuad,
      duration: options.duration || 300,
      delay: options.delay,
      beginValue: begin,
      endValue:  options.end,
      onEnd: (() => {
        // Perform on next tick because animations are removed from tweenQueue after onEnd is called
        requestAnimationFrame(() => {
          // If all tweens are done, finish transitioning
          if (!this.state.tweenQueue.length) {
            this.setState({isTransitioning: false});
          }

          // Option to reset the state value to the initial value
          if (options.reset) {
            this.state[property] = begin;
          }

          // Custom onEnd callback
          if (options.onEnd) {
            options.onEnd();
          }
        });
      }),
    });
  },

  transitionStyles(propertySet) {
    if (typeof propertySet === 'undefined') {
      propertySet = [];
    }
    var result = {};

    this.state.tweenProperties.forEach((property) => {
      if (propertySet.length === 0 || propertySet.indexOf(property) > -1) {
        var value, tweeningValue = this.getTweeningValue(property);

        if (typeof tweeningValue === 'undefined' || tweeningValue === null) {
          value = this.state[property];
        } else {
          value = tweeningValue;
        }

        result[property] = value;
      }
    });

    return result;
  }
});

module.exports = {
  Mixin: Transitions,
  Easings: easingTypes,
};
