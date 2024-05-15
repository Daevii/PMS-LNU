import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import { IconCirclePlus } from "@tabler/icons-react"

export const Department_Modal_Add = (data) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
    };
    const [department, setDepartment] = useState('');
    const SaveData = async (e) => {
        e.preventDefault();

        switch (department) {
            case '': return Swal.fire('Error', 'Please enter a department name', 'error');
            default: const response = await axios.post("http://localhost:8080/department/", {
                department: department
            });
                if (response.data.error === true) {
                    return Swal.fire('Error', 'Department Already Exist', 'error').then((result) => {
                        setDepartment('');
                        setShow(false)
                    });

                } else {
                    return Swal.fire('Success', 'Department Added', 'success').then((result) => {
                        setDepartment('');
                        setShow(false)
                    });

                }
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
                    <Modal.Title>Add Department</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="form-horizontal r-separator" onSubmit={SaveData}>
                        <div className="card-body m-3">
                            <h5>Department Info</h5>
                            <div className="form-group mb-0">
                                <div className="row align-items-center">
                                    <label htmlFor="inputText1" className="col-3 text-end control-label col-form-label">Department</label>
                                    <div className="col-9 border-start pb-2 pt-2">

                                        <input
                                            type="text"
                                            className="form-control"
                                            value={department}
                                            placeholder="Enter Department Name Here"
                                            id='department'
                                            onChange={(e) => setDepartment(e.target.value)}

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

export default Department_Modal_Add;


