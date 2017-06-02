import React, {Component} from 'react';
import {
    Text,
    View,
    ListView,
    StyleSheet,
    ScrollView,
} from 'react-native';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {ActionCreators} from '../actions'
import { Button, List, ListItem } from 'react-native-elements'

import Header from '../components/common/Header';
import Wallpaper from '../components/common/Wallpaper';
import hamburgerImg from '../assets/images/hamburger.png';
import AppColors from 'AppColors';
import FABButton from '../components/navigation/FABButton';
import kid1 from '../assets/images/kid1.jpg';
import {Actions} from 'react-native-router-flux';

class StudentDetail extends Component {
    assignParent = () => {
        console.warn('Button has been pressed!');
    };

    generateReport = (student) => {
        Actions.drawer({ key: "createReport", type: 'replace', student: student });
    };

    componentWillMount() {
        this.props.getStudentReportList(this.props.student.id);
    }

    renderRow(rowData, sectionID) {
        return (
            <ListItem
                key={sectionID}
                title={rowData.get('ReportName')}
                onPress={() => this.assignParent()} 
            />
        )
    }

    render() {
        const {reportsList} = this.props;
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        if (reportsList && reportsList.length !== 0) {
            return (
                <Wallpaper>
                    <Header title={this.props.student.get('firstName')} source={hamburgerImg} />
                    <View style={styles.container}>
                        <ScrollView>
                            <ListView dataSource={ds.cloneWithRows(reportsList)}
                                renderRow={this.renderRow}
                            />
                        </ScrollView>
                        <Button
                            raised
                            icon={{ name: 'add' }}
                            title='ADD NEW REPORT'
                            onPress={() => this.generateReport(this.props.student)}
                             />
                    </View>
                </Wallpaper>
            );
         }
         else{
              return (
                <Wallpaper>
                    <Header title={this.props.student.get('firstName')} source={hamburgerImg} />
                    <View style={styles.container}>
                        <Button
                            raised
                            icon={{ name: 'add' }}
                            title='ADD NEW REPORT'
                            onPress={() => this.generateReport(this.props.student)}
                        />
                    </View>
                </Wallpaper>
              )
         }
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 60
    },
    buttonContainer:{
        padding:10
    }
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect((state) => {
    return {
        reportsList: state.reportsList
    }
}, mapDispatchToProps)(StudentDetail);