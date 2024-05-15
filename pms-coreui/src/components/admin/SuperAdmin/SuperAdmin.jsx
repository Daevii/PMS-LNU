
// HTML Layouts
import { useState, useEffect } from 'react';
import Header from '../../layouts/header';
import Sidebar from '../../layouts/Sidebar';
import Footer from '../../layouts/Footer';

// DataTables
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';

// Modals
import SuperAdmin_Modal_Add from '../../layouts/modals/SuperAdmin/SuperAdmin_Modal_Add';
import SuperAdmin_Modal_Edit from '../../layouts/modals/SuperAdmin/SuperAdmin_Modal_Edit';
import SuperAdmin_Delete from '../../layouts/modals/SuperAdmin/SuperAdmin_Delete';

import axios from 'axios';
import { Spinner } from 'react-bootstrap';
import { IconEdit } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

function SuperAdmin() {

  const navigate = useNavigate();
  if (!sessionStorage.getItem('session')) {
    navigate('/unautorized');
  }
  const [data, setData] = useState([]);

  useEffect(() => {

    getData();

  }, [data]);
  const getData = async () => {
    const FetchData = await axios.get("http://localhost:8080/admin/", {

    });
    setData(FetchData.data);
    setShowSpinner(false);

  };
  const columns = [
    { name: 'ID', selector: row => row.id, sortable: true, width: '65px' },
    { name: 'Username', selector: row => row.username, sortable: true, },
    { name: 'Email', selector: row => row.email, sortable: true },
    { name: 'Phone Num', selector: row => row.number, sortable: true },
    { name: 'Address', selector: row => row.address, sortable: true },
    { name: 'Last Login', selector: row => row.last_login, sortable: true },
    {
      name: 'Action',
      cell: row => (
        <>
          <SuperAdmin_Modal_Edit Editid={row.id} />
          <SuperAdmin_Delete Deleteid={row.id} />
        </>
      ),
      width: '125px',
    }
  ];



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
                    <h5 className="card-title fw-semibold mb-4">Admin List</h5>
                  </div>
                  <SuperAdmin_Modal_Add />
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
  );
}

export default SuperAdmin;