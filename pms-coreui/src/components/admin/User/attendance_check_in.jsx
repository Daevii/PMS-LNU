import React, { useState, useEffect } from 'react';
import Header from '../../layouts/header';
import Sidebar from '../../layouts/Sidebar';
import Footer from '../../layouts/Footer';
import axios from 'axios';
import Select from 'react-select';
import Swal from 'sweetalert2';
import { Spinner } from 'react-bootstrap';
const attendance_check_in = () => {
  const [employees, setEmployees] = useState([]);
  const [valuedata, setValuedata] = useState([]);
  const [checkin, setCheckin] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [showSpinner, setShowSpinner] = useState(true);
  const getEmployees = async () => {
    const fetchData = await axios.get("http://localhost:8080/employee/");
    setEmployees(fetchData.data);

    const valuedata = fetchData.data.map((item) => ({
      value: item.firstname + ' ' + item.lastname,
      label: `${item.firstname} ${item.lastname}`,
    }));
    setValuedata(valuedata);
  }

  useEffect(() => {
    getEmployees();
    let timer = setInterval(() => {
      setShowSpinner(false);
    }, 200);
    return () => setInterval(timer);
  }, []);


  const SaveData = async (e) => {
    e.preventDefault();
    const fetchData = await axios.post("http://localhost:8080/attendance/", {
      employee_id: selectedData,
      check_in: checkin + ':00'
    });
    if (fetchData.data) {
      Swal.fire('Success', 'The Employee named ' + selectedData + ' is check in', 'success').then((result) => {
        if (result.isConfirmed) {
          setCheckin('');
          setSelectedData('');
        }
      });
    }
  }
  return (
    <>
      <Sidebar />
      <div className="body-wrapper">
        <Header />
        <div className="container-fluid">
          {showSpinner && (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '70vh' }}>
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          )}
          {!showSpinner && (
            <div className="card">
              <div className="card-body">
                <h5>Check In Employee</h5> <br />
                <form onSubmit={SaveData}>
                  <div>
                    <label><i className="ti ti-user me-2 fs-4 ml-1" />Employee Name</label>
                    <Select
                      className="form-floating mb-3 mt-3"
                      id="status"
                      placeholder="Select Employee"
                      isSearchable
                      isLoading={false}
                      options={valuedata}
                      onChange={(selectedData) => setSelectedData(selectedData.value)}
                    />
                  </div>
                  <div className="form-floating mb-3 mt-3">
                    <input type="time"
                      className="form-control form-group"
                      value={checkin}
                      onChange={(e) => setCheckin(e.target.value)}
                    />
                    <label><i className="ti ti-clock me-2 fs-4" />Check In</label>

                  </div>
                  <div className="mt-3 mt-md-0 ms-auto">
                    <button type="submit" className="btn btn-primary rounded-pill">
                      <div className="d-flex align-items-center">
                        <i className="ti ti-send me-2 fs-4" />
                        Submit
                      </div>
                    </button>

                  </div>
                </form>
              </div>
            </div>
          )}
        </div>

        <Footer />

      </div>
    </>
  )
}

export default attendance_check_in;