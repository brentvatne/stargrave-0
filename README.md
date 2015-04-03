## react-native-modal

A `<Modal>` component for react-native. This is still very much a work
in progress and only handles the simplest of cases, ideas and
contributions are very welcome.

![Demo](https://raw.githubusercontent.com/brentvatne/react-native-modal/master/demo.gif)

## Add it to your project

1. Run `npm install react-native-modal --save`
2. `var Modal = require('react-native-modal');`
3. At the bottom of your app, add the `<Modal>` element and use its
   `isVisible` prop to toggle visibility. It needs to be at the bottom
   so that it appears above all other components when it is visible.

## Usage

```javascript
'use strict';

var React = require('react-native');
var Modal = require('react-native-modal');
var { AppRegistry, StyleSheet, View, Text } = React;

class App extends React.Component {
  constructor() {
    this.state = {
      isModalOpen: false
    };
  }

  openModal() {
    this.setState({isModalOpen: true});
  }

  closeModal() {
    this.setState({isModalOpen: false});
  }

  render() {
    return (
      <View style={styles.page}>
        <Text onPress={() => this.openModal()}>
          Open Modal.
        </Text>
        <Modal isVisible={this.state.isModalOpen} onClose={() => this.closeModal()}>
          <Text>Hello world!</Text>
        </Modal>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  page: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0
  }
});

AppRegistry.registerComponent('App', () => App);
```

Also take a look on [react-native-login](https://github.com/brentvatne/react-native-login) for an example usage.

## Props

Component accepts several self-descriptive properties:

- **`hideCloseButton`** _(Bool)_
- **`isVisible`** _(Bool)_
- **`onClose`** _(Function)_
- **`customCloseButton`** _(React Component)_
- **`customShowHandler`** _(Function)_ - uses [a react-tween-state wrapper](https://github.com/brentvatne/react-native-modal/blob/master/Modal.ios.js#L52-L65) API in order to show the modal. [See example](https://github.com/brentvatne/react-native-login/blob/master/App/Screens/LoginScreen.js#L84)
- **`customHideHandler`** _(Function)_ - uses [a react-tween-state wrapper](https://github.com/brentvatne/react-native-modal/blob/master/Modal.ios.js#L52-L65) API in order to hide the modal. [See example](https://github.com/brentvatne/react-native-login/blob/master/App/Screens/LoginScreen.js#L84)



---

**MIT Licensed**

