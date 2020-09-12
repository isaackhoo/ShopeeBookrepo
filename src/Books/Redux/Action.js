import {
    BOOK_ADD,
    BOOK_UPDATE,
    BOOK_DELETE
} from './ActionTypes';
import { Book } from '../Book';

export let bookAdd = (bookDetails) => dispatch => {
    let book = new Book({ ...bookDetails });
    dispatch({
        type: BOOK_ADD,
        payload: book
    });
};

export let bookUpdate = (bookDetails) => dispatch => {
    let book = new Book({ ...bookDetails });
    dispatch({
        type: BOOK_UPDATE,
        payload: book
    });
};

export let bookDelete = (isbn) => dispatch => {
    dispatch({
        type: BOOK_DELETE,
        payload: isbn
    });
};