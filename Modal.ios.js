'use strict';

var React = require('react-native');
var {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  PropTypes,
} = React;

var TweenState = require('react-tween-state');
var styles = require('./Style');
var merge = require('merge');

var Modal = React.createClass({
  mixins: [TweenState.Mixin],
  statics: {
    easingTypes: TweenState.easingTypes,
  },

  propTypes: {
    isVisible: PropTypes.bool,
    hideCloseButton: PropTypes.bool,
    onClose: PropTypes.func,
    customCloseButton: PropTypes.node,
    customShowHandler: PropTypes.func,
    customHideHandler: PropTypes.func,
  },

  getInitialState() {
    return {
      isTransitioning: false,
    }
  },

  componentWillReceiveProps(nextProps) {
    var willBeVisible = nextProps.isVisible;
    var isVisible = this.props.isVisible;

    if (willBeVisible !== isVisible) {
      if (willBeVisible) {
        var showHandler = this.props.customShowHandler || ((t) => t('opacity', {duration: 300, begin: 0, end: 1}))
        showHandler(this.transition);
      } else {
        var hideHandler = this.props.customHideHandler || ((t) => t('opacity', {duration: 300, end: 0}))
        hideHandler(this.transition);
      }
    }
  },

  transition(property, options) {
    this.setState({isTransitioning: true});

    this.tweenState(property, {
      easing: options.easing || Modal.easingTypes.easeInOutQuad,
      duration: options.duration || 300,
      beginValue: (typeof options.begin === 'undefined' ? this.state[property] : options.begin),
      endValue: options.end,
      onEnd: (() => {
        if (this.state.tweenQueue.length === 1) this.setState({isTransitioning: false})
        if (options.onEnd) onEnd();
      }),
    });
  },

  transitionStyles(propertySet) {
    if (this.state.tweenQueue.length === 0) return {};
    if (typeof propertySet === 'undefined') propertySet = [];
    var result = {};

    this.state.tweenQueue.forEach((tween) => {
      var property = tween.stateName;
      if (propertySet.length === 0 || propertySet.indexOf(property) > -1) {
        var value = this.getTweeningValue(property);
        result[property] = value;
      }
    });

    return result;
  },

  render() {
    var {
      hideCloseButton,
      customCloseButton,
      isVisible,
      onClose,
      children
    } = this.props;

    var closeButton;
    if (customCloseButton) {
      closeButton = React.addons.cloneWithProps(customCloseButton, null);
    } else if (!hideCloseButton && onClose) {
      closeButton = (
        <View style={styles.closeButton}>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (isVisible || this.state.isTransitioning) {
      return (
        <View ref="this" style={[styles.container, this.transitionStyles()]}>
          <View style={styles.backdrop} />
          {closeButton}
          <View style={styles.modal}>
            {React.Children.map(children, React.addons.cloneWithProps)}
          </View>
        </View>
      );
    } else {
      return <View />;
    }
  },
});

module.exports = Modal;
