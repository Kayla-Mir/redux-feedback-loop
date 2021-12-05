import React, { useEffect } from "react";
import { useSelector } from 'react-redux';

import AdminItem from "../AdminItem/AdminItem";

function Admin({ getFeedbackFromDB }) {
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
                    {/* loops through the feedback thats stored in the history reducer */}
                    {feedbackHistory.map((feedback) => {
                        return <AdminItem key={feedback.id} getFeedbackFromDB={getFeedbackFromDB} feedback={feedback} />
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Admin;