import { SET_UPDATING_RECORD_DETAILS } from "./ActionTypes";

const EditorViewInitialState = {
    recordToUpdate: undefined
};

export const EditorViewReducer = (state = EditorViewInitialState, action) => {
    switch (action.type) {
        case SET_UPDATING_RECORD_DETAILS: {
            // action.payload::Book::toObject | undefined
            return { ...state, recordToUpdate: action.payload }
        }
        default:
            return state;
    };
};