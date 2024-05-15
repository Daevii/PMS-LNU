import { useState, useEffect } from 'react';
import Header from '../../layouts/header';
import Sidebar from '../../layouts/Sidebar';
import Footer from '../../layouts/Footer';

// DataTables
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';


// Modals
import Tax_Info_Modal_Add from '../../layouts/modals/Tax_Info/Tax_Info_Modal_Add';
import Tax_Info_Modal_Edit from '../../layouts/modals/Tax_Info/Tax_Info_Modal_Edit';
import Tax_Info_Delete from '../../layouts/modals/Tax_Info/Tax_Info_Delete';
// Icons 
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

// Spinner
import { Spinner } from 'react-bootstrap';

// axios
import axios from 'axios';


function tax_info() {

    const navigate = useNavigate();
    if (!sessionStorage.getItem('session')) {
        navigate('/unautorized');
    }

    const [data, setData] = useState([]);
    const [showSpinner, setShowSpinner] = useState(true);
    const getData = async () => {
        const FetchData = await axios.get("http://localhost:8080/taxinformation/");
        setData(FetchData.data);
        setShowSpinner(false);
    }
    useEffect(() => {
        getData();
    }, [data]);

    const columns = [
        { name: "ID", selector: row => row.id, sortable: true, width: '75px' },
        { name: "Employee ID", selector: row => row.employee_id, sortable: true, },
        { name: "Tax Filing Status", selector: row => row.TaxFilingStatus, sortable: true, },
        { name: "Tax Withholding Amounts", selector: row => row.TaxWithholdingAllowances, sortable: true, },
        { name: "AdditionalWithholdingAmounts", selector: row => row.AdditionalWithholdingAmounts, sortable: true, },
        { name: "Tax Witholding Rates", selector: row => row.TaxWithholdingRates, sortable: true, },
        { name: "Tax Date", selector: row => row.TaxYear, sortable: true, },

        {
            name: 'Action',
            cell: row => (
                <>

                    <Tax_Info_Modal_Edit Editid={row.id} />
                    < Tax_Info_Delete Deleteid={row.id} />

                </>
            ),
            center: true
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
                                        <h5 className="card-title fw-semibold mb-4">Tax Information List</h5>
                                    </div>
                                    <Tax_Info_Modal_Add />

                                </div>
                                {showSpinner && (
                                    <div className="d-flex justify-content-center align-items-center" style={{ height: '70vh' }}>
                                        <Spinner animation="border" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </Spinner>
                                    </div>
                                )}
                                {!showSpinner && (
                                    <div className="table-responsive">
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
            </div>
        </>

    )
}
export default tax_info