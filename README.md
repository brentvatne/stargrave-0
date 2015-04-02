## react-native-modal

A `<Modal>` component for react-native. This is still very much a work
in progress and only handles the simplest of cases, ideas and
contributions are very welcome.

### Add it to your project

1. Run `npm install react-native-modal --save`
2. `var Modal = require('react-native-modal');`
3. At the bottom of your app, add the `<Modal>` element and use its
   `isVisible` prop to toggle visibility. It needs to be at the bottom
   so that it appears above all other components when it is visible.
4. Do not forget to include `RCTAnimation` library from `node_modules/react-native/Libraries/Animation` into your XCode `Libraries` folder ([more on linking libraries](http://facebook.github.io/react-native/docs/linking-libraries.html#content))

## Example

See [react-native-login](https://github.com/brentvatne/react-native-login) for an example, where it is
used to produce this:

![Example code result](https://raw.githubusercontent.com/brentvatne/react-native-modal/master/example.png)
