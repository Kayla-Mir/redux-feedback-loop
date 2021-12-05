import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { HashRouter as Router, Route, Link } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { grey } from '@mui/material/colors';
// import Button from '@material-ui/core/Button';
import HomeIcon from '@mui/icons-material/Home';
import axios from 'axios';
import './App.css';

import Feeling from '../Feeling/Feeling';
import Understanding from '../Understanding/Understanding';
import Support from '../Support/Support';
import Comments from '../Comments/Comments';
import Review from '../Review/Review';
import SubmissionSuccess from '../SubmissionSuccess/SubmissionSuccess';
import Admin from '../Admin/Admin';

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: grey[100],
//     },
//     secondary: {
//       main: grey[100],
//     }
//   }
// });

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
      dispatch({
        type: 'FEEDBACK_HISTORY',
        payload: res.data
      })
    }).catch((err) => {
      console.error('error GET route', err);
    })
  }

  const resetReducer = () => {
    dispatch({
      type: 'RESET_STATE'
    })
  }

  return (
    <div className='App'>
      <Router>
        <header className='App-header'>
          <h1 className='App-title'>Feedback!</h1>
          <h4>Don't forget it!
            <Link to='/' className="homeButton">
              <iconButton color="secondary" size="large" onClick={resetReducer} style={{float: 'right'}}>
                <HomeIcon />
              </iconButton>
            </Link>
          </h4>
        </header>
        <Route exact path="/">
          <Link to="/feeling"><button>START</button></Link>
        </Route>
        <Route exact path="/feeling">
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
          <SubmissionSuccess getFeedbackFromDB={getFeedbackFromDB}/>
        </Route>
        <Route exact path="/admin">
          <Admin getFeedbackFromDB={getFeedbackFromDB}/>
        </Route>
      </Router>
    </div>
  );
}

export default App;
