import {
    TABLE_UPDATE_SELECTED_KEYS,
    SET_SELECTED_ROW
} from "./ActionTypes";

const TableViewInitialState = {
    selectedKeys: [], // isbn
    selectedRow: undefined
};

export const TableViewReducer = (state = TableViewInitialState, action) => {
    switch (action.type) {
        case TABLE_UPDATE_SELECTED_KEYS: {
            // action.payload::[String::isbn]
            return { ...state, selectedKeys: action.payload };
        }
        case SET_SELECTED_ROW: {
            // action.payload::object::Book | undefined
            return { ...state, selectedRow: action.payload };
        }
        default:
            return state;
    };
};