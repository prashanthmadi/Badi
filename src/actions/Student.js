import {
    FETCH_STUDENT_LIST,
    FETCH_STUDENT_REPORT_LIST
} from './types';

export const getStudentsList = () => {
    return ({
        type: FETCH_STUDENT_LIST
    });
}

export const getStudentReportList = (studentId) => {
    return ({
        type: FETCH_STUDENT_REPORT_LIST,
        payload: {
            "studentId": studentId
        }
    });
}