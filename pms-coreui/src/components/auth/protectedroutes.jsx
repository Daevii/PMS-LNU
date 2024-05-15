// Import necessary dependencies
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoutes = () => {
    const navigate = useNavigate();
    const [timer, setTimer] = useState(5);

    useEffect(() => {
        const countdown = setInterval(() => {
            setTimer((prevTimer) => prevTimer - 1);
        }, 1000);

        setTimeout(() => {
            clearInterval(countdown);
            navigate('/');
        }, 5000);

        return () => clearInterval(countdown);
    }, [navigate]);

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="text-center">
                <h1 className="display-1">RESTRICTED</h1>
                <h2>Unable to Access This</h2>
                <div className="mt-5">
                    <p>Redirecting... to login page in {timer}</p>
                </div>
            </div>
        </div>
    );
}

export default ProtectedRoutes;