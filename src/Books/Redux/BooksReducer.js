import {
    BOOK_ADD,
    BOOK_UPDATE,
    BOOK_DELETE
} from './ActionTypes';
import { Book } from "../Book";

const BookReducerInitialState = {
    books: [], // [Book]
};

export const BookReducer = (state = BookReducerInitialState, action) => {
    switch (action.type) {
        case BOOK_ADD: {
            // payload::Book
            if (!action.payload)
                return state;
            if (!action.payload instanceof Book)
                return state;
            return {
                ...state,
                books: [...state.books, action.payload.toObject()]
            };
        }
        case BOOK_UPDATE: {
            // payload::Book
            if (!action.payload)
                return state;
            if (!action.payload instanceof Book)
                return state;
            return {
                ...state,
                books: [action.payload.toObject(), ...state.books.filter(b => b.isbn !== action.payload.isbn)]
            };
        }
        case BOOK_DELETE: {
            // payload::String::isbn
            if (!action.payload)
                return state;
            if (typeof action.payload !== 'string')
                return state;
            if (!Book.isValidIsbn(action.payload))
                return state;
            return {
                ...state,
                books: [...state.books.filter(b => b.isbn !== action.payload)]
            };
        }
        default:
            return state;
    };
};