import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

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
            <label htmlFor="feeling">Feeling (1-5): </label>
            <input
                id="feeling"
                value={feeling}
                placeholder={feedbackHolder.feeling}
                onChange={(event) => { setFeeling(event.target.value) }}
                type="number"
            />
            <button onClick={feelingFeedback}>Next</button>
        </div>
    )
}

export default Feeling;