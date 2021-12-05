import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function SubmissionSuccess({getFeedbackFromDB}) {
    const dispatch = useDispatch();
    const history = useHistory();

    const backToTheBeginning = () => {
        dispatch({
            type: 'RESET_STATE',
        });
        history.push('/');
    }
    
    return (
        <div>
            <h1>SUCCESS</h1>
            <h3>Thank you for leaving feedback!</h3>
            <button onClick={backToTheBeginning}>Leave New Feedback</button>
        </div>
    )
}

export default SubmissionSuccess;