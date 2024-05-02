import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from "jwt-decode";
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify';

import './Login.scss'

import commonService from '../../Services/commonService.js';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [inputLogin, setInputLogin] = useState({
        username: '',
        password: ''
    })

    const [error, setError] = useState(null)

    const handleLogin = async (event) => {
        event.preventDefault();

        if (!inputLogin.username || !inputLogin.password) {
            toast.error('Missing username/ password');
            return;
        }

        try {
            let results = await commonService.loginService(inputLogin);

            if (results && results.status === 200) {
                let token = results.data.data.access_token;
                let decodedToken = jwtDecode(token);

                if (decodedToken.role === "admin") {
                    navigate('/dashboard');
                } else {
                    navigate(`/employeeDetail/${decodedToken._id}`);
                }

                dispatch({
                    type: 'LOGIN_SUCCESS',
                    payload: decodedToken
                })

                localStorage.setItem("access_token", token);
            }
        } catch (error) {
            let errorMS = error.response ? error.response.data.message : 'An error occurred';
            setError(errorMS);
        }
    }
    return (
        <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
            <div className='p-3 w-25 border rounded loginForm'>
                <div className='text-warning'>{error && error}</div>
                <h2>Login Page</h2>
                <form onSubmit={(event) => handleLogin(event)}>
                    <div className="form-group mb-2">
                        <label htmlFor="username"><strong>Username: </strong></label>
                        <input type="text" className="form-control" id="username"
                            placeholder="Username" autoComplete='on' required
                            onChange={(event) => setInputLogin({ ...inputLogin, username: event.target.value })}
                        ></input>
                    </div>
                    <div className="form-group mb-2">
                        <label htmlFor="password">Password: </label>
                        <input type="password" className="form-control" id="password"
                            placeholder="Password" autoComplete='on' required
                            onChange={(event) => setInputLogin({ ...inputLogin, password: event.target.value })}
                        ></input>
                    </div>
                    <div className="mb-1">
                        <input type="checkbox" className="me-2" id="checkbox"></input>
                        <label htmlFor="checkbox">You are Agree with terms & Conditions</label>
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
