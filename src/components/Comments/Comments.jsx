import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import swal from 'sweetalert';

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
                <Button
                    variant="contained"
                    style={{
                        backgroundColor: 'grey',
                        color: '#fff',
                        marginRight: 30
                    }}
                    onClick={() => history.push('/support')}
                >
                    Back
                </Button>
                <Button
                    variant="contained"
                    style={{
                        backgroundColor: '#5fb8af',
                        color: '#fff'
                    }}
                    onClick={commentsFeedback}
                >
                    Next
                </Button>
            </div>
        </div>
    )
}

export default Comments;