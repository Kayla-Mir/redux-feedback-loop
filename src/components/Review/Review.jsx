import axios from "axios";
import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import Button from '@material-ui/core/Button';
import swal from 'sweetalert';

function Review() {
    const history = useHistory();

    // calls the feedback holder to display on the dom
    const feedbackHolder = useSelector((store) => store.feedbackHolder);

    // sets a piece of state to toggle editmode
    const [editMode, setEditMode] = useState(false);

    // new variable for sending data to the database
    const feedbackForDB = {
        feeling: feedbackHolder.feeling,
        understanding: feedbackHolder.understanding,
        support: feedbackHolder.support,
        comments: feedbackHolder.comments,
        flagged: false
    }

    // sends feedback on a POST route for the database and moves us to the success page
    const submitFeedback = () => {
        console.log('new feedback', feedbackForDB);
        axios({
            method: 'POST',
            url: '/feedback',
            data: feedbackForDB
        }).then((res) => {
            swal('Thank you for your review!', {icon: 'success'});
            history.push('/submissionSuccess');
        }).catch((err) => {
            console.error('error in POST /feedback', err)
        });
    }

    // toggles edit mode
    const handleEditMode = () => {
        setEditMode(!editMode);
    }

    // updates the feedbackHolder reducer with the new value, switch statement based on type assigned on the input
    const handleChange = (value, type) => {
        switch (type) {
            case 'feeling':
                return feedbackHolder.feeling = value;
            case 'understanding':
                return feedbackHolder.understanding = value;
            case 'support':
                return feedbackHolder.support = value;
            case 'comments':
                return feedbackHolder.comments = value;
        }
    }

    return (
        <div>
            <h2>Review Your Feedback</h2>
            {editMode === false ?
                <div>
                    <p>Feeling: {feedbackForDB.feeling}</p>
                    <p>Understanding: {feedbackHolder.understanding}</p>
                    <p>Support: {feedbackHolder.support}</p>
                    <p>Comments: {feedbackHolder.comments}</p>
                    <Button
                        variant="contained"
                        style={{
                            backgroundColor: 'grey',
                            color: '#fff',
                            marginBottom: 10,
                        }}
                        onClick={handleEditMode}
                    >
                        Edit
                    </Button>
                </div>
                :
                <div>
                    <>Your current feeling is: {feedbackHolder.feeling}</>
                    <Box
                        sx={{
                            display: 'flex',
                            alignSelf: 'center',
                            justifyContent: 'center',
                            paddingBottom: 2,
                        }}
                    >
                        <Rating
                            onChange={(event) => { handleChange(event.target.value, 'feeling') }}
                            precision={1}
                            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                        />
                    </Box><br />
                    <>Your current understanding is: {feedbackHolder.understanding}</>
                    <Box
                        sx={{
                            display: 'flex',
                            alignSelf: 'center',
                            justifyContent: 'center',
                            paddingBottom: 2,
                        }}
                    >
                        <Rating
                            onChange={(event) => { handleChange(event.target.value, 'understanding') }}
                            precision={1}
                            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                        />
                    </Box><br />
                    <>Your current level of support is: {feedbackHolder.support}</>
                    <Box
                        sx={{
                            display: 'flex',
                            alignSelf: 'center',
                            justifyContent: 'center',
                            paddingBottom: 2,
                        }}
                    >
                        <Rating
                            onChange={(event) => { handleChange(event.target.value, 'support') }}
                            precision={1}
                            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                        />
                    </Box><br />
                    <p id="reviewComments">Comments if any: </p>
                    <textarea
                        id="comments"
                        placeholder={feedbackHolder.comments}
                        onChange={(event) => handleChange(event.target.value, 'comments')}
                        type="text"
                    /><br />
                    <Button
                        variant="contained"
                        style={{
                            backgroundColor: 'grey',
                            color: '#fff',
                            marginBottom: 10,
                        }}
                        onClick={handleEditMode}
                    >
                        Save
                    </Button>
                </div>
            }
            <Button
                variant="contained"
                style={{
                    backgroundColor: '#5fb8af',
                    color: '#fff',
                }}
                onClick={submitFeedback}
            >
                Submit
            </Button>
        </div>
    )
}

export default Review;