import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


import React from 'react'


import axios from 'axios';
import Swal from 'sweetalert2';

import { IconCirclePlus } from "@tabler/icons-react"



export const Position_Modal_Add = (data) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
    };


    const [position, setposition] = useState('');

    const SaveData = async (e) => {
        e.preventDefault();

        switch (position) {
            case '': return Swal.fire('Error', 'Please enter a position name', 'error');
            default: await axios.post("http://localhost:8080/position/", {
                position: position
            });

                // Show success message with SweetAlert
                Swal.fire('Success', 'The position named ' + position + ' is added', 'success').then((result) => {
                    if (result.isConfirmed) {
                        handleClose(); // Close the modal
                        //remove the value input field
                        setposition('');
                    }
                });
        }

    };
    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                <IconCirclePlus />Add
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size='lg'
            >
                <Modal.Header>
                    <Modal.Title>Add Position</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="form-horizontal r-separator" onSubmit={SaveData}>
                        <div className="card-body m-3">
                            <h5>Position Info</h5>
                            <div className="form-group mb-0">
                                <div className="row align-items-center">
                                    <label htmlFor="inputText1" className="col-3 text-end control-label col-form-label">Position</label>
                                    <div className="col-9 border-start pb-2 pt-2">

                                        <input
                                            type="text"
                                            className="form-control"
                                            value={position}
                                            placeholder="Enter position Name Here"
                                            id='position'
                                            onChange={(e) => setposition(e.target.value)}

                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="form-group mb-0 text-end">
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
        </>
    )
}

export default Position_Modal_Add;


