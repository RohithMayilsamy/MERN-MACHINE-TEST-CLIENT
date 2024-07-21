import React, { useState } from 'react';
import adminService from './Services/adminservices'; // Update this path as needed
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginStatus, setLoginStatus] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await adminService.login(username, password);
            if (response.data) {
                setLoginStatus('Login successful!');
                // Redirect to another page if needed
                navigate('/admin'); // Update the route as needed
            }
        } catch (error) {
            setLoginStatus('Invalid username or password');
        }
    };

    return (
        <div className="container mt-5 border">
            <div className="row">
                <p className="login-title" style={{ backgroundColor: 'yellow' }}>Login Page</p>
                <div className="row">
                    <div className="col-4">
                        <label htmlFor="username">User Name</label>
                    </div>
                    <div className="col-8">
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-4">
                        <label htmlFor="password">Password</label>
                    </div>
                    <div className="col-8">
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-4"></div>
                    <div className="col-1" style={{ backgroundColor: '#B1FA2E' }}>
                        <button className="btn" onClick={handleLogin}>Login</button>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-12">
                        <div>{loginStatus}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
