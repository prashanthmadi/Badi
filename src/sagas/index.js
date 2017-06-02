import {
    call,
    put,
    takeEvery
} from 'redux-saga/effects'
import {
    FETCH_STUDENT_LIST,
    FETCH_STUDENT_LIST_FAILED,
    FETCH_STUDENT_LIST_SUCCESS,
    FETCH_QUESTION_LIST,
    FETCH_QUESTION_LIST_FAILED,
    FETCH_QUESTION_LIST_SUCCESS,
    SUBMIT_REPORT,
    SUBMIT_REPORT_FAILED,
    SUBMIT_REPORT_SUCCESS,
    SUBMIT_REPORT_QUESTIONS,
    SUBMIT_REPORT_QUESTIONS_FAILED,
    SUBMIT_REPORT_QUESTIONS_SUCCESS,
    FETCH_STUDENT_REPORT_LIST,
    FETCH_STUDENT_REPORT_LIST_FAILED,
    FETCH_STUDENT_REPORT_LIST_SUCCESS
} from '../actions/types'

function* fetchStudentList(action) {
    try {
        var Student = Parse.Object.extend("Student");
        var query = new Parse.Query(Student);
        query.limit(20);

        const findQuery = () => new Promise((resolve, reject) => query.find({
            success: results => resolve(results),
            error: error => reject(error)
        }));

        try {
            const results = yield call(findQuery);
            yield put({
                type: FETCH_STUDENT_LIST_SUCCESS,
                students: results
            })
        } catch (error) {
            yield put({
                type: FETCH_STUDENT_LIST_FAILED,
                message: error.message
            });
        }

    } catch (error) {
        yield put({
            type: FETCH_STUDENT_LIST_FAILED,
            message: error.message
        });
    }
}

function* fetchQuestionList(action) {
    try {
        var Student = Parse.Object.extend("Questions");
        var query = new Parse.Query(Student);
        query.limit(10);

        const findQuery = () => new Promise((resolve, reject) => query.find({
            success: results => resolve(results),
            error: error => reject(error)
        }));

        try {
            const results = yield call(findQuery);
            yield put({
                type: FETCH_QUESTION_LIST_SUCCESS,
                questions: results
            })
        } catch (error) {
            yield put({
                type: FETCH_QUESTION_LIST_FAILED,
                message: error.message
            });
        }

    } catch (error) {
        yield put({
            type: FETCH_QUESTION_LIST_FAILED,
            message: error.message
        });
    }
}

function* fetchStudentReports(action) {
    try {
        var Reports = Parse.Object.extend("Reports");
        var query = new Parse.Query(Reports);
        query.equalTo("StudentId", action.payload.studentId);
        query.descending("createdAt");
        query.limit(5);

        const findQuery = () => new Promise((resolve, reject) => query.find({
            success: results => resolve(results),
            error: error => reject(error)
        }));

        try {
            const results = yield call(findQuery);
            yield put({
                type: FETCH_STUDENT_REPORT_LIST_SUCCESS,
                reports: results
            })
        } catch (error) {
            yield put({
                type: FETCH_STUDENT_REPORT_LIST_FAILED,
                message: error.message
            });
        }

    } catch (error) {
        yield put({
            type: FETCH_STUDENT_REPORT_LIST_FAILED,
            message: error.message
        });
    }
}

function* submitReportSaga(action) {

    if (typeof action.payload !== "undefined") {
        put({
            type: SUBMIT_REPORT_FAILED,
            message: "no data received"
        });
    }

    try {
        var Reports = Parse.Object.extend("Reports");
        var report = new Reports();
        var reportData = action.payload.report;
        report.set("StudentId", reportData.studentId);
        report.set("ReportName", reportData.reportName);

        delete reportData.studentId;
        delete reportData.reportName;

        const saveReport = () => new Promise((resolve, reject) => report.save(null, {
            success: results => resolve(results),
            error: error => reject(error)
        }));

        try {
            const reportInfo = yield call(saveReport);
            var reportId = reportInfo.id;
            yield put({
                type: SUBMIT_REPORT_QUESTIONS,
                payload: {
                    reportId,
                    reportData
                }
            })
        } catch (error) {
            yield put({
                type: SUBMIT_REPORT_FAILED,
                message: error.message
            });
        }

    } catch (error) {
        yield put({
            type: SUBMIT_REPORT_FAILED,
            message: error.message
        });
    }
}

function* submitReportQuestionsSaga(action) {

    if (typeof action.payload !== "undefined") {
        put({
            type: SUBMIT_REPORT_QUESTIONS_FAILED,
            message: "no data received"
        });
    }

    var reportId = action.payload.reportId;
    var reportData = action.payload.reportData;
    var questionsList = [];
    var ReportDetail = Parse.Object.extend("ReportDetail");

    try {
        for (var key in reportData) {
            var reportDetail = new ReportDetail();
            reportDetail.set("ReportId", reportId);
            reportDetail.set("QuestionId", key);
            reportDetail.set("value", reportData[key]);
            questionsList.push(reportDetail);
        }

        const saveReportQuestions = () => new Promise((resolve, reject) => Parse.Object.saveAll(questionsList, {
            success: results => resolve(results),
            error: error => reject(error)
        }));

        try {
            const results = yield call(saveReportQuestions);
            yield put({
                type: SUBMIT_REPORT_QUESTIONS_SUCCESS,
                result: results
            })
        } catch (error) {
            console.warn(error.message);
            yield put({
                type: SUBMIT_REPORT_QUESTIONS_FAILED,
                message: error.message
            });
        }

    } catch (error) {
        console.warn(error.message);
        yield put({
            type: SUBMIT_REPORT_QUESTIONS_FAILED,
            message: error.message
        });
    }
}

function* mySaga() {
    yield takeEvery(FETCH_STUDENT_LIST, fetchStudentList);
    yield takeEvery(FETCH_QUESTION_LIST, fetchQuestionList);
    yield takeEvery(SUBMIT_REPORT, submitReportSaga);
    yield takeEvery(SUBMIT_REPORT_QUESTIONS, submitReportQuestionsSaga);
    yield takeEvery(FETCH_STUDENT_REPORT_LIST, fetchStudentReports);
}

export default mySaga;