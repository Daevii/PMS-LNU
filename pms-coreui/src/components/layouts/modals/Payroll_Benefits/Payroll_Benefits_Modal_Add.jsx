import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { IconCirclePlus } from "@tabler/icons-react"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import Select from 'react-select';
const Payroll_Benefits_Modal_Add = () => {

    const [EmployeeName, setEmployeeName] = useState('');
    const [valuedata, setValuedata] = useState([]);
    const [plan_type, setPlan_type] = useState('');
    const [amount, setAmount] = useState('');
    const [beneficary_information, setBeneficary_information] = useState('');
    const [date, setDate] = useState('');

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const handleCurrentDate = () => {
        const currentDate = new Date().toISOString().split('T')[0];
        setDate(currentDate);
    };

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

    const SaveData = async (e) => {
        e.preventDefault();
        if (!EmployeeName) {
            return Swal.fire('Error', 'Please enter an employee name', 'error');
        }
        if (!plan_type) {
            return Swal.fire('Error', 'Please enter a plan type', 'error');
        }
        if (!amount) {
            return Swal.fire('Error', 'Please enter an amount', 'error');
        }
        if (!beneficary_information) {
            return Swal.fire('Error', 'Please enter a beneficary information', 'error');
        }
        if (!date) {
            return Swal.fire('Error', 'Please enter a date', 'error');
        }

        const response = await axios.post("http://localhost:8080/payrollbenefit/", {
            employee_id: EmployeeName,
            plan_type: plan_type,
            amount: amount,
            beneficary_information: beneficary_information,
            date: date
        }).then(
            Swal.fire('Loading Please Wait', '', 'info')
        );
        console.log(response);
        if (response.status === 201) {
            Swal.fire('Success', 'The Payroll Benefit is added', 'success').then((result) => {
                if (result.isConfirmed) {
                    handleClose();
                    setEmployeeName('');
                    setPlan_type('');
                    setAmount('');
                    setBeneficary_information('');
                    setDate('');
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
                    <Modal.Title>Add Payroll Benefit</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="form-horizontal r-separator" onSubmit={SaveData}>
                        <div className="card-body">
                            <h5>Personal Info</h5>
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
                                    <label htmlFor="inputSelect1" className="col-3 text-end control-label col-form-label">Plan Type</label>
                                    <div className="col-9 border-start pb-2 pt-2">
                                        <select className="form-select" id="inputSelect1" value={plan_type} onChange={(e) => setPlan_type(e.target.value)}>
                                            <option value={""}>Choose Your Option</option>
                                            <option value={"Sick"}>Sick Leave</option>
                                            <option value={"Maternity Leave"}>Maternaty Leave</option>
                                            <option value={"13 Month Pay "}>13 Month pay </option>
                                            <option value={"Chirsmas Bonus"}>Chirsmas Bonus</option>
                                            <option value={"Paternity"}>Paternity</option>
                                            <option value={"Emergency"}>Emergency</option>
                                            <option value={"Vacation"}>Vacation</option>
                                            <option value={"Unemployment"}>Unemployment</option>
                                            <option value={"Other"}>Other</option>

                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group mb-0">
                                <div className="row align-items-center">
                                    <label htmlFor="inputEmail1" className="col-3 text-end control-label col-form-label">Contributions Amount</label>
                                    <div className="col-9 border-start pb-2 pt-2">
                                        <input type="number"
                                            className="form-control"
                                            id="inputEmail1"
                                            placeholder="Enter Contributions Amount Here"
                                            onChange={(e) => setAmount(e.target.value)}
                                            value={amount} />
                                    </div>
                                </div>
                            </div>

                            <div className="form-group mb-0">
                                <div className="row align-items-center">
                                    <label htmlFor="inputText1" className="col-3 text-end control-label col-form-label">Beneficiary Information</label>
                                    <div className="col-9 border-start pb-2 pt-2">
                                        <input type="text"
                                            className="form-control"
                                            id="inputText1"
                                            placeholder="Enter Beneficiary Information Here"
                                            value={beneficary_information}
                                            onChange={(e) => setBeneficary_information(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="form-group mb-0">
                                <div className="row align-items-center">
                                    <label htmlFor="inputText1" className="col-3 text-end control-label col-form-label">Payroll Benefit Date</label>
                                    <div className="col-7 border-start pb-2 pt-2">
                                        <input type="date"
                                            className="form-control"
                                            id="StartDate"
                                            placeholder="Enter Start Date Here"
                                            value={date}
                                            onChange={(e) => setDate(e.target.value)} />
                                    </div>
                                    <div className="col-2 pb-2 pt-2">
                                        <button type="button" className="btn btn-dark btn-sm text-xs pb-2 pt-2" onClick={handleCurrentDate}>Current Date</button>
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

export default Payroll_Benefits_Modal_Add