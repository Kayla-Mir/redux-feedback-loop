import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './App.css';

import Feeling from '../Feeling/Feeling';
import Understanding from '../Understanding/Understanding';
import Support from '../Support/Support';
import Comments from '../Comments/Comments';
import Review from '../Review/Review';
import SubmissionSuccess from '../SubmissionSuccess/SubmissionSuccess';
import Admin from '../Admin/Admin';

function App() {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    getFeedbackFromDB();
  }, [])

  // holds the submitted feedback from the database for displaying later
  const getFeedbackFromDB = () => {
    axios({
      method: 'GET',
      url: '/feedback'
    }).then((res) => {
      console.log('in GET route', res.data);
      dispatch({
        type: 'FEEDBACK_HISTORY',
        payload: res.data
      })
    }).catch((err) => {
      console.error('error GET route', err);
    })
  }

  return (
    <div className='App'>
      <Router>
        <header className='App-header'>
          <h1 className='App-title'>Feedback!</h1>
          <h4>Don't forget it!</h4>
        </header>
        <Route exact path="/">
          <Feeling />
        </Route>
        <Route exact path="/understanding">
          <Understanding />
        </Route>
        <Route exact path="/support">
          <Support />
        </Route>
        <Route exact path="/comments">
          <Comments />
        </Route>
        <Route exact path="/review">
          <Review />
        </Route>
        <Route exact path="/submissionSuccess">
          <SubmissionSuccess />
        </Route>
        <Route exact path="/admin">
          <Admin />
        </Route>
      </Router>
    </div>
  );
}

export default App;
