
// HTML Layouts
import { useEffect, useState } from 'react';
import Header from '../../layouts/header';
import Sidebar from '../../layouts/Sidebar';
import Footer from '../../layouts/Footer';

// DataTables
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';

// Modals
import Employee_Modal_Add from '../../layouts/modals/Employee/Employee_Modal_Add';
import Employee_Modal_Edit from '../../layouts/modals/Employee/Employee_Modal_Edit';
import Employee_Delete from '../../layouts/modals/Employee/Employee_Delete';


import axios from 'axios';
import { Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


function Employee() {
    const navigate = useNavigate();
    if (!sessionStorage.getItem('session')) {
        navigate('/unautorized');
    }
    const [data, setData] = useState([]);


    const [showSpinner, setShowSpinner] = useState(true);
    useEffect(() => {
        getData();


    }, [data]);

    const getData = async (e) => {
        const FetchData = await axios.get("http://localhost:8080/employee/", {
        });
        setData(FetchData.data);
        setShowSpinner(false);
    };
    const columns = [
        { name: 'ID', selector: row => row.id, sortable: true, width: '75px' },
        { name: 'First Name', selector: row => row.firstname, sortable: true, width: '125px' },
        { name: 'Last Name', selector: row => row.lastname, sortable: true, width: '125px' },
        { name: 'Birthday', selector: row => row.birthdate, sortable: true, width: '125px', },
        { name: 'Gender', selector: row => row.gender, sortable: true },
        { name: 'Email', selector: row => row.email, sortable: true, width: '200px' },
        { name: 'Address', selector: row => row.address, sortable: true, width: '200px' },
        { name: 'Phone Num', selector: row => row.phone, sortable: true, width: '150px' },
        { name: 'Position', selector: row => row.position, sortable: true, width: '150px' },
        { name: 'Department', selector: row => row.department, sortable: true, width: '150px' },
        { name: 'Salary', selector: row => row.salary, sortable: true },
        { name: 'Status', selector: row => row.status, sortable: true },
        {
            name: 'Action',
            cell: row => (
                <>
                    <Employee_Modal_Edit Editid={row.id} showSpinner={setShowSpinner} />
                    <Employee_Delete Deleteid={row.id} />
                </>
            ),
            width: '125px',
        }
    ];





    return (
        <>
            <Sidebar />
            <div className="body-wrapper">
                <Header />
                <div className="container-fluid">

                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body p-4 d-flex justify-content-between">
                                    <div>
                                        <h5 className="card-title fw-semibold mb-4">Employee List</h5>
                                    </div>
                                    <Employee_Modal_Add />
                                </div>
                                {showSpinner && (
                                    <div className="d-flex justify-content-center align-items-center" style={{ height: '70vh' }}>
                                        <Spinner animation="border" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </Spinner>
                                    </div>
                                )}
                                {!showSpinner && (
                                    <div className="table-responsive card-body">
                                        <DataTableExtensions
                                            columns={columns}
                                            data={data}
                                            print={false}
                                            export={false}
                                        >
                                            <DataTable columns={columns} data={data} pagination responsive striped highlightOnHover />
                                        </DataTableExtensions>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
                <Footer />
            </div >
        </>
    );
}

export default Employee;