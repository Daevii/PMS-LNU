import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconLogout, IconUser, IconMail } from '@tabler/icons-react';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

const Header = () => {
    const [session, setSession] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Retrieve session data from session storage when component mounts
        const storedSessionData = sessionStorage.getItem('session');
        if (storedSessionData) {
            const sessionData = JSON.parse(storedSessionData);
            // Update state with session data
            setSession(sessionData);
            setEmail(sessionData.email); // Assuming email is stored in sessionData
            setUsername(sessionData.username); // Assuming username is stored in sessionData
        }
    }, []); // Empty dependency array ensures this effect runs only once on mount

    const Logout = () => {
        // Clear session data from session storage
        sessionStorage.removeItem('session');
        navigate('/');
        Swal.fire('Success', 'Logout Successfully', 'success');
    }

    return (
        <header className="app-header bg-dark">
            {/* Your header content */}

            {session && (
                <nav className="navbar navbar-expand-lg navbar-light">
                    <h1 className="navbar-brand mb-0 text-white fw-bold" >Welcome {username}</h1>
                    <ul className="navbar-nav flex-row ms-auto align-items-center justify-content-end">

                        <li className="nav-item dropdown">
                            <a className="nav-link nav-icon-hover" href="javascript:void(0)" id="drop2" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src="../assets/images/profile/pic14.jpg" width={35} height={35} className="rounded-circle" />
                            </a>
                            <div className="dropdown-menu dropdown-menu-end dropdown-menu-animate-up" aria-labelledby="drop2">
                                <div className="message-body">
                                    <a className="d-flex align-items-center gap-2 dropdown-item">
                                        <IconUser />
                                        <p className="mb-0 fs-3">{username}</p>
                                    </a>
                                    <a className="d-flex align-items-center gap-2 dropdown-item">
                                        <IconMail />
                                        <p className="mb-0 fs-3">{email}</p>
                                    </a>

                                    <button className="btn btn-md justify-content-center mt-2 d-block w-100" onClick={Logout} style={{ color: 'maroon' }}> <IconLogout />Logout</button>
                                </div>
                            </div>
                        </li>
                    </ul>

                </nav>
            )}
        </header >
    );
}


export default Header