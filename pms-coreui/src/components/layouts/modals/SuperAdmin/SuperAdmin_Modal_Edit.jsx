import React from 'react'
import { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { IconEdit } from "@tabler/icons-react"
import axios from 'axios';
import Swal from 'sweetalert2';

const SuperAdmin_Modal_Edit = (id) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);




    const [username, setusername] = useState('');
    const [email, setemail] = useState('');
    const [number, setnumber] = useState('');
    const [address, setaddress] = useState('');
    const [password, setpassword] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const handleShow = () => {
        setShow(true);



        axios.get('http://localhost:8080/admin/' + id.Editid).then(
            Response => {
                setusername(Response.data.username);
                setemail(Response.data.email);
                setnumber(Response.data.number);
                setaddress(Response.data.address);
                setpassword(Response.data.password);
            }
        ).catch((error) => {
            console.log(error);
        })


    };
    const UpdateData = async (e) => {
        e.preventDefault();
        if (!username) {
            return Swal.fire('Error', 'Please enter a username', 'error');
        }
        if (!email) {
            return Swal.fire('Error', 'Please enter an email', 'error');
        }
        if (!number) {
            return Swal.fire('Error', 'Please enter a number', 'error');
        }
        if (!address) {
            return Swal.fire('Error', 'Please enter an address', 'error');
        }
        if (!password) {
            return Swal.fire('Error', 'Please enter a password', 'error');
        }

        await axios.put('http://localhost:8080/admin/' + id.Editid, {
            username: username,
            email: email,
            number: number,
            address: address,
            password: password
        }).then(


            Swal.fire('Success', 'The Admin named ' + username + ' is added', 'success').then((result) => {
                if (result.isConfirmed) {
                    handleClose(); // Close the modal

                }
            })
        )
    }
    const [isInputEnabled, setIsInputEnabled] = useState(false);

    const handleButtonClick = () => {
        setIsInputEnabled(true);
        setpassword('');
    };



    return (
        <>
            <Button className="btn btn-light btn-warning btn-sm" onClick={handleShow}>
                <IconEdit style={{ color: 'orange' }} />
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size='lg'
            >
                <Modal.Header>
                    <Modal.Title>Edit Admin</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="form-horizontal r-separator" onSubmit={UpdateData}>
                        <div className="card-body m-3">
                            <h5>Personal Info</h5>
                            <div className="form-group mb-0">
                                <div className="row align-items-center">
                                    <label htmlFor="inputText1" className="col-3 text-end control-label col-form-label">Admin Name</label>
                                    <div className="col-9 border-start pb-2 pt-2">
                                        <input type="text"
                                            className="form-control"
                                            id="Username"
                                            placeholder="Admin Name Here"
                                            value={username}
                                            onChange={(e) => setusername(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group mb-0">
                                <div className="row align-items-center">
                                    <label htmlFor="inputText2" className="col-3 text-end control-label col-form-label">Email</label>
                                    <div className="col-9 border-start pb-2 pt-2">
                                        <input type="email"
                                            className="form-control"
                                            id="email"
                                            placeholder="Enter Email Here"
                                            value={email}
                                            onChange={(e) => setemail(e.target.value)} />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group mb-0">
                                <div className="row align-items-center">
                                    <label htmlFor="inputEmail1" className="col-3 text-end control-label col-form-label">Contact Num</label>
                                    <div className="col-9 border-start pb-2 pt-2">
                                        <input type="tel"
                                            className="form-control"
                                            id="number"
                                            placeholder="Enter Number Here : [0-9]{3}-[0-9]{3}-[0-9]{4}"
                                            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                            value={number}
                                            onChange={(e) => setnumber(e.target.value)} />
                                    </div>
                                </div>
                            </div>

                            <div className="form-group mb-0">
                                <div className="row align-items-center">
                                    <label htmlFor="inputText1" className="col-3 text-end control-label col-form-label">Address</label>
                                    <div className="col-9 border-start pb-2 pt-2">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="Address"
                                            placeholder="Address Here"
                                            value={address}
                                            onChange={(e) => setaddress(e.target.value)} />
                                    </div>
                                </div>
                            </div>

                            <div className="form-group mb-0">
                                <div className="row align-items-center">
                                    <label htmlFor="inputText2" className="col-3 text-end control-label col-form-label">Password</label>
                                    <div className="col-9 border-start pb-2 pt-2">
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            placeholder="Enter Password Here"
                                            value={password}
                                            onChange={(e) => setpassword(e.target.value)}
                                            disabled={!isInputEnabled}
                                        />
                                        <small className='text-muted'>
                                            Click <a type='button' onClick={handleButtonClick}> <b className='fw-bolder'> HERE </b> </a> to change the password
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="form-group m-3 text-end">
                                <button type="button" className="btn btn-gray rounded-pill px-4 ms-2" onClick={handleClose}>
                                    Cancel
                                </button>
                                <button className="btn btn-primary rounded-pill px-4">
                                    Save
                                </button>

                            </div>
                        </div>
                    </form>

                </Modal.Body>

            </Modal >
        </>)
}

export default SuperAdmin_Modal_Edit