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
var ModalBackdrop = require('./ModalBackdrop.ios');
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
    backdropType: PropTypes.string,
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

  renderBody() {
    return (
      <View>
        {this.renderCloseButton()}
        <View style={styles.modal}>
          {React.Children.map(this.props.children, React.addons.cloneWithProps)}
        </View>
      </View>
    );
  },

  renderModal() {
    var {
      onPressBackdrop,
      backdropType,
      backdropBlur,
    } = this.props;

    var body = this.renderBody();

    if (typeof backdropType == 'undefined' || backdropType == null || backdropType == 'plain') {
      return (
        <View style={[styles.container, this.transitionStyles()]}>
          <TouchableWithoutFeedback onPress={onPressBackdrop}>
            <View style={styles.backdrop} />
          </TouchableWithoutFeedback>
          {body}
        </View>
      );
    } else if (backdropType === 'none') {
      return (
        <View style={[styles.container, this.transitionStyles()]}>
          {body}
        </View>
      );
    } else {
      return (
        <TouchableWithoutFeedback onPress={onPressBackdrop}>
          <ModalBackdrop effect={backdropBlur} style={[styles.container, this.transitionStyles()]}>
            {body}
          </ModalBackdrop>
        </TouchableWithoutFeedback>
      );
    }
  },

  render() {
    var {
      isVisible,
      forceToFront,
    } = this.props;

    if (isVisible || this.state.isTransitioning) {
      if (forceToFront) {
        return (
          <RNModal visible={true} style={styles.container}>{this.renderModal()}</RNModal>
        );
      } else {
        return (
          <View style={styles.container}>{this.renderModal()}</View>
        );
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
