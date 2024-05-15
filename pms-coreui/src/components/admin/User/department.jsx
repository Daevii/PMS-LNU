import React, { useState, useEffect } from 'react';
import Header from '../../layouts/header';
import Sidebar from '../../layouts/Sidebar';
import Footer from '../../layouts/Footer';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import axios from 'axios';
import DeptAdd from '../../layouts/modals/Department/Department_Modal_Add';
import DeptEdit from '../../layouts/modals/Department/Department_Modal_Edit';
import DeptDelete from '../../layouts/modals/Department/Department_Delete';

import { Spinner } from 'react-bootstrap';

import { useNavigate } from 'react-router-dom';

/**
 * The 'department' function is the main component for the department
 * page. It renders the department list along with the add, edit, and delete
 * functionality. This component uses React hooks to manage state and side effects.
 * It also uses React Router to handle navigation and authentication.
 */
function department() {
    // Get the navigate function from React Router
    const navigate = useNavigate();

    // Check if the user is logged in, if not redirect to /unauthorized
    if (!sessionStorage.getItem('session')) {
        navigate('/unautorized');
    }

    // Define the initial state for the data and showSpinner using the useState hook
    const [data, setData] = useState([]); // Data stores the fetched department data
    const [showSpinner, setShowSpinner] = useState(true); // ShowSpinner is a flag to show/hide the spinner

    // Define the columns for the table using the useState hook
    const columns = [
        { name: 'ID', selector: row => row.id, sortable: true, width: '30%' },
        { name: 'Department', selector: row => row.department, sortable: true, width: '50%' },
        {
            name: 'Action',
            cell: row => (
                <>
                    <DeptEdit Editid={row.id} /> {/* Render the Edit modal component */}
                    <DeptDelete Deleteid={row.id} /> {/* Render the Delete modal component */}
                </>
            ),
            width: '20%',
        }
    ];

    // Fetch the department data from the server using the useEffect hook
    useEffect(() => {
        getData();
    }, [data]); // Fetch the data whenever the data state changes

    // Define the getData function to fetch the department data from the server
    const getData = async () => {
        const FetchData = await axios.get("http://localhost:8080/department/");
        setData(FetchData.data); // Set the fetched data to the data state
        setShowSpinner(false);

    };


    // Render the department page with the Sidebar, Header, DataTable, and Footer components
    return (
        <>
            <Sidebar /> {/* Render the Sidebar component */}
            <div className="body-wrapper">
                <Header /> {/* Render the Header component */}
                <div className="container-fluid">

                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body p-4 d-flex justify-content-between">
                                    <div>
                                        <h5 className="card-title fw-semibold mb-4">Department List</h5>
                                    </div>
                                    <DeptAdd alidation={data} /> {/* Render the Add modal component */}
                                </div>
                                <div className="table-responsive card-body">
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
                <Footer /> {/* Render the Footer component */}

            </div >

        </>
    )
}




export default department;