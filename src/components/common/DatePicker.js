import React, { Component, PropTypes } from 'react';
import Dimensions from 'Dimensions';
import {
	StyleSheet,
	View,
	Image,
    Text,
    TouchableOpacity
} from 'react-native';
import AppColors from 'AppColors';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Icon } from 'react-native-elements';
import Moment from 'moment'

export default class DatePicker extends Component {

  state = {
    isDateTimePickerVisible: false,
    selectedDate :"Select Date Of Birth"
  };
 
  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });
  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

	render(){
			const { input: { value, onChange }} = this.props;
			return (
				<View style={styles.inputWrapper}>
                    <TouchableOpacity onPress={this._showDateTimePicker}>
					    <Icon name='today' style={styles.inlineImg} />
                        <Text style={styles.input}>{this.state.selectedDate}</Text>
                    </TouchableOpacity>
                    <DateTimePicker
                        isVisible={this.state.isDateTimePickerVisible}
                        onConfirm={(value) => {onChange(value); this.setState({selectedDate: Moment(value).format("MMM Do YY"),isDateTimePickerVisible: false});}}
                        onCancel={this._hideDateTimePicker}
                        value={value} 
                    />
				</View>
			);
	}

}

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
		top: 0,
	},
});
