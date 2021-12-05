import {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function Understanding() {
    const dispatch = useDispatch();
    const history = useHistory();

    const feedbackHolder = useSelector((store) => store.feedbackHolder);

    const [understanding, setUnderstanding] = useState('');

    const understandingFeedback = () => {
        if (understanding >= 6 || understanding === ''){
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
            <label htmlFor="understanding">Understanding (1-5): </label>
            <input
                id="understanding"
                value={understanding}
                placeholder={feedbackHolder.understanding}
                onChange={(event) => {setUnderstanding(event.target.value)}}
                type="number"
            />
            <button onClick={() => history.push('/feeling')}>Back</button>
            <button onClick={understandingFeedback}>Next</button>
        </div>
    )
}

export default Understanding;
