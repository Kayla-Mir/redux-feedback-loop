import {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function Support() {
    const dispatch = useDispatch();
    const history = useHistory();

    const feedbackHolder = useSelector((store) => store.feedbackHolder);

    const [support, setSupport] = useState('');

    const supportFeedback = () => {
        if (support >= 6 || support === ''){
            alert('Please choose a number between 1 and 5!')
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
            <label htmlFor="support">Support (1-5): </label>
            <input
                id="support"
                value={support}
                placeholder={feedbackHolder.support}
                onChange={(event) => {setSupport(event.target.value)}}
                type="number"
            />
            <button onClick={() => history.push('/understanding')}>Back</button>
            <button onClick={supportFeedback}>Next</button>
        </div>
    )
}

export default Support;