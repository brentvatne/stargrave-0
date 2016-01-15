'use strict';

var React = require('react-native');
var {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  PropTypes,
} = React;

var Transitions = require('./Transitions');
var DefaultStyles = require('./Style');
var Overlay = require('react-native-overlay');
var BlurView = require('react-native-blur').BlurView;
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
};

var Modal = React.createClass({
  mixins: [Transitions.Mixin],

  statics: {
    transitionEasings: Transitions.Easings,
    Mixin: ModalMixin,
    DefaultStyles: DefaultStyles,
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
    containerPointerEvents: PropTypes.oneOf([
      'box-none',
      'none',
      'box-only',
      'auto',
    ]),
  },

  getDefaultProps(): any {
    return {
      isVisible: false,
      hideCloseButton: false,
      onClose: noop,
      onPressBackdrop: noop,
      backdropType: 'plain',
      backdropBlur: 'light',
      forceToFront: false,
      containerPointerEvents: 'auto',
    };
  },

  componentWillReceiveProps(nextProps:any) {
    var willBeVisible = nextProps.isVisible;
    var {
      isVisible,
      customShowHandler,
      customHideHandler,
    } = this.props;

    if (willBeVisible !== isVisible) {
      var fadeIn = (t) => t('opacity', {duration: 300, begin: 0, end: 1,});
      var fadeOut = (t) => t('opacity', {duration: 300, end: 0,});

      if (willBeVisible) {
        var showHandler = customShowHandler || fadeIn;
        showHandler(this.transition);
      } else {
        var hideHandler = customHideHandler || fadeOut;
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

    var styles = this.props.style || DefaultStyles;

    if (customCloseButton) {
      return React.addons.cloneWithProps(customCloseButton, null);
    } else if (!hideCloseButton && onClose) {
      return (
        <TouchableOpacity onPress={onClose}>
          <View style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </View>
        </TouchableOpacity>
      );
    }
  },

  renderBody() {
    var styles = this.props.style || DefaultStyles;

    var responderProps = this.extractResponderProps();

    return (
      <View {...responderProps}>
        {this.renderCloseButton()}
        <View style={styles.modal} pointerEvents={this.props.containerPointerEvents}>
          {React.Children.map(this.props.children, React.addons.cloneWithProps)}
        </View>
      </View>
    );
  },

  extractResponderProps():any {
    var responderProps = {};
    if (this.props.onMoveShouldSetResponder) responderProps.onMoveShouldSetResponder = this.props.onMoveShouldSetResponder;
    if (this.props.onMoveShouldSetResponderCapture) responderProps.onMoveShouldSetResponderCapture = this.props.onMoveShouldSetResponderCapture;
    if (this.props.onResponderEnd) responderProps.onResponderEnd = this.props.onResponderEnd;
    if (this.props.onResponderGrant) responderProps.onResponderGrant = this.props.onResponderGrant;
    if (this.props.onResponderMove) responderProps.onResponderMove = this.props.onResponderMove;
    if (this.props.onResponderReject) responderProps.onResponderReject = this.props.onResponderReject;
    if (this.props.onResponderRelease) responderProps.onResponderRelease = this.props.onResponderRelease;
    if (this.props.onResponderStart) responderProps.onResponderStart = this.props.onResponderStart;
    if (this.props.onResponderTerminate) responderProps.onResponderTerminate = this.props.onResponderTerminate;
    if (this.props.onResponderTerminationRequest) responderProps.onResponderTerminationRequest = this.props.onResponderTerminationRequest;
    if (this.props.onStartShouldSetResponder) responderProps.onStartShouldSetResponder = this.props.onStartShouldSetResponder;
    if (this.props.onStartShouldSetResponderCapture) responderProps.onStartShouldSetResponderCapture = this.props.onStartShouldSetResponderCapture;
    return responderProps;
  },

  renderModal() {
    var {
      onPressBackdrop,
      backdropType,
      backdropBlur,
    } = this.props;

    var styles = this.props.style || DefaultStyles;
    var body = this.renderBody();

    if (backdropType == 'plain') {
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
          <BlurView blurType={backdropBlur} style={[styles.container, this.transitionStyles()]}>
            {body}
          </BlurView>
        </TouchableWithoutFeedback>
      );
    }
  },

  render() {
    var styles = this.props.style || DefaultStyles;
    var { isVisible, forceToFront, } = this.props;

    if (!isVisible && !this.state.isTransitioning) {
      return <View />;
    }

    if (forceToFront) {
      return (
        <Overlay isVisible={true} aboveStatusBar={true} style={styles.container}>
          {this.renderModal()}
        </Overlay>
      );
    } else {
      return (
        <View style={styles.container}>{this.renderModal()}</View>
      );
    }
  },
});

module.exports = Modal;
