import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import combinedReducers from './CombineReducers';


export const store = createStore(
    combinedReducers,
    {}, // initial state
    applyMiddleware(thunk)
);