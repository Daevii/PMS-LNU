import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { IconReport } from "@tabler/icons-react"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
const Payroll_Reports_Content_Show = (report_content) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {

        setShow(true);



    };

    const ReportContent = report_content.ReportContent;
    const ReportName = report_content.ReportName;

    return (

        <>
            <Button className="btn btn-light btn-warning btn-sm" onClick={handleShow}> <IconReport style={{ color: 'blue' }} /></Button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size='lg'
            >

                <Modal.Header>
                    <Modal.Title>Report  Content</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="card-body">
                        <div className="card-body m-3">
                            <div className="row mb-4">
                                <div className="col-md-12 mb-3">
                                    <div className="note-title">
                                        <label className="form-label">Report Name</label>
                                        <input type="text" id="note-has-title" className="form-control" minLength={25} placeholder="Title" disabled readOnly value={ReportName} />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="note-description">
                                        <label className="form-label">Report Content</label>
                                        <textarea id="note-has-description" className="form-control" minLength={60} placeholder="Description" rows={3} value={ReportContent} disabled />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group mb-0 mt-3 text-end">
                                <button type="button" className="btn btn-secondary rounded-pill px-4 ms-2" onClick={handleClose}>
                                    Cancel
                                </button>
                            </div>
                        </div>

                    </div>
                </Modal.Body>
            </Modal >
        </>
    )
}

export default Payroll_Reports_Content_Show