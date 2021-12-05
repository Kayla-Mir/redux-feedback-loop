import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import Button from '@material-ui/core/Button';
import swal from 'sweetalert';

function Understanding() {
    const dispatch = useDispatch();
    const history = useHistory();

    // calls the feedback holder to display on the dom if they go back to this page
    const feedbackHolder = useSelector((store) => store.feedbackHolder);

    // sets a piece of state to send to the feedback holder to update the value
    const [understanding, setUnderstanding] = useState('');

    // updates the reducer with the rating and prevents a null value and moves us to support
    const understandingFeedback = () => {
        if (understanding === '') {
            swal('Please choose a number between 1 and 5!', {icon: 'error'})
        } else {
            console.log('understanding data', understanding);
            dispatch({
                type: 'ADD_UNDERSTANDING',
                payload: understanding
            })
            setUnderstanding('');
            history.push('/support');
        }
    }

    return (
        <div>
            <h1>How well are you understanding the content?</h1>
            <p>Understanding (1-5): </p>
            {feedbackHolder.understanding ?
                <h5 className="lastRating">Your last rating: {feedbackHolder.understanding}</h5>
                :
                <></>
            }
            <Box
                sx={{
                    display: 'flex',
                    alignSelf: 'center',
                    justifyContent: 'center',
                    paddingBottom: 2,
                }}
            >
                <Rating
                    value={Number(understanding)}
                    onChange={(event) => { setUnderstanding(event.target.value) }}
                    precision={1}
                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                />
            </Box>
            <Button 
                variant="contained" 
                style={{
                    backgroundColor: 'grey', 
                    color: '#fff', 
                    marginRight: 30
                }} 
                onClick={() => history.push('/feeling')}
            >
                Back
            </Button>
            <Button 
                variant="contained" 
                style={{
                    backgroundColor: '#5fb8af', 
                    color: '#fff'
                }} 
                onClick={understandingFeedback}
            >
                Next
            </Button>
        </div>
    )
}

export default Understanding;
