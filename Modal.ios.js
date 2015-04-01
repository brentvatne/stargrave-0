'use strict';

var React = require('react-native');
var {
  Animation,
  StyleSheet,
  View,
  TouchableOpacity,
} = React;

var merge = require('merge');

var Modal = React.createClass({
  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.isVisible && this.props.isVisible == true) {
      Animation.startAnimation(this.refs['this'], 300, 0, 'easeInOutQuad', {opacity: 1});
    }
  },

  render() {
    if (this.props.isVisible) {
      return (
        <View ref="this" style={modalStyles.container}>
          <View style={modalStyles.backdrop} />
          <View style={modalStyles.closeButton}>
            <TouchableOpacity onPress={this.props.onClose}>
              <Text style={modalStyles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>

          <View style={modalStyles.modal}>
            {this.props.children}
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
