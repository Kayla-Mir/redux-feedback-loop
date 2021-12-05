import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function Comments() {
    const dispatch = useDispatch();
    const history = useHistory();

    const feedbackHolder = useSelector((store) => store.feedbackHolder);

    const [comments, setComments] = useState('');

    const commentsFeedback = () => {
        console.log('comments data', comments);
        dispatch({
            type: 'ADD_COMMENTS',
            payload: comments
        })
        setComments('');
        history.push('/review');
    }

    return (
        <div>
            <h1>Any comments you want to leave?</h1>
            <p>Comments: </p>
            <textarea
                id="commentInput"
                value={comments}
                placeholder={feedbackHolder.comments}
                onChange={(event) => { setComments(event.target.value) }}
                type="text"
            />
            <div>
                <button onClick={() => history.push('/support')}>Back</button>
                <button onClick={commentsFeedback}>Next</button>
            </div>
        </div>
    )
}

export default Comments;