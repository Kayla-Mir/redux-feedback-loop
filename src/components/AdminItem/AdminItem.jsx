import axios from "axios";
import React, { useState } from "react";
import Button from '@material-ui/core/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import swal from 'sweetalert';

function AdminItem({ feedback, getFeedbackFromDB }) {

    const deleteFeedback = () => {
        const confirm = window.confirm('Are you sure you want to delete feedback?');
        if (confirm == true) {
            axios({
                method: 'DELETE',
                url: '/feedback',
                data: feedback
            }).then((res) => {
                alert('Feedback was deleted!')
                getFeedbackFromDB();
            }).catch((err) => {
                console.error('error in DELETE /feedback', err)
            });
        } else {
            alert('The feedback was not deleted!')
        }
    }

    const handleFlag = () => {
        console.log(feedback);
        axios({
            method: 'PUT',
            url: '/feedback',
            data: feedback
        }).then((res) => {
            feedback.flagged === false ?
                alert('Feedback was flagged for review!') : alert('Thank you for reviewing!')
            getFeedbackFromDB();
        }).catch((res) => {
            console.error('error in PUT /feedback', err);
        })
    }

    return (
        <tr>
            <td>{feedback.feeling}</td>
            <td>{feedback.understanding}</td>
            <td>{feedback.support}</td>
            <td>{feedback.comments}</td>
            <td>
                {feedback.flagged === false ?
                    <Button
                        size="small"
                        variant="contained"
                        style={{
                            backgroundColor: '#5fb8af',
                            color: '#fff',
                        }}
                        onClick={handleFlag}
                    >
                        Flag for Review
                    </Button>
                    :
                    <Button
                        size="small"
                        variant="contained"
                        style={{
                            backgroundColor: '#499ed6',
                            color: '#fff',
                        }}
                        onClick={handleFlag}
                    >
                        Reviewed
                    </Button>
                }
            </td>
            <td>
                <IconButton size="medium">
                    <DeleteIcon style={{ color: '#e65555' }} fontSize="inherit" onClick={deleteFeedback} />
                </IconButton>
            </td>
        </tr>
    )
}

export default AdminItem;