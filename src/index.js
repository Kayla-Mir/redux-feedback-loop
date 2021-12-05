import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';
import logger from 'redux-logger';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

const feedbackHistoryReducer = (state = [], action) => {
    switch (action.type) {
        case 'FEEDBACK_HISTORY':
            return action.payload;
        default:
            return state;
    }
}

// holds the values of input fields from user
const feedbackHolder = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_FEELING':
            return { ...state, feeling: action.payload };
        case 'ADD_UNDERSTANDING':
            return { ...state, understanding: action.payload };
        case 'ADD_SUPPORT':
            return { ...state, support: action.payload };
        case 'ADD_COMMENTS':
            return { ...state, comments: action.payload };
        case 'RESET_STATE':
            return {};
        default:
            return state;
    }
}

const storeInstance = createStore(
    combineReducers({
        feedbackHistoryReducer,
        feedbackHolder
    }),
    applyMiddleware(logger)
);

ReactDOM.render(
    <Provider store={storeInstance}>
        <App />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
