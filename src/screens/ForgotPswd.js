//import liraries
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import Logo from '../components/common/Logo';
import ForgotPswdForm from '../components/forms/ForgotPswdForm';
import Wallpaper from '../components/common/Wallpaper';
import { Actions } from 'react-native-router-flux';

// create a component
class ForgotPswd extends Component {

    handleSubmit = (values) => {
        Parse.User.requestPasswordReset(values.email, {
            success: function () {
                // Password reset request was sent successfully
            },
            error: function (error) {
                console.warn("Error: " + error.code + " " + error.message);
            }
        });
      }

    render() {
        return (
          <Wallpaper>
            <Logo size={2}/>
            <ForgotPswdForm onSubmit={this.handleSubmit}/>
          </Wallpaper>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    }
});

export default ForgotPswd;
