import axios from "axios";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import AdminItem from "../AdminItem/AdminItem";

function Admin({getFeedbackFromDB}) {
    const feedbackHistory = useSelector((store) => store.feedbackHistoryReducer);

    const history = useHistory();

    useEffect(() => {
        getFeedbackFromDB();
      }, [])

    // BEANS WASNT THERE
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Feeling</th>
                        <th>Comprehension</th>
                        <th>Support</th>
                        <th>Comments</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {feedbackHistory.map((feedback) => {
                        return <AdminItem key={feedback.id} getFeedbackFromDB={getFeedbackFromDB} feedback={feedback} />
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Admin;