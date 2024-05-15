import React from 'react';

const Footer = () => {
    return (
        <div className="py-6 px-6 d-flex justify-content-start align-items-center" style={{ width: '100%', backgroundColor: 'maroon', position: 'fixed', bottom: 0 }}>
            <img src="../assets/images/logos/logo.png" alt="LNU" width={25} style={{ marginRight: '5px' }} />
            <p className="mb-0 fs-4 text-white fw-bold">Lyceum-Northwestern University</p>
        </div>
    );
};

export default Footer;