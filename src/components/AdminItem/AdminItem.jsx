import axios from "axios";
import React, { useState } from "react";

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
            <td>{feedback.flagged === false ? <button onClick={handleFlag}>Flag for Review</button> : <button onClick={handleFlag}>Reviewed</button>}</td>
            <td><button onClick={deleteFeedback}>DELETE</button></td>
        </tr>
    )
}

export default AdminItem;