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
            {feedbackHistory.map((feedback) => {
                return <AdminItem key={feedback.id} feedback={feedback} />
            })}
            </table>
        </div>
    )
}

export default Admin;