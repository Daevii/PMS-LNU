// HTML Layouts
import { useState, useEffect } from 'react';
import Header from '../../layouts/header';
import Sidebar from '../../layouts/Sidebar';
import Footer from '../../layouts/Footer';


// DataTables
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';



import { Spinner } from 'react-bootstrap';
import axios from 'axios';

// Modals
import PosAdd from '../../layouts/modals/Position/Position_Modal_Add';
import PosEdit from '../../layouts/modals/Position/Position_Modal_Edit';
import PosDelete from '../../layouts/modals/Position/Position_Delete';

import { useNavigate } from 'react-router-dom';

function position() {
    const navigate = useNavigate();
    if (!sessionStorage.getItem('session')) {
        navigate('/unautorized');
    }

    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
        // remove the value of the modal

    }, [data]);

    const getData = async () => {
        const FetchData = await axios.get("http://localhost:8080/position/")
        setData(FetchData.data);
        setShowSpinner(false);

    };



    const columns = [
        { name: 'ID', selector: row => row.id, sortable: true, width: '30%', },
        { name: 'Position', selector: row => row.position, sortable: true, width: '50%' },
        {
            name: 'Action',
            cell: row => (
                <>
                    <PosEdit Editid={row.id} />
                    <PosDelete Deleteid={row.id} />
                </>
            ),
            width: '20%',
        }
    ]

    const [showSpinner, setShowSpinner] = useState(true);

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
                                        <h5 className="card-title fw-semibold mb-4">Position List</h5>
                                    </div>
                                    <PosAdd />
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
            </div >

        </>
    )
}

export default position