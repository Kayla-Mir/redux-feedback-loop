import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';

function SubmissionSuccess({ getFeedbackFromDB }) {
    const dispatch = useDispatch();
    const history = useHistory();

    // button that sends you back to the state page and resets the holding reducer
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
            <Button
                variant="contained"
                style={{
                    backgroundColor: '#5fb8af',
                    color: '#fff',
                }}
                size="small"
                onClick={backToTheBeginning}
            >
                New Feedback
            </Button>
        </div>
    )
}

export default SubmissionSuccess;