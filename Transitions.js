'use strict';

var { Mixin, easingTypes, } = require('react-tween-state');

var Transitions = Object.assign(Mixin, {
  getInitialState() {
    return {
      isTransitioning: false,
      tweenQueue: [],
      tweenProperties: [],
    }
  },

  transition(property, options) {
    this.setState({isTransitioning: true});
    if (this.state.tweenProperties.indexOf(property) == -1) {
      var tweenProperties = this.state.tweenProperties.slice();
      tweenProperties.push(property);
      this.setState({tweenProperties: tweenProperties});
    }

    this.tweenState(property, {
      easing: options.easing || easingTypes.easeInOutQuad,
      duration: options.duration || 300,
      delay: options.delay,
      beginValue: (typeof options.begin === 'undefined' ? this.state[property] : options.begin),
      endValue: options.end,
      onEnd: (() => {
        // Perform on next tick because animations are removed from tweenQueue after onEnd is called
        requestAnimationFrame(() => {
          // If all tweens are done, finish transitioning
          if (this.state.tweenQueue.length === 0) {
            this.setState({isTransitioning: false})
          }

          // Option to reset the state value to the initial value
          if (options.reset) {
            if (options.reset === true) {
              this.state[property] = options.begin;
            } else {
              this.state[property] = options.reset;
            }
          }

          // Custom onEnd callback
          if (options.onEnd) onEnd();
        });
      }),
    });
  },

  transitionStyles(propertySet) {
    if (typeof propertySet === 'undefined') propertySet = [];
    var result = {};

    this.state.tweenProperties.forEach((property) => {
      if (propertySet.length === 0 || propertySet.indexOf(property) > -1) {
        var value, tweeningValue = this.getTweeningValue(property);

        if (typeof tweeningValue == 'undefined' || tweeningValue == null) {
          value = this.state[property];
        } else {
          value = tweeningValue;
        }

        result[property] = value;
      }
    });

    return result;
  },
})

module.exports = {Mixin: Transitions, Easings: easingTypes};
