import { TABLE_UPDATE_SELECTED_KEYS } from "./ActionTypes"

export let updateSelectedTableKeys = (selectedKeys) => dispatch => {
    if (!Array.isArray(selectedKeys))
        return;

    dispatch({
        type: TABLE_UPDATE_SELECTED_KEYS,
        payload: selectedKeys
    });
}