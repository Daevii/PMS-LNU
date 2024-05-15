import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { IconCirclePlus } from "@tabler/icons-react"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const Payroll_Reports_Modal_Add = () => {
    const [ReportName, setReportName] = useState('');
    const [ReportType, setReportType] = useState('');
    const [ReportPeriod, setReportPeriod] = useState('');
    const [GenereatedBy, setGenereatedBy] = useState('');
    const [ReportContent, setReportContent] = useState('');

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true)
        const getsessionData = async () => {
            const session = JSON.parse(sessionStorage.getItem('session'));
            setGenereatedBy(session.username);
        }
        getsessionData();
    };

    const SaveData = async (e) => {
        e.preventDefault();

        if (!ReportName) {
            return Swal.fire('Error', 'Please enter a report name', 'error');
        }
        if (!ReportType) {
            return Swal.fire('Error', 'Please enter a report type', 'error');
        }
        if (!ReportPeriod) {
            return Swal.fire('Error', 'Please enter a report period', 'error');
        }
        if (!ReportContent) {
            return Swal.fire('Error', 'Please enter a report content', 'error');
        }

        const response = await axios.post("http://localhost:8080/payrollreport/", {
            report_name: ReportName,
            report_type: ReportType,
            report_period: ReportPeriod,
            genereated_by: GenereatedBy,
            report_content: ReportContent
        }).then(
            Swal.fire('Loading Please Wait', '', 'info')
        );

        console.log(response.status);
        if (response.status === 201) {
            Swal.fire('Success', 'The Payroll Report is added', 'success').then((result) => {
                if (result.isConfirmed) {
                    handleClose();
                    setReportName('');
                    setReportType('');
                    setReportPeriod('');
                    setReportContent('');
                }
            });
        }
    }
    const handleCurrentDate = () => {
        const currentDate = new Date().toISOString().split('T')[0];
        setReportPeriod(currentDate);
    };




    return (
        <>
            <Button variant="primary" onClick={handleShow}><IconCirclePlus />Add</Button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size='lg'
            >
                <Modal.Header>
                    <Modal.Title>Add Payroll Report</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="form-horizontal r-separator" onSubmit={SaveData}>
                        <div className="card-body">
                            <h5>Report Info</h5>
                            <div className="form-group mb-0">
                                <div className="row align-items-center">
                                    <label htmlFor="inputText1" className="col-3 text-end control-label col-form-label">Report Name</label>
                                    <div className="col-9 border-start pb-2 pt-2">
                                        <input type="text" className="form-control" placeholder="Report Name Here" value={ReportName} onChange={(e) => setReportName(e.target.value)} />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group mb-0">
                                <div className="row align-items-center">
                                    <label htmlFor="inputSelect1" className="col-3 text-end control-label col-form-label">Report Type</label>
                                    <div className="col-9 border-start pb-2 pt-2">
                                        <select className="form-select" value={ReportType} onChange={(e) => setReportType(e.target.value)}>
                                            <option value="">Choose Your Option</option>
                                            <option value="Summary">Summary</option>
                                            <option value="Detailed">Detailed</option>
                                            <option value="Tax Report">Tax Report</option>
                                            <option value="Complaints">Complaints</option>
                                            <option value="Other">Others</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group mb-0">
                                <div className="row align-items-center">
                                    <label htmlFor="inputEmail1" className="col-3 text-end control-label col-form-label">Report Period</label>
                                    <div className="col-7 border-start pb-2 pt-2">
                                        <input type="date" className="form-control" placeholder="Email Here"
                                            value={ReportPeriod} onChange={(e) => setReportPeriod(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-2 pb-2 pt-2">
                                        <button type="button" className="btn btn-dark btn-sm text-xs pb-2 pt-2" onClick={handleCurrentDate}>Current Date</button>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group mb-0">
                                <div className="row align-items-center">
                                    <label htmlFor="inputText1" className="col-3 text-end control-label col-form-label">Generated By</label>
                                    <div className="col-9 border-start pb-2 pt-2">
                                        <input type="text"
                                            className="form-control"
                                            placeholder="Generated Name Here"
                                            value={GenereatedBy}
                                            disabled
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="card-body text-bg-light">
                            <h4 className="card-title mt-2 pb-3">Report Content</h4>
                            <div className="form-group mb-0">
                                <div className="row align-items-center">
                                    <div className="col-12 border-start pb-2 pt-2">
                                        <textarea className="form-control" rows="4" placeholder="Text Here..." value={ReportContent} onChange={(e) => setReportContent(e.target.value)}></textarea>
                                        <small id="textHelp" className="form-text text-muted">Report Content</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-body m-3">
                            <div className="form-group mb-0 text-end">
                                <button type="button" className="btn btn-gray rounded-pill px-4 ms-2" onClick={handleClose}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary rounded-pill px-4">
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
export default Payroll_Reports_Modal_Add