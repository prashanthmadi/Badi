import React, { Component, PropTypes } from 'react';
import Dimensions from 'Dimensions';
import {
	StyleSheet,
	View,
	TextInput,
	Image,
} from 'react-native';
import AppColors from 'AppColors';

export default class UserInput extends Component {


	render(){
			const { input: { value, onChange }} = this.props;
			return (
				<View style={styles.inputWrapper}>
					<Image source={this.props.source}
						style={styles.inlineImg} />
					<TextInput style={styles.input}
						placeholder={this.props.placeholder}
						secureTextEntry={this.props.secureTextEntry}
						autoCorrect={this.props.autoCorrect}
						autoCapitalize={this.props.autoCapitalize}
						returnKeyType={this.props.returnKeyType}
						onChangeText={(value) => onChange(value)}
						placeholderTextColor= {AppColors.secondarytextcolor}
						value={value} underlineColorAndroid="transparent"
						selectTextOnFocus={true}
					/>
				</View>
			);
	}

}

UserInput.propTypes = {
	source: PropTypes.number.isRequired,
	placeholder: PropTypes.string.isRequired,
	secureTextEntry: PropTypes.bool,
	autoCorrect: PropTypes.bool,
	autoCapitalize: PropTypes.string,
	returnKeyType: PropTypes.string,
};

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
	input: {
		width: DEVICE_WIDTH - 40,
		height: 40,
		marginHorizontal: 20,
		paddingLeft: 45,
		borderRadius: 20,
		color: AppColors.primarytextcolor,
	},
	inputWrapper: {
		flex: 1,
	},
	inlineImg: {
		position: 'absolute',
		zIndex: 99,
		width: 22,
		height: 22,
		left: 35,
		top: 9,
	},
});
