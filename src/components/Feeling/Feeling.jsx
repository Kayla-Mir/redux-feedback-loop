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

    const feedbackHolder = useSelector((store) => store.feedbackHolder);

    const [feeling, setFeeling] = useState('');

    const feelingFeedback = () => {
        if (feeling >= 6 || feeling === '') {
            alert('Please choose a number between 1 and 5!')
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
            {/* <input
                id="feeling"
                value={feeling}
                placeholder={feedbackHolder.feeling}
                onChange={(event) => { setFeeling(event.target.value) }}
                type="number"
            /> */}
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