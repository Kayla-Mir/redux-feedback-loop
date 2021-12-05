import axios from "axios";
import React, { useState } from "react";
import Button from '@material-ui/core/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import swal from 'sweetalert';

function AdminItem({ feedback, getFeedbackFromDB }) {
    // sends the feedback object prop to be deleted and calls the get function in app.jsx
    const deleteFeedback = () => {
        swal({
            title: "Are you sure?",
            text: "The feedback will be deleted!",
            icon: "warning",
            buttons: [true, "Confirm"]
        }).then((toDelete) => {
            if (toDelete) {
                swal("Your task has been deleted!", {
                    icon: "success"
                });
                axios({
                    method: 'DELETE',
                    url: '/feedback',
                    data: feedback
                }).then((res) => {
                    getFeedbackFromDB();
                }).catch((err) => {
                    console.error('error in DELETE /feedback', err);
                });
            } else {
                swal('The feedback was not deleted!');
            }
        });
    }

    // flags or unflags the feedback when the button is clicked
    const handleFlag = () => {
        console.log(feedback);
        axios({
            method: 'PUT',
            url: '/feedback',
            data: feedback
        }).then((res) => {
            feedback.flagged === false ?
                swal('Feedback was flagged for review!', { icon: 'success' }) 
                : 
                swal('Thank you for reviewing!', { icon: 'success' });
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