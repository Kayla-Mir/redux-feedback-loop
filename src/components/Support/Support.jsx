import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import Button from '@material-ui/core/Button';
import swal from 'sweetalert';

function Support() {
    const dispatch = useDispatch();
    const history = useHistory();
         
    // calls the feedback holder to display on the dom if they go back to this page
    const feedbackHolder = useSelector((store) => store.feedbackHolder);

    // sets a piece of state to send to the feedback holder to update the value
    const [support, setSupport] = useState('');

    // updates the reducer with the rating and prevents a null value and moves us to comments
    const supportFeedback = () => {
        if (support === '') {
            swal('Please choose a number between 1 and 5!', {icon: 'error'})
        } else {
            console.log('support data', support);
            dispatch({
                type: 'ADD_SUPPORT',
                payload: support
            })
            setSupport('');
            history.push('/comments');
        }
    }

    return (
        <div>
            <h1>How well are you being supported?</h1>
            <p>Support (1-5): </p>
            {feedbackHolder.support ?
                <h5 className="lastRating">Your last rating: {feedbackHolder.support}</h5>
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
                    value={Number(support)}
                    onChange={(event) => { setSupport(event.target.value) }}
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
                onClick={() => history.push('/understanding')}
            >
                Back
            </Button>
            <Button 
                variant="contained" 
                style={{
                    backgroundColor: '#5fb8af', 
                    color: '#fff'
                }} 
                onClick={supportFeedback}
            >
                Next
            </Button>
        </div>
    )
}

export default Support;