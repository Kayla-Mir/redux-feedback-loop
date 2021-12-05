import axios from "axios";
import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function Review() {
    const history = useHistory();

    const feedbackHolder = useSelector((store) => store.feedbackHolder);

    const [editMode, setEditMode] = useState(false);

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

    const handleEditMode = () => {
        setEditMode(!editMode);
    }

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
                    <button onClick={handleEditMode}>Edit</button>
                </div>
                :
                <div>
                    <label htmlFor="feeling">Feeling: </label>
                    <input
                        id="feeling"
                        placeholder={feedbackHolder.feeling}
                        onChange={(event) => handleChange(event.target.value, 'feeling')}
                        type="number"
                    /><br/>
                    <label htmlFor="understanding">Understanding: </label>
                    <input
                        id="understanding"
                        placeholder={feedbackHolder.understanding}
                        onChange={(event) => handleChange(event.target.value, 'understanding')}
                        type="number"
                    /><br/>
                    <label htmlFor="support">Support: </label>
                    <input
                        id="support"
                        placeholder={feedbackHolder.support}
                        onChange={(event) => handleChange(event.target.value, 'support')}
                        type="number"
                    /><br/>
                    <label htmlFor="comments">Comments: </label>
                    <input
                        id="comments"
                        placeholder={feedbackHolder.comments}
                        onChange={(event) => handleChange(event.target.value, 'comments')}
                        type="text"
                    /><br/>
                    <button onClick={handleEditMode}>Save</button>
                </div>
            }
            <button onClick={submitFeedback}>Submit</button>
        </div>
    )
}

export default Review;