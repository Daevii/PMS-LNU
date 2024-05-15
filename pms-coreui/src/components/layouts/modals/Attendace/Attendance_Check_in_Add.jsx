import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import { IconCirclePlus } from "@tabler/icons-react"

export const Attendance_Check_in_Add = (data) => {
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
                    <Modal.Title>Add Attendance</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="form-horizontal r-separator">
                        <div className="card-body">
                            <h5>Employee Info</h5>
                            <div className="form-group mb-0">
                                <div className="row align-items-center">
                                    <label htmlFor="inputText1" className="col-3 text-end control-label col-form-label">Employee Name</label>
                                    <div className="col-9 border-start pb-2 pt-2">
                                        <input type="text" className="form-control" id="inputText1" placeholder="Enter Employee Name Here" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-body text-bg-light">
                            <h4 className="card-title mt-2 pb-3">Attendance</h4>
                            <div className="form-group mb-0">
                                <div className="row align-items-center">
                                    <label htmlFor="inputText1" className="col-3 text-end control-label col-form-label">Date</label>
                                    <div className="col-9 border-start pb-2 pt-2">
                                        <input type="date" className="form-control" id="inputText1" placeholder="Enter Employee Name Here" />
                                    </div>
                                </div>

                            </div>
                            <div className="form-group mb-0">
                                <div className="row align-items-center">
                                    <label htmlFor="inputText1" className="col-3 text-end control-label col-form-label">Clock In Time</label>
                                    <div className="col-9 border-start pb-2 pt-2">
                                        <input type="time" className="form-control" id="inputText1" placeholder="Enter Employee Name Here" />
                                    </div>
                                </div>

                            </div>
                            <div className="form-group mb-0">
                                <div className="row align-items-center">
                                    <label htmlFor="inputText1" className="col-3 text-end control-label col-form-label">Clock Out Time</label>
                                    <div className="col-9 border-start pb-2 pt-2">
                                        <input type="time" className="form-control" id="inputText1" placeholder="Enter Employee Name Here" />
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="card-body">
                            <div className="form-group mb-0 text-end">
                                <button type="submit" className="btn btn-primary rounded-pill px-4">
                                    Save
                                </button>
                                <button type="submit" className="btn bg-danger-subtle text-danger rounded-pill px-4 ms-6">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </form>
                </Modal.Body>

            </Modal >
        </>
    )
}

export default Attendance_Check_in_Add