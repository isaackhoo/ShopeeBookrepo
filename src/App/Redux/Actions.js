import { 
    APP_TOGGLE_EDITING_VIEW 
} from './ActionTypes';

export const appToggleEditingView = () => dispatch => {
    dispatch({
        type: APP_TOGGLE_EDITING_VIEW
    });
};