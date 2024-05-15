import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { IconCirclePlus } from "@tabler/icons-react"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import Select from 'react-select';

const Payroll_Deductions_Modal_Add = () => {
    const [EmployeeName, setEmployeeName] = useState('');
    const [valuedata, setValuedata] = useState([]);
    const [deduction_type, setDeduction_type] = useState('');
    const [amount, setAmount] = useState('');
    const [StartDate, setStartDate] = useState('');
    const [EndDate, setEndDate] = useState('');
    const [Frequency, setFrequency] = useState('');


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
    const handleCurrentDate = () => {
        const currentDate = new Date().toISOString().split('T')[0];
        setStartDate(currentDate);
        setEndDate(currentDate);
    };


    const SaveData = async (e) => {
        e.preventDefault();
        if (!EmployeeName) {
            return Swal.fire('Error', 'Please enter an employee name', 'error');
        }
        if (!deduction_type) {
            return Swal.fire('Error', 'Please enter a deduction type', 'error');
        }
        if (!amount) {
            return Swal.fire('Error', 'Please enter an amount', 'error');
        }
        if (!StartDate) {
            return Swal.fire('Error', 'Please enter a start date', 'error');
        }
        if (!EndDate) {
            return Swal.fire('Error', 'Please enter an end date', 'error');
        }
        if (!Frequency) {
            return Swal.fire('Error', 'Please enter a frequency', 'error');
        }

        const response = await axios.post("http://localhost:8080/payrolldeduction/", {
            employee_id: EmployeeName,
            deduction_type: deduction_type,
            amount: amount,
            start_date: StartDate,
            end_date: EndDate,
            frequency: Frequency
        }).then(
            Swal.fire('Loading Please Wait', '', 'info')
        );
        if (response.status === 201) {
            Swal.fire('Success', 'The Payroll Deduction is added', 'success').then((result) => {
                if (result.isConfirmed) {
                    handleClose();
                    setEmployeeName('');
                    setDeduction_type('');
                    setAmount('');
                    setStartDate('');
                    setEndDate('');
                    setFrequency('');
                }
            })

        }
    }

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
                    <Modal.Title>Add Payroll Deduction</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="form-horizontal r-separator" onSubmit={SaveData}>
                        <div className="card-body">
                            <h5>Deductions Info</h5>
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
                            <div className="form-group mb-0">
                                <div className="row align-items-center">
                                    <label htmlFor="inputSelect1" className="col-3 text-end control-label col-form-label">Deduction Type</label>
                                    <div className="col-9 border-start pb-2 pt-2">
                                        <select className="form-select" id="deduction_type" value={deduction_type} onChange={(e) => setDeduction_type(e.target.value)}>
                                            <option value={''}>Choose Your Option</option>
                                            <option value={"BIR Pay"}>BIR Pay</option>
                                            <option value={"SSS"}>SSS Pension</option>
                                            <option value={"Retirement Fund"}>Retirement Fund</option>
                                            <option value={"Insurance"}>Insurance</option>
                                            <option value={"Others"}>Others</option>

                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group mb-0">
                                <div className="row align-items-center">
                                    <label htmlFor="inputEmail1" className="col-3 text-end control-label col-form-label">Deductions Amount</label>
                                    <div className="col-9 border-start pb-2 pt-2">
                                        <input type="number"
                                            className="form-control"
                                            id="amount"
                                            placeholder="Enter Deduction Amount Here"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)} />
                                    </div>
                                </div>
                            </div>

                            <div className="form-group mb-0">
                                <div className="row align-items-center">
                                    <label htmlFor="inputText1" className="col-3 text-end control-label col-form-label">Frequency</label>
                                    <div className="col-9 border-start pb-2 pt-2">
                                        <select className="form-select" id="frequency" value={Frequency} onChange={(e) => setFrequency(e.target.value)}>
                                            <option value={''}>Choose Your Option</option>
                                            <option value={'Daily'}>Daily</option>
                                            <option value={'Weekly'}>Weekly</option>
                                            <option value={'Monthly'}>Monthly</option>
                                            <option value={'Yearly'}>Yearly</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group mb-0">
                                <div className="row align-items-center">
                                    <label htmlFor="inputEmail1" className="col-3 text-end control-label col-form-label">Start Date</label>
                                    <div className="col-7 border-start pb-2 pt-2">
                                        <input type="date"
                                            className="form-control"
                                            id="start_date"
                                            placeholder="Enter Date Here"
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
                                    <label htmlFor="inputEmail1" className="col-3 text-end control-label col-form-label">End Date</label>
                                    <div className="col-7 border-start pb-2 pt-2">
                                        <input type="date"
                                            className="form-control"
                                            id="end_date"
                                            placeholder="Enter Date Here"
                                            value={EndDate}
                                            onChange={(e) => setEndDate(e.target.value)} />
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

export default Payroll_Deductions_Modal_Add