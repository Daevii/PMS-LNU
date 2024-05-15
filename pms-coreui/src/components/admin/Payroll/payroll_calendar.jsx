import React, { useState, useEffect } from 'react';
import Header from '../../layouts/header';
import Sidebar from '../../layouts/Sidebar';
import Footer from '../../layouts/Footer';

// DataTables
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';


// Modals
import Payroll_Calendar_Modal_Add from '../../layouts/modals/Payroll_Calendar/Payroll_Calendar_Modal_Add';
import Payroll_Calendar_Modal_Edit from '../../layouts/modals/Payroll_Calendar/Payroll_Calendar_Modal_Edit';
import Payroll_Calendar_Delete from '../../layouts/modals/Payroll_Calendar/Payroll_Calendar_Delete';

// Icons 
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';
function payroll_calendar() {

    const [data, setData] = useState([]);
    const [showSpinner, setShowSpinner] = useState(true);
    const getData = async () => {
        const FetchData = await axios.get('http://localhost:8080/payrollcalendar/');
        setData(FetchData.data);
        setShowSpinner(false);
    }
    useEffect(() => {
        getData();

    }, [data]);


    const navigate = useNavigate();
    if (!sessionStorage.getItem('session')) {
        navigate('/unautorized');
    }



    const columns = [
        { name: "ID", selector: row => row.id, sortable: true, width: '100px' },
        { name: "Employee Name", selector: row => row.employee_id, sortable: true, },
        { name: "Start Date", selector: row => row.start_date, sortable: true, },
        { name: "End Date", selector: row => row.end_date, sortable: true, },
        { name: "Pay Date", selector: row => row.pay_date, sortable: true, },
        { name: "Working Days", selector: row => row.working_days, sortable: true, },
        { name: "Pay Type", selector: row => row.work_type, sortable: true, },
        {
            name: "Action",
            cell: row => (
                <>
                    <Payroll_Calendar_Modal_Edit Editid={row.id} />
                    <Payroll_Calendar_Delete Deleteid={row.id} />
                </>
            )
        }
    ]
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
                                        <h5 className="card-title fw-semibold mb-4">Payroll Calendar List</h5>
                                    </div>
                                    <Payroll_Calendar_Modal_Add />

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

export default payroll_calendar