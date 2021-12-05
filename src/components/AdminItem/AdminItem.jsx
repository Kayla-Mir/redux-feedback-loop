import axios from "axios";
import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

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

    return (
        <tr>
            <td>{feedback.feeling}</td>
            <td>{feedback.understanding}</td>
            <td>{feedback.support}</td>
            <td>{feedback.comments}</td>
            <td><button onClick={deleteFeedback}>DELETE</button></td>
        </tr>
    )
}

export default AdminItem;