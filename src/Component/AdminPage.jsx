import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import '../border.css';

const AdminPage = () => {
   

    return (
        <div>
            <div className="one mt-5">
                <div className="two">
                    <div className="three">
                        <Link to="/" className="btn">Home</Link>
                    </div>
                    <div className="four">
                        <Link to="/EmployeeList" className="btn">Employee List</Link>
                    </div>
                    <div className="five">
                        <Link to="/" className="btn">Log Out</Link>
                    </div>
                </div>
                <div className="oneone"></div>
                <div className="text-center mt-5">Welcome to Admin Panel</div>
            </div>
        </div>
    );
};

export default AdminPage;
