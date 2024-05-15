import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { IconCirclePlus } from "@tabler/icons-react"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import Select from 'react-select';

const Payroll_Calendar_Modal_Add = () => {
    const [EmployeeName, setEmployeeName] = useState('');
    const [valuedata, setValuedata] = useState([]);

    const [StartDate, setStartDate] = useState('');
    const [EndDate, setEndDate] = useState('');
    const [PayDate, setPayDate] = useState('');
    const [WorkingDays, setWorkingDays] = useState('');
    const [PayType, setPayType] = useState('');

    const SaveData = async (e) => {
        e.preventDefault();

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

        const response = await axios.post("http://localhost:8080/payrollcalendar/", {
            employee_id: EmployeeName,
            start_date: StartDate,
            end_date: EndDate,
            pay_date: PayDate,
            working_days: WorkingDays,
            work_type: PayType
        }).then(
            Swal.fire('Loading Please Wait', '', 'info')
        );
        if (response.status === 201) {
            Swal.fire('Success', 'The Payroll Calendar is added', 'success').then((result) => {
                if (result.isConfirmed) {
                    handleClose();
                    setEmployeeName('');
                    setStartDate('');
                    setEndDate('');
                    setPayDate('');
                    setWorkingDays('');
                    setPayType('');
                }
            })
        }
    }

    const handleCurrentDate = () => {
        const currentDate = new Date().toISOString().split('T')[0];
        setStartDate(currentDate);
    };

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getEmployees = async () => {
        const fetchData = await axios.get("http://localhost:8080/employee/");
        setEmployeeName(fetchData.data);
        const valuedata = fetchData.data.map((item) => ({
            value: item.firstname + ' ' + item.lastname,
            label: `${item.firstname} ${item.lastname}`,
        }));
        setValuedata(valuedata);
    };

    useEffect(() => {
        getEmployees();
    }, []);

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
                    <Modal.Title>Add Payroll Calendar</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="form-horizontal r-separator" onSubmit={SaveData}>
                        <div className="card-body">
                            <h5>Employee Info</h5>
                            <div className="form-group mb-0">
                                <div className="row align-items-center">
                                    <label htmlFor="inputText1" className="col-3 text-end control-label col-form-label">Employee Name</label>
                                    <div className="col-9 border-start pb-2 pt-2">
                                        <Select
                                            className="form-floating mb-3 mt-3"
                                            id="status"
                                            placeholder="Select Employee"
                                            isSearchable
                                            isLoading={false}
                                            options={valuedata}
                                            onChange={(selectedData) => setEmployeeName(selectedData.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <h5>Payroll Info</h5>
                            <div className="form-group mb-0">
                                <div className="row align-items-center">
                                    <label htmlFor="inputText1" className="col-3 text-end control-label col-form-label">Start Date</label>
                                    <div className="col-7 border-start pb-2 pt-2">
                                        <input type="date"
                                            className="form-control"
                                            id="StartDate"
                                            placeholder="Enter Start Date Here"
                                            value={StartDate}
                                            onChange={(e) => setStartDate(e.target.value)} />
                                    </div>
                                    <div className="col-2 pb-2 pt-2">
                                        <button type="button" className="btn btn-dark btn-sm text-xs pb-2 pt-2" onClick={handleCurrentDate}>Current Date</button>
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

export default Payroll_Calendar_Modal_Add;
