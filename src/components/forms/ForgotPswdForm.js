import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {View} from 'react-native';

import UserInput from '../common/UserInput';
import ButtonSubmit from '../common/ButtonSubmit';
import emailImg from '../../assets/images/email.png';

class ForgotPswdForm extends Component {
    render() {
        return (
            <View style={this.container()}>
                <View style={this.inputfields()}>
                    <Field name="email" component={UserInput} source={emailImg} placeholder='Email' autoCapitalize={'none'} returnKeyType={'done'} autoCorrect={false} />
                </View>
                <View style={this.submitbutton()}> 
                    <Field name="submit" component={ButtonSubmit} type="Reset Password" action={this.props.handleSubmit} />
                </View>
            </View>
        );
    }

    container() {
        return { flex: 1, alignItems: 'center' }
    }
    inputfields() {
        return { flex: 1, alignItems: 'center' }
    }
    submitbutton() {
        return { flex: 1, alignItems: 'center' }
    }
}

export default reduxForm({
    form: 'forgotPswdForm', // a unique identifier for this form
})(ForgotPswdForm)