import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { IconCirclePlus } from "@tabler/icons-react"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import Select from 'react-select';

const Tax_Info_Modal_Add = () => {
    const [EmployeeName, setEmployeeName] = useState('');
    const [valuedata, setValuedata] = useState([]);
    const [TaxFilingStatus, setTaxFilingStatus] = useState('');
    const [TaxWithholdingAllowances, setTaxWithholdingAllowances] = useState('');
    const [AdditionalWithholdingAmounts, setAdditionalWithholdingAmounts] = useState('');
    const [TaxWithholdingRates, setTaxWithholdingRates] = useState('');
    const [TaxYear, setTaxYear] = useState('');


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getEmployees = async () => {
        const fetchData = await axios.get("http://localhost:8080/employee/");
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
        if (!TaxFilingStatus) {
            return Swal.fire('Error', 'Please enter a tax filing status', 'error');
        }
        if (!TaxWithholdingAllowances || (isNaN(TaxWithholdingAllowances))) {
            return Swal.fire('Error', 'Please enter a tax withholding allowances', 'error');
        }
        if (!AdditionalWithholdingAmounts || (isNaN(AdditionalWithholdingAmounts))) {
            return Swal.fire('Error', 'Please enter an additional withholding amounts', 'error');
        }
        if (!TaxWithholdingRates || (isNaN(TaxWithholdingRates))) {
            return Swal.fire('Error', 'Please enter a tax withholding rates', 'error');
        }
        if (!TaxYear) {
            return Swal.fire('Error', 'Please enter a tax year', 'error');
        }
        console.log(EmployeeName, TaxFilingStatus, TaxWithholdingAllowances, AdditionalWithholdingAmounts, TaxWithholdingRates, TaxYear)

        const response = await axios.post("http://localhost:8080/taxinformation/", {
            employee_id: EmployeeName,
            TaxFilingStatus: TaxFilingStatus,
            TaxWithholdingAllowances: TaxWithholdingAllowances,
            AdditionalWithholdingAmounts: AdditionalWithholdingAmounts,
            TaxWithholdingRates: TaxWithholdingRates,
            TaxYear: TaxYear
        }).then(
            Swal.fire('Loading Please Wait', '', 'info')
        )
        console.log(response);
        if (response.status === 201) {
            Swal.fire('Success', 'The Tax Info is added', 'success').then((result) => {
                handleClose();
                setEmployeeName('');
                setTaxFilingStatus('');
                setTaxWithholdingAllowances('');
                setAdditionalWithholdingAmounts('');
                setTaxWithholdingRates('');
                setTaxYear('');
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
                    <Modal.Title>Add Tax Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="form-horizontal r-separator" onSubmit={SaveData}>
                        <div className="card-body">
                            <h5>Report Info</h5>
                            <div className="form-group mb-0">
                                <div className="row align-items-center">
                                    <label htmlFor="inputText1" className="col-3 text-end control-label col-form-label">Employee Name</label>
                                    <div className="col-9 border-start">
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
                                    <label htmlFor="inputSelect1" className="col-3 text-end control-label col-form-label">Tax Filing Status</label>
                                    <div className="col-9 border-start pb-2 pt-2">
                                        <select className="form-select" value={TaxFilingStatus} onChange={(e) => setTaxFilingStatus(e.target.value)}>
                                            <option value=''>Choose Your Option</option>
                                            <option value='Pending'>Pending</option>
                                            <option value='Approved'>Approved</option>
                                            <option value='Denied'>Denied</option>
                                            <option value='Cancelled'>Cancelled</option>
                                            <option value='Others'>Others</option>

                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group mb-0">
                                <div className="row align-items-center">
                                    <label htmlFor="inputEmail1" className="col-3 text-end control-label col-form-label">Tax Witholding Rates</label>
                                    <div className="col-9 border-start pb-2 pt-2">
                                        <input type="tel"
                                            className="form-control"
                                            placeholder="Enter Tax Witholding Rates Here"
                                            value={TaxWithholdingRates} onChange={(e) => setTaxWithholdingRates(e.target.value)} />
                                    </div>
                                </div>
                            </div>

                            <div className="form-group mb-0">
                                <div className="row align-items-center">
                                    <label htmlFor="inputEmail1" className="col-3 text-end control-label col-form-label">Tax Witholding Amount</label>
                                    <div className="col-9 border-start pb-2 pt-2">
                                        <input type="number"
                                            className="form-control"
                                            placeholder="Enter Tax Witholding Amount Here"
                                            value={TaxWithholdingAllowances}
                                            onChange={(e) => setTaxWithholdingAllowances(e.target.value)} />
                                    </div>
                                </div>
                            </div>

                            <div className="form-group mb-0">
                                <div className="row align-items-center">
                                    <label htmlFor="inputEmail1" className="col-3 text-end control-label col-form-label ">Additional Withholding Amounts</label>
                                    <div className="col-9 border-start pb-2 pt-2">
                                        <input type="number"
                                            className="form-control"
                                            placeholder="Enter Additional Withholding Amounts Here"
                                            value={AdditionalWithholdingAmounts}
                                            onChange={(e) => setAdditionalWithholdingAmounts(e.target.value)} />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group mb-0">
                                <div className="row align-items-center">
                                    <label htmlFor="inputEmail1" className="col-3 text-end control-label col-form-label">Tax Date</label>
                                    <div className="col-9 border-start pb-2 pt-2">
                                        <input type="date"
                                            className="form-control"
                                            placeholder="Enter Exemptions Here"
                                            value={TaxYear} onChange={(e) => setTaxYear(e.target.value)} />
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

export default Tax_Info_Modal_Add