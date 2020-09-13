import { SET_UPDATING_RECORD_DETAILS } from "./ActionTypes"

export let setUpdatingRecordDetails = (record) => dispatch => {
    dispatch({
        type: SET_UPDATING_RECORD_DETAILS,
        payload: record
    });
};

export let clearUpdatingRecordDetails = () => dispatch => {
    dispatch({
        type: SET_UPDATING_RECORD_DETAILS,
        payload: undefined
    });
};