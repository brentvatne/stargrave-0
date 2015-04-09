'use strict';

var createReactIOSNativeComponentClass = require('createReactIOSNativeComponentClass');
var ReactIOSViewAttributes = require('ReactIOSViewAttributes');

var React = require('react-native');
var {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  PropTypes,
} = React;

var Transitions = require('./Transitions');
var merge = require('merge');
var styles = require('./Style');
var noop = () => {};

var ModalMixin = {
  getInitialState() {
    return { isModalOpen: false }
  },

  openModal() {
    this.setState({isModalOpen: true});
  },

  closeModal() {
    this.setState({isModalOpen: false});
  },
}

var Modal = React.createClass({
  mixins: [Transitions.Mixin],

  statics: {
    transitionEasings: Transitions.Easings,
    Mixin: ModalMixin,
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
    forceToFront: PropTypes.bool,
  },

  getDefaultProps() {
    return {
      onPressBackdrop: noop,
    };
  },

  componentWillReceiveProps(nextProps) {
    var willBeVisible = nextProps.isVisible;
    var {
      isVisible,
      customShowHandler,
      customHideHandler,
    } = this.props;

    if (willBeVisible !== isVisible) {
      if (willBeVisible) {
        var showHandler = customShowHandler || ((t) => t('opacity', {duration: 300, begin: 0, end: 1}));
        showHandler(this.transition);
      } else {
        var hideHandler = customHideHandler || ((t) => t('opacity', {duration: 300, end: 0}));
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

    if (!hideBackdrop) {
      return (
        <TouchableWithoutFeedback onPress={onPressBackdrop}>
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>
      );
    }
  },

  renderBody() {
    return (
      <View style={[styles.container, this.transitionStyles()]}>
        {this.renderBackdrop()}
        {this.renderCloseButton()}
        <View style={styles.modal}>
          {React.Children.map(this.props.children, React.addons.cloneWithProps)}
        </View>
      </View>
    );
  },

  render() {
    var {
      isVisible,
      forceToFront,
    } = this.props;

    if (isVisible || this.state.isTransitioning) {
      if (forceToFront) {
        return (<RNModal visible={true} style={styles.container}>{this.renderBody()}</RNModal>);
      } else {
        return (<View style={styles.container}>{this.renderBody()}</View>);
      }
    } else {
      return <View />;
    }
  },
});

var RNModal = createReactIOSNativeComponentClass({
  validAttributes: merge(ReactIOSViewAttributes.UIView, {visible: true}),
  uiViewClassName: 'RNModal',
});

module.exports = Modal;
