import createReducer from './createReducer'
import * as types from '../actions/types'

export const questionList = createReducer([], {
  [types.FETCH_QUESTION_LIST_SUCCESS](state, action) {
    return action.questions;
  },
  [types.FETCH_QUESTION_LIST_FAILED](state, action) {
    return state;
  }
});

export const reportState = createReducer([], {
  [types.SUBMIT_REPORT_QUESTIONS_SUCCESS](state, action) {
    return "submitted";
  },
  [types.SUBMIT_REPORT_QUESTIONS_FAILED](state, action) {
    return state;
  }
});