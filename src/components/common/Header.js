/* @flow */

import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableHighlight} from 'react-native';
import { Actions } from 'react-native-router-flux';
import AppColors from 'AppColors';

export default class Header extends Component {

  _onPressButton(){
    Actions.refresh({key: 'drawer', open: value => !value })
  }
    render() {
        return (
            <View style={styles.header}> 
                <TouchableHighlight onPress={this._onPressButton} style={styles.inlineImg}>
                    <Image source={this.props.source}/>
                </TouchableHighlight>  
                <Text style={styles.text}>{this.props.title}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        height: 60,
        paddingTop: 25,
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        flexDirection: 'row',
        backgroundColor: AppColors.darkprimarycolor,
        zIndex: 10
    },
    text: {
        textAlign: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch',
        fontSize: 20,
        color:AppColors.textprimarycolor,
        flex: 1
    },
    inlineImg: {
        position: 'absolute',
        left: 10,
        top: 25,
        zIndex: 99,
        width: 30,
        height: 30
    }
});
