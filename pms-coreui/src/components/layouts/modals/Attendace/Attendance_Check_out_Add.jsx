import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import { IconClockX } from "@tabler/icons-react"

export const Attendance_Check_out_Add = (id) => {
    const [show, setShow] = useState(false);


    const [date, setDate] = useState('');
    const [checkout, setCheckout] = useState('');
    const [check_in, setCheck_in] = useState('');
    const [employee_name, setEmployee_name] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => {
        console.log(id.Checkoutid)
        setShow(true);
        axios.get('http://localhost:8080/attendance/' + id.Checkoutid).then(
            Response => {
                setDate(Response.data.date);
                setEmployee_name(Response.data.employee_id);
                setCheck_in(Response.data.check_in);
            }
        ).catch((error) => {
            console.log(error);
        });



    };




    const SaveData = async (e) => {
        e.preventDefault();


        if (checkout === '') {
            return Swal.fire('Error', 'Please enter a check out time', 'error');
        } else {
            await axios.put("http://localhost:8080/attendance/" + id.Checkoutid, {
                date: date,
                check_in: check_in,
                employee_id: employee_name,
                check_out: checkout + ':00'
            }).then(
                Swal.fire('Success', 'The Employee named ' + employee_name + ' is check out', 'success').then((result) => {
                    if (result.isConfirmed) {
                        setCheckout('');
                        handleClose();
                    }
                })
            );
        }

    }

    return (
        <>
            <Button className="btn btn-light btn-danger btn-sm" onClick={handleShow}>
                <IconClockX style={{ color: 'green' }} />
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size='lg'
            >
                <Modal.Header>
                    <Modal.Title>Employee Check Out</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="form-horizontal r-separator" onSubmit={SaveData}>
                        <div className="card-body">
                            <h5>Employee Info</h5>
                            <div className="form-group mb-0">
                                <div className="row align-items-center">
                                    <label htmlFor="inputText1" className="col-3 text-end control-label col-form-label">Employee Name</label>
                                    <div className="col-9 border-start pb-2 pt-2">
                                        <input type="text"
                                            className="form-control"
                                            id="employee_name"
                                            placeholder="Enter Employee Name Here"
                                            value={employee_name}
                                            onChange={(e) => setEmployee_name(e.target.value)}
                                            disabled
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-body mt-5">
                            <h5>Attendance</h5>
                            <div className="form-group mb-0">
                                <div className="row align-items-center">
                                    <label htmlFor="inputText1" className="col-3 text-end control-label col-form-label">Date</label>
                                    <div className="col-9 border-start pb-2 pt-2">
                                        <input type="date"
                                            className="form-control"
                                            id="inputText1"
                                            placeholder="Enter Employee Name Here"
                                            value={date}
                                            onChange={(e) => setdate(e.target.value)}
                                            disabled
                                        />
                                    </div>
                                </div>

                            </div>
                            <div className="form-group mb-0">
                                <div className="row align-items-center">
                                    <label htmlFor="inputText1" className="col-3 text-end control-label col-form-label">Check Out Time</label>
                                    <div className="col-9 border-start pb-2 pt-2">
                                        <input type="time"
                                            className="form-control"
                                            id="inputText1"
                                            placeholder="Enter Employee Name Here"
                                            value={checkout}
                                            onChange={(e) => setCheckout(e.target.value)}
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

export default Attendance_Check_out_Add