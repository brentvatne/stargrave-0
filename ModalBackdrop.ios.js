var createComponent = require('createReactIOSNativeComponentClass');
var ReactIOSViewAttributes = require('ReactIOSViewAttributes');

var ModalBackdrop = createComponent({
  validAttributes: ReactIOSViewAttributes.UIView,
  uiViewClassName: 'RNModalBackdrop',
});

module.exports = ModalBackdrop;
