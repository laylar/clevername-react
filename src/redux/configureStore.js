import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Quotes } from './quotes';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            quotes: Quotes,
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}