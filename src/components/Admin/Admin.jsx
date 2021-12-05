import React, { useEffect } from "react";
import { useSelector  } from 'react-redux';
import Button from '@material-ui/core/Button';

import AdminItem from "../AdminItem/AdminItem";

function Admin({getFeedbackFromDB}) {
    const feedbackHistory = useSelector((store) => store.feedbackHistoryReducer);

    useEffect(() => {
        getFeedbackFromDB();
      }, [])

    return (
        <div id="tableArea">
            <table>
                <thead>
                    <tr>
                        <th>Feeling</th>
                        <th>Comprehension</th>
                        <th>Support</th>
                        <th>Comments</th>
                        <th>Flag</th>
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