import {
    SUBMIT_REPORT,
    FETCH_QUESTION_LIST
} from './types';

export const getQuestionsList = () => {
    return ({
        type: FETCH_QUESTION_LIST
    });
}

export const submitReport = (report) => {
    return ({
        type: SUBMIT_REPORT,
        payload: {report}
    });
}