'use strict';

var React = require('react-native');
var {
  Animation,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  PropTypes
} = React;

var Modal = React.createClass({
  propTypes: {
    isVisible: PropTypes.bool,
    hideCloseButton: PropTypes.bool,
    customCloseButton: PropTypes.node,
    onClose: PropTypes.func,
    customShowHandler: PropTypes.func
  },

  componentDidUpdate(prevProps) {
    var { isVisible, customShowHandler } = this.props;
    var wasVisible = prevProps.isVisible;
    var nodeRef = this.refs['this'];

    if (!wasVisible && isVisible) {
      if (customShowHandler) {
          return customShowHandler(nodeRef);
      } else {
          Animation.startAnimation(nodeRef, 300, 0, 'easeInOutQuad', {opacity: 1});
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
        <View style={modalStyles.closeButton}>
          <TouchableOpacity onPress={onClose}>
            <Text style={modalStyles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (isVisible) {
      return (
        <View ref="this" style={modalStyles.container}>
          <View style={modalStyles.backdrop} />
          {closeButton}
          <View style={modalStyles.modal}>
            {React.Children.map(children, React.addons.cloneWithProps)}
          </View>
        </View>
      );
    } else {
      return <View />;
    }
  },
});

var modalStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#000000',
    opacity: 0.5,
  },
  closeButton: {
    position: 'absolute',
    borderColor: '#ffffff',
    borderRadius: 2,
    borderWidth: 1,
    right: 20,
    top: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
  },
  closeButtonText: {
    color: '#ffffff',
  },
  modal: {
    margin: 20,
    backgroundColor: '#ffffff',
    borderRadius: 3,
    padding: 20,
    alignSelf: 'stretch',
  }
});

module.exports = Modal;
