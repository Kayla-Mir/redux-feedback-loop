import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import './App.css';

function App() {
  const dispatch = useDispatch();

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
      <header className='App-header'>
        <h1 className='App-title'>Feedback!</h1>
        <h4>Don't forget it!</h4>
      </header>
    </div>
  );
}

export default App;
