import axios from "axios";
import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function Review() {
    const history = useHistory();

    const feedbackHolder = useSelector((store) => store.feedbackHolder);

    const feedbackForDB = {
        feeling: feedbackHolder.feeling,
        understanding: feedbackHolder.understanding,
        support: feedbackHolder.support,
        comments: feedbackHolder.comments,
        flagged: false
    }

    const submitFeedback = () => {
        console.log('feedback', feedbackHolder);
        console.log('new feedback', feedbackForDB);
        axios({
            method: 'POST',
            url: '/feedback',
            data: feedbackForDB
        }).then((res) => {
            history.push('/submissionSuccess')
        }).catch((err) => {
            console.error('error in POST /feedback', err)
        });
    }

    return (
        <div>
            <h2>Review Your Feedback</h2>
            <div>
                <p>Feelings: {feedbackHolder.feeling}</p>
                <p>Understanding: {feedbackHolder.understanding}</p>
                <p>Support: {feedbackHolder.support}</p>
                <p>Comments: {feedbackHolder.comments}</p>
            </div>
            <button onClick={submitFeedback}>Submit</button>
        </div>
    )
}

export default Review;