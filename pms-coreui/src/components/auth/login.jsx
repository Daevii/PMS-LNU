import React, { useState } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import { IconLogin } from '@tabler/icons-react';
import Swal from 'sweetalert2';

function login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post('http://localhost:8080/api/auth/', {
            username: username,
            password: password
        }).then(
            Swal.fire('Loging in please wait',)
        );
        if (response.data.session) {
            //store the session in session storage
            const sessionData = JSON.stringify(response.data.session);
            sessionStorage.setItem('session', sessionData);
            //pass the response data to the dashboard
            navigate('/dashboard');
            Swal.fire('Success', 'Welcome ' + username, 'success');
            console.log(sessionData);

        } else {
            Swal.fire('Error', 'Invalid username or password', 'error');
            console.log(response.data.session);
        }
    };

    return (
        <>
            <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full" data-sidebar-position="fixed" data-header-position="fixed">
                <div className="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
                    <div className="d-flex align-items-center justify-content-center w-100">
                        <div className="row justify-content-center w-100">
                            <div className="col-md-8 col-lg-6 col-xxl-3">
                                <div className="card mb-0">
                                    <div className="card-body background-dark">
                                        <a href="javascript:void(0)" onclick="location.reload()" className="text-nowrap logo-img text-center d-block py-3 w-100">
                                            <img src="../assets/images/backgrounds/lnuhead1 (1).png" className="img-fluid" alt="Lyceum-Northwestern University" />
                                        </a>
                                        <form onSubmit={handleSubmit} >
                                            <div className="mb-3">
                                                <label htmlFor="username" className="form-label">Username</label>
                                                <input type="text"
                                                    placeholder="Username"
                                                    className="form-control"
                                                    value={username}
                                                    onChange={(e) => setUsername(e.target.value)} />

                                            </div>
                                            <div className="mb-4">
                                                <label htmlFor="" className="form-label">Password</label>
                                                <input type="password"
                                                    className="form-control"
                                                    placeholder='Password'
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)} />
                                            </div>
                                            <button type="submit" className="btn btn-primary w-100"><IconLogin />Submit</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>


    )
}

export default login