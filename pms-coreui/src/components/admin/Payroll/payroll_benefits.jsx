import React, { useState, useEffect } from 'react';
import Header from '../../layouts/header';
import Sidebar from '../../layouts/Sidebar';
import Footer from '../../layouts/Footer';

// DataTables
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';


// Modals
import Payroll_Benefits_Modal_Add from '../../layouts/modals/Payroll_Benefits/Payroll_Benefits_Modal_Add';
import Payroll_Benefits_Modal_Edit from '../../layouts/modals/Payroll_Benefits/Payroll_Benefits_Modal_Edit';
import Payroll_Benefits_Delete from '../../layouts/modals/Payroll_Benefits/Payroll_Benefits_Delete';

// Icons 
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { Spinner } from 'react-bootstrap';
function payroll_benefits() {
    const navigate = useNavigate();
    if (!sessionStorage.getItem('session')) {
        navigate('/unautorized');
    }

    const [data, setData] = useState([]);
    const [showSpinner, setShowSpinner] = useState(true);

    const getData = async () => {
        const FetchData = await axios.get("http://localhost:8080/payrollbenefit/");
        setData(FetchData.data);
        setShowSpinner(false);
    }
    useEffect(() => {
        getData();

    }, [data]);


    const columns = [
        { name: "ID", selector: row => row.id, sortable: true, width: '100px' },
        { name: "Employee ID", selector: row => row.employee_id, sortable: true, },
        { name: "Plan Type", selector: row => row.plan_type, sortable: true, },
        { name: "Contributions Amount", selector: row => row.amount, sortable: true, },
        { name: "Beneficiary Information", selector: row => row.beneficary_information, sortable: true, },
        { name: "Date", selector: row => row.date, sortable: true },

        {
            name: 'Action',
            cell: row => (
                <>
                    <Payroll_Benefits_Modal_Edit Editid={row.id} />
                    <Payroll_Benefits_Delete Deleteid={row.id} />

                </>
            ),
        }
    ];
    return (
        <>
            <Sidebar />
            <div className="body-wrapper">
                <Header />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12 border-1">
                            <div className="card">
                                <div className="card-body p-4 d-flex justify-content-between">
                                    <div>
                                        <h5 className="card-title fw-semibold mb-4">Payroll Benefits List</h5>
                                    </div>
                                    <Payroll_Benefits_Modal_Add />

                                </div>
                                <div className="table-responsive">
                                    {showSpinner && (
                                        <div className="d-flex justify-content-center align-items-center" style={{ height: '70vh' }}>
                                            <Spinner animation="border" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </Spinner>
                                        </div>
                                    )}
                                    {!showSpinner && (
                                        <DataTableExtensions
                                            columns={columns}
                                            data={data}
                                            print={false}
                                            export={false}
                                        >

                                            <DataTable columns={columns} data={data} pagination responsive striped highlightOnHover />

                                        </DataTableExtensions>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>

    )
}
export default payroll_benefits