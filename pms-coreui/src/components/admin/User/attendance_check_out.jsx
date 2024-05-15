import React, { useState, useEffect } from 'react';
import Header from '../../layouts/header';
import Sidebar from '../../layouts/Sidebar';
import Footer from '../../layouts/Footer';

// DataTables
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';

// Actions
import Attendance_Delete from '../../layouts/modals/Attendace/Attendance_Delete';
import Attendance_Check_out from '../../layouts/modals/Attendace/Attendance_Check_out_Add';

// Icons 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { Spinner } from 'react-bootstrap';

function attendance_check_out() {

  const navigate = useNavigate();
  if (!sessionStorage.getItem('session')) {
    navigate('/unautorized');
  }


  const [data, setData] = useState([]);
  const [showSpinner, setShowSpinner] = useState(true);


  const getData = async () => {
    const FetchData = await axios.get("http://localhost:8080/attendance/");
    const filteredData = FetchData.data.filter(item => item.check_out === null);
    setData(filteredData);
    setShowSpinner(false);
  }

  useEffect(() => {
    getData();
  }, [data]);
  const columns = [
    { name: 'ID', selector: row => row.id, sortable: true },
    { name: 'Date', selector: row => row.date, sortable: true },
    { name: 'Employee Name', selector: row => row.employee_id, sortable: true },
    { name: 'Check In Time', selector: row => row.check_in, sortable: true },
    {
      name: 'Check Out Time',
      cell: row => (
        row.check_out === null ?
          <span className="badge bg-danger">No Check Out Time</span> :
          row.check_out
      ),
      sortable: true
    },
    {
      name: 'Action',
      cell: row => (
        <>
          <Attendance_Check_out Checkoutid={row.id} />
          <Attendance_Delete Deleteid={row.id} />

        </>
      ),
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
                    <h5 className="card-title fw-semibold mb-4">Attendance List</h5>
                  </div>
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

export default attendance_check_out