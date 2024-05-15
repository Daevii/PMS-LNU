import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { IconEdit } from "@tabler/icons-react"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Tax_Table_Modal_Edit = (id) => {
    const [TaxYear, setTaxYear] = useState('');
    const [TaxBracket, setTaxBracket] = useState('');
    const [TaxRate, setTaxRate] = useState('');
    const [TaxableIncomeThresholds, setTaxableIncomeThresholds] = useState('');
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        console.log(id.Editid)
        setShow(true);
        axios.get("http://localhost:8080/taxtable/" + id.Editid).then(
            Response => {
                setTaxYear(Response.data.TaxYear);
                setTaxBracket(Response.data.TaxBracket);
                setTaxRate(Response.data.TaxRate);
                setTaxableIncomeThresholds(Response.data.TaxableIncomeThresholds);
            }

        )
    };




    const SaveData = async (e) => {
        e.preventDefault();
        if (!TaxYear) {
            return Swal.fire('Error', 'Please enter a Tax Year', 'error');
        }
        if (!TaxBracket) {
            return Swal.fire('Error', 'Please enter a Tax Bracket', 'error');
        }
        if (!TaxRate || (isNaN(TaxRate))) {
            return Swal.fire('Error', 'Please enter a Tax Rate', 'error');
        }
        if (!TaxableIncomeThresholds || (isNaN(TaxableIncomeThresholds))) {
            return Swal.fire('Error', 'Please enter a Taxable Income Thresholds', 'error');
        }


        const response = await axios.put("http://localhost:8080/taxtable/" + id.Editid, {
            TaxYear: TaxYear,
            TaxBracket: TaxBracket,
            TaxRate: TaxRate,
            TaxableIncomeThresholds: TaxableIncomeThresholds
        }).then(
            Swal.fire('Loading Please Wait', '', 'info')
        )
        console.log(response);
        if (response.status === 200) {
            Swal.fire('Success', 'The Tax Table is Updated', 'success').then((result) => {
                handleClose();
                setTaxYear('');
                setTaxBracket('');
                setTaxRate('');
                setTaxableIncomeThresholds('');
            })
        }
    }
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
                    <Modal.Title>Edit TaxTable</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="form-horizontal r-separator" onSubmit={SaveData}>
                        <div className="card-body">
                            <h5>Edit Tax Table Information</h5>

                            <div className="form-group mb-0">
                                <div className="row align-items-center">
                                    <label htmlFor="inputEmail1" className="col-3 text-end control-label col-form-label">Tax Year</label>
                                    <div className="col-9 border-start pb-2 pt-2">
                                        <input type="number"
                                            className="form-control" id="TaxYear" pattern="[0-9]{4}" title="Please enter a 4 digit year"
                                            placeholder="Enter Tax Year Here"
                                            value={TaxYear}
                                            onChange={(e) => setTaxYear(e.target.value)} />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group mb-0">
                                <div className="row align-items-center">
                                    <label htmlFor="inputEmail1" className="col-3 text-end control-label col-form-label">Tax Brackets</label>
                                    <div className="col-9 border-start pb-2 pt-2">
                                        <input type="text"
                                            className="form-control"
                                            id="TaxBracket"
                                            placeholder="Enter Tax Brackets Here"
                                            value={TaxBracket}
                                            onChange={(e) => setTaxBracket(e.target.value)} />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group mb-0">
                                <div className="row align-items-center">
                                    <label htmlFor="inputEmail1" className="col-3 text-end control-label col-form-label">Tax Rates</label>
                                    <div className="col-9 border-start pb-2 pt-2">
                                        <input type="tel"
                                            className="form-control"
                                            id="TaxRate"
                                            placeholder="Enter Tax Rates Here"
                                            value={TaxRate}
                                            onChange={(e) => setTaxRate(e.target.value)} />
                                    </div>
                                </div>
                            </div>



                            <div className="form-group mb-0">
                                <div className="row align-items-center">
                                    <label htmlFor="inputEmail1" className="col-3 text-end control-label col-form-label">Taxable Income Threshold</label>
                                    <div className="col-9 border-start pb-2 pt-2">
                                        <input type="tel"
                                            className="form-control"
                                            id="TaxableIncomeThreshold"
                                            placeholder="Enter Taxable Income Threshold Here"
                                            value={TaxableIncomeThresholds}
                                            onChange={(e) => setTaxableIncomeThresholds(e.target.value)} />
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
        </>)
}

export default Tax_Table_Modal_Edit