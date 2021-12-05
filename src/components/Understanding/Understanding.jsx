import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';

function Understanding() {
    const dispatch = useDispatch();
    const history = useHistory();

    const feedbackHolder = useSelector((store) => store.feedbackHolder);

    const [understanding, setUnderstanding] = useState('');

    const understandingFeedback = () => {
        if (understanding >= 6 || understanding === '') {
            alert('Please choose a number between 1 and 5!')
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
            {/* <input
                id="understanding"
                value={understanding}
                placeholder={feedbackHolder.understanding}
                onChange={(event) => { setUnderstanding(event.target.value) }}
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
                    value={Number(understanding)}
                    onChange={(event) => { setUnderstanding(event.target.value) }}
                    precision={1}
                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                />
            </Box>
            <button onClick={() => history.push('/feeling')}>Back</button>
            <button onClick={understandingFeedback}>Next</button>
        </div>
    )
}

export default Understanding;
