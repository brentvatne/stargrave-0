'use strict';

var React = require('react-native');
var {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  PropTypes,
} = React;

var Transitions = require('./Transitions');
var styles = require('./Style');

var Modal = React.createClass({
  mixins: [Transitions.Mixin],

  statics: {
    transitionEasings: Transitions.Easings,
  },

  propTypes: {
    isVisible: PropTypes.bool,
    hideCloseButton: PropTypes.bool,
    hideBackdrop: PropTypes.bool,
    onClose: PropTypes.func,
    onPressBackdrop: PropTypes.func,
    customCloseButton: PropTypes.node,
    customShowHandler: PropTypes.func,
    customHideHandler: PropTypes.func,
  },


  getDefaultProps() {
    return {
      onPressBackdrop: () => {}
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

  renderCloseButton() {
    var {
      customCloseButton,
      hideCloseButton,
      onClose,
    } = this.props;

    if (customCloseButton) {
      return React.addons.cloneWithProps(customCloseButton, null);
    } else if (!hideCloseButton && onClose) {
      return (
        <View style={styles.closeButton}>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      );
    }
  },

  renderBackdrop() {
    var {
      onPressBackdrop,
      hideBackdrop,
    } = this.props;

    if (hideBackdrop) {
      return <View />;
    } else {
      return (
        <TouchableWithoutFeedback onPress={onPressBackdrop}>
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>
      )
    }
  },

  render() {
    var {
      isVisible,
      children
    } = this.props;

    if (isVisible || this.state.isTransitioning) {
      return (
        <View style={[styles.container, this.transitionStyles()]}>
          {this.renderBackdrop()}
          {this.renderCloseButton()}
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
