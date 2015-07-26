'use strict';

var StyleSheet = require('react-native').StyleSheet;

module.exports = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
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
    width: 60,
    borderColor: '#ffffff',
    borderRadius: 2,
    borderWidth: 1,
    right: 20,
    top: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  closeButtonText: {
    color: '#ffffff',
  },
  modal: {
    marginTop: 70,
    marginBottom: 20,
    marginHorizontal: 20,
    backgroundColor: '#ffffff',
    borderRadius: 3,
    padding: 20,
  }
});
