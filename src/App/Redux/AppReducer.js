import {
    APP_TOGGLE_EDITING_VIEW
} from './ActionTypes';

const AppReducerIniitalState = {
    isEditingView: false
};

export const AppReducer = (state = AppReducerIniitalState, action) => {
    switch (action.type) {
        case APP_TOGGLE_EDITING_VIEW: {
            return { ...state, isEditingView: !state.isEditingView };
        }
        default:
            return state;
    };
};