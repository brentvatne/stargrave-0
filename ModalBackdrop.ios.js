var createComponent = require('createReactIOSNativeComponentClass');
var ReactIOSViewAttributes = require('ReactIOSViewAttributes');
var NativeMethodsMixin = require('NativeMethodsMixin');
var merge = require('merge');
var NativeModules = require('NativeModules');
var PropTypes = require('ReactPropTypes');
var React = require('react-native');

var ModalBackdrop = React.createClass({
  propTypes: {
    effect: PropTypes.string,
  },

  mixins: [NativeMethodsMixin],

  viewConfig: {
    uiViewClassName: 'UIView',
    validAttributes: ReactIOSViewAttributes.UIView
  },

  render() {
    return <RNModalBackdrop {... this.props} />
  },
});

var RNModalBackdrop = createComponent({
  validAttributes: merge(ReactIOSViewAttributes.UIView, {effect: true}),
  uiViewClassName: 'RNModalBackdrop',
});

module.exports = ModalBackdrop;
