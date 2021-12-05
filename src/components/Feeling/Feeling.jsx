import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import Button from '@material-ui/core/Button';
import swal from 'sweetalert';

function Feeling() {
    const dispatch = useDispatch();
    const history = useHistory();

    // calls the feedback holder to display on the dom if they go back to this page
    const feedbackHolder = useSelector((store) => store.feedbackHolder);

    // sets a piece of state to use to send to the feedback holder for updating the value
    const [feeling, setFeeling] = useState('');

    // updates the reducer with the rating and prevents a null value and moves us to understanding
    const feelingFeedback = () => {
        if (feeling === '') {
            swal('Please choose a number between 1 and 5!', {icon: 'error'})
        } else {
            console.log('feeling data', feeling);
            dispatch({
                type: 'ADD_FEELING',
                payload: feeling
            })
            setFeeling('');
            history.push('/understanding');
        }
    }

    return (
        <div>
            <h1>How are you feeling today?</h1>
            <p>Feeling (1-5): </p>
            {feedbackHolder.feeling ? 
                <h5 className="lastRating">Your last rating: {feedbackHolder.feeling}</h5> 
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
                    value={Number(feeling)}
                    onChange={(event) => { setFeeling(event.target.value) }}
                    precision={1}
                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                />
            </Box>
            <Button 
                variant="contained" 
                style={{
                    backgroundColor: '#5fb8af', 
                    color: '#fff'
                }} 
                onClick={feelingFeedback}
            >
                Next
            </Button>
        </div>
    )
}

export default Feeling;