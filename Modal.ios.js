'use strict';

var React = require('react-native');
var {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
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
    onClose: PropTypes.func,
    customCloseButton: PropTypes.node,
    customShowHandler: PropTypes.func,
    customHideHandler: PropTypes.func,
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
        <View style={[styles.container, this.transitionStyles()]}>
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
