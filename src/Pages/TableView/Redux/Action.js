import { Book } from "../../../Books/Book";
import { SET_SELECTED_ROW, TABLE_UPDATE_SELECTED_KEYS } from "./ActionTypes"

export let updateSelectedTableKeys = (selectedKeys) => dispatch => {
    if (!Array.isArray(selectedKeys))
        return;

    dispatch({
        type: TABLE_UPDATE_SELECTED_KEYS,
        payload: selectedKeys
    });
};

export let setSelectedRow = (selectedRow) => dispatch => {
    let book = new Book(selectedRow);
    dispatch({
        type: SET_SELECTED_ROW,
        payload: book.toObject()
    });
};

export let clearSelectedRow = () => dispatch => {
    dispatch({
        type: SET_SELECTED_ROW,
        payload: undefined
    });
};