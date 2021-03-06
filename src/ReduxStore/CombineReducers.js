import { combineReducers } from 'redux';

// reducers
import { AppReducer } from '../App/Redux/AppReducer';
import { BookReducer } from '../Books/Redux/BooksReducer';
import { TableViewReducer } from '../Pages/TableView/Redux/TableViewReducer';
import { EditorViewReducer } from '../Pages/EditorView/Redux/EditorViewReducer';

const defaultReducer = (state = {}) => {
    return state;
};

export default combineReducers({
    default: defaultReducer,
    app: AppReducer,
    books: BookReducer,
    table: TableViewReducer, 
    editor: EditorViewReducer
});