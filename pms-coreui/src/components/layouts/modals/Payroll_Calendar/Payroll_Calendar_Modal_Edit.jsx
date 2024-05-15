import { useEffect, useState } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import { IconEdit } from "@tabler/icons-react"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import Select from 'react-select';

const Payroll_Calendar_Modal_Edit = (id) => {
    const [EmployeeName, setEmployeeName] = useState('');
    const [valuedata, setValuedata] = useState([]);
    const [StartDate, setStartDate] = useState('');
    const [EndDate, setEndDate] = useState('');
    const [PayDate, setPayDate] = useState('');
    const [WorkingDays, setWorkingDays] = useState('');
    const [PayType, setPayType] = useState('');


    const SaveData = async (e) => {
        e.preventDefault();
        console.log({
            employee_id: EmployeeName,
            start_date: StartDate,
            end_date: EndDate,
            pay_date: PayDate,
            working_days: WorkingDays,
            work_type: PayType
        })

        if (!EmployeeName) {
            return Swal.fire('Error', 'Please enter an employee name', 'error');
        }
        if (!StartDate) {
            return Swal.fire('Error', 'Please enter a start date', 'error');
        }
        if (!EndDate) {
            return Swal.fire('Error', 'Please enter an end date', 'error');
        }
        if (!PayDate) {
            return Swal.fire('Error', 'Please enter a pay date', 'error');
        }
        if (!WorkingDays) {
            return Swal.fire('Error', 'Please enter a working days', 'error');
        }
        if (!PayType) {
            return Swal.fire('Error', 'Please enter a pay type', 'error');
        }

        const response = await axios.put("http://localhost:8080/payrollcalendar/" + id.Editid, {
            employee_id: EmployeeName,
            start_date: StartDate,
            end_date: EndDate,
            pay_date: PayDate,
            working_days: WorkingDays,
            work_type: PayType
        }).then(
            Swal.fire('Loading Please Wait', '', 'info')

        );
        if (response.status === 200) {
            Swal.fire('Success', 'The Payroll Calendar is updated', 'success').then((result) => {
                if (result.isConfirmed) {
                    handleClose();

                }
            })
        }


    }
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
        axios.get("http://localhost:8080/payrollcalendar/" + id.Editid).then(
            Response => {
                setStartDate(Response.data.start_date);
                setEndDate(Response.data.end_date);
                setPayDate(Response.data.pay_date);
                setWorkingDays(Response.data.working_days);
                setPayType(Response.data.work_type);
                setEmployeeName(Response.data.employee_id);
            }
        )
    };

    return (
        <>
            <Button className="btn btn-light btn-warning btn-sm" onClick={handleShow}> <IconEdit style={{ color: 'orange' }} /></Button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size='lg'
            >
                <Modal.Header>
                    <Modal.Title>Edit Payroll Calendar</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="form-horizontal r-separator" onSubmit={SaveData}>
                        <div className="card-body">
                            <h5>Employee Info</h5>
                            <div className="form-group mb-0">
                                <div className="row align-items-center">
                                    <label htmlFor="inputText1" className="col-3 text-end control-label col-form-label">Employee Name</label>
                                    <div className="col-9 border-start pb-2 pt-2">
                                        <input type="text" className="form-control" id="EmployeeName" placeholder="Enter Employee Name Here" value={EmployeeName} onChange={(e) => setEmployeeName(e.target.value)} disabled />
                                    </div>
                                </div>
                            </div>


                        </div>
                        <div className="card-body">
                            <h5>Payroll Info</h5>
                            <div className="form-group mb-0">
                                <div className="row align-items-center">
                                    <label htmlFor="inputText1" className="col-3 text-end control-label col-form-label">Start Date</label>
                                    <div className="col-9 border-start pb-2 pt-2">
                                        <input type="date"
                                            className="form-control"
                                            id="StartDate"
                                            placeholder="Enter End Date Here"
                                            value={StartDate}
                                            onChange={(e) => setStartDate(e.target.value)} />
                                    </div>
                                </div>

                            </div>
                            <div className="form-group mb-0">
                                <div className="row align-items-center">
                                    <label htmlFor="inputText1" className="col-3 text-end control-label col-form-label">End Date</label>
                                    <div className="col-9 border-start pb-2 pt-2">
                                        <input type="date"
                                            className="form-control"
                                            id="EndDate"
                                            placeholder="Enter End Date Here"
                                            value={EndDate}
                                            onChange={(e) => setEndDate(e.target.value)} />
                                    </div>
                                </div>

                            </div>
                            <div className="form-group mb-0">
                                <div className="row align-items-center">
                                    <label htmlFor="inputText1" className="col-3 text-end control-label col-form-label">Payroll Date</label>
                                    <div className="col-9 border-start pb-2 pt-2">
                                        <input type="date"
                                            className="form-control"
                                            id="PayDate"
                                            placeholder="Enter Payroll Date Here"
                                            value={PayDate}
                                            onChange={(e) => setPayDate(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group mb-0">
                                <div className="row align-items-center">
                                    <label htmlFor="inputText1" className="col-3 text-end control-label col-form-label">Working Days</label>
                                    <div className="col-9 border-start pb-2 pt-2">
                                        <input type="number"
                                            className="form-control"
                                            id="WorkingDays"
                                            placeholder="Enter Working Days Here"
                                            value={WorkingDays}
                                            onChange={(e) => setWorkingDays(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group mb-0">
                                <div className="row align-items-center">
                                    <label htmlFor="inputSelect1" className="col-3 text-end control-label col-form-label">Pay Type</label>
                                    <div className="col-9 border-start pb-2 pt-2">
                                        <select className="form-select" id="inputSelect1" value={PayType} onChange={(e) => setPayType(e.target.value)}>
                                            <option value={""}>Choose Your Option</option>
                                            <option value={"Daily"}>Daily</option>
                                            <option value={"Weekly"}>Weekly</option>
                                            <option value={"Bi-Weekly"}>Bi-Weekly</option>
                                            <option value={"Monthly"}>Monthly</option>
                                            <option value={"Bi-Monthly"}>Bi-Monthly</option>
                                            <option value={"One-Time"}>One-Time</option>
                                            <option value={"Hourly"}>Hourly</option>
                                            <option value={"Weekly Off"}>Weekly Off</option>
                                            <option value={"Monthly Off"}>Monthly Off</option>
                                        </select>
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

            </Modal>
        </>

    )
}

export default Payroll_Calendar_Modal_Edit