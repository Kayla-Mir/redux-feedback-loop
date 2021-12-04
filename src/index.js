import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';
import logger from 'redux-logger';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

const feedbackHistoryReducer = (state=[], action) => {
    switch(action.type) {
        case 'FEEDBACK_HISTORY':
            return action.payload;
    }
    return state;
}

const storeInstance = createStore(
    combineReducers({
        feedbackHistoryReducer
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
