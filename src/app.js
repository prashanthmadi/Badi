import React, {Component} from 'react';
import { Provider } from 'react-redux'
import {Actions} from 'react-native-router-flux';
var Parse = require('parse/react-native');

import {serverURL,appId} from './env';
import Store from './store';
import AppNavigation from './components/navigation/AppNavigation';

const store = Store();

class Root extends Component {

  async isLoggedIn() {
    const user = await Parse.User.currentAsync();
    if (user) {
      Actions.drawer();
    } else {
      Actions.loginScreen();
    }
  }

  render() {

    Parse.initialize(appId);
    Parse.serverURL = serverURL;
    window.Parse = Parse;

    this.isLoggedIn();
    return (
      <Provider store={store}>
        <AppNavigation />
      </Provider>
    );
  }
}

module.exports = Root;
