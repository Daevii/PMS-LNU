import React, { useState, useEffect } from 'react'
import axios from "axios";

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';
import { IconEdit } from '@tabler/icons-react';

const Department_Modal_Edit = (id) => {

    const [show, setShow] = useState(false);

    const [department, setDepartment] = useState('');



    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
        console.log(id.Editid)
        axios.get('http://localhost:8080/department/' + id.Editid).then(
            Response => {
                setDepartment(Response.data.department);
            }
        ).catch((error) => {
            console.log(error);
        });

    };


    const UpdateData = async (e) => {
        e.preventDefault();

        const response = await axios.put("http://localhost:8080/department/" + id.Editid, {
            department: department
        })

        if (response.data.error === true) {
            return Swal.fire('Error', 'Department Already Exist', 'error').then((result) => {
                setDepartment('');
                setShow(false)
            })

        } else {
            return Swal.fire('Success', 'Department Updated', 'success').then((result) => {
                setDepartment('');
                setShow(false)
            })
        }
    }



    return (
        <>
            <Button className="btn btn-light btn-warning btn-sm" onClick={handleShow} >
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
                    <Modal.Title>Edit Department</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="form-horizontal r-separator" onSubmit={UpdateData} >
                        <div className="card-body">
                            <h5>Department Info</h5>
                            <div className="card-body m-3">
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
                                            required
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

export default Department_Modal_Edit;