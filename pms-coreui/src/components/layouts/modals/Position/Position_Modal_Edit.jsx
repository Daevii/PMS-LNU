import React, { useState } from 'react'
import axios from "axios";

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';
import { IconEdit } from '@tabler/icons-react';

const Position_Modal_Edit = (id) => {

    const [show, setShow] = useState(false);

    const [position, setposition] = useState('');



    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
        console.log(id.Editid)
        axios.get('http://localhost:8080/position/' + id.Editid).then(
            Response => {
                setposition(Response.data.position);
            }
        ).catch((error) => {
            console.log(error);
        });

    };


    const UpdateData = async (e) => {
        e.preventDefault();

        switch (position) {
            case '': return Swal.fire('Error', 'Please enter a position name', 'error');
            default: await axios.put("http://localhost:8080/position/" + id.Editid, {
                position: position
            }).then(
                Swal.fire('Success', 'The position named ' + position + ' is updated', 'success').then((result) => {
                    handleClose();
                })
            )
        }

    };



    return (
        <>
            <Button className="btn btn-light btn-danger btn-sm" onClick={handleShow} >
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
                    <Modal.Title>Edit position</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="form-horizontal r-separator" onSubmit={UpdateData} >
                        <div className="card-body m-3">
                            <h5>Position Info</h5>
                            <div className="form-group mb-0">
                                <div className="row align-items-center">
                                    <label htmlFor="inputText1" className="col-3 text-end control-label col-form-label">position</label>
                                    <div className="col-9 border-start pb-2 pt-2">

                                        <input
                                            type="text"
                                            className="form-control"
                                            value={position}
                                            placeholder="Enter position Name Here"
                                            id='position'
                                            onChange={(e) => setposition(e.target.value)}
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

export default Position_Modal_Edit;