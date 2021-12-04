import axios from "axios";
import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import AdminItem from "../AdminItem/AdminItem";

function Admin() {
    const feedbackHistory = useSelector((store) => store.feedbackHistoryReducer);

    const history = useHistory();

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
                        return <AdminItem key={feedback.id} feedback={feedback} />
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Admin;