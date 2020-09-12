import { TABLE_UPDATE_SELECTED_KEYS } from "./ActionTypes";

const TableViewInitialState = {
    selectedKeys: [], // isbn
};

export const TableViewReducer = (state = TableViewInitialState, action) => {
    switch (action.type) {
        case TABLE_UPDATE_SELECTED_KEYS: {
            // action.payload::[String::isbn]
            return { ...state, selectedKeys: action.payload };
        }
        default:
            return state;
    };
};