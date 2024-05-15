// Import the Header component from the layouts/header directory
import Header from '../../layouts/header'
// Import the Sidebar component from the layouts/Sidebar directory
import Sidebar from '../../layouts/Sidebar';
// Import the Footer component from the layouts/Footer directory
import Footer from '../../layouts/Footer'
import { useNavigate } from 'react-router-dom';

import {
    IconUser,
    IconUserShield,
    IconDoorEnter,
    IconDoorExit
} from '@tabler/icons-react';

import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';

import { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';

import moment from 'moment-timezone';
function dashboard() {
    const [showSpinner, setShowSpinner] = useState(true);
    const [countEmployee, setCountEmployee] = useState(0);
    const [CountAdmin, setCountAdmin] = useState(0);
    const [CountAttendanceCheckin, setCountAttendanceheckin] = useState(0);
    const [CountAttendanceCheckout, setCountAttendanceheckout] = useState(0);
    const [CheckinData, setCheckinData] = useState([]);
    const [CheckoutData, setCheckoutData] = useState([]);

    const getCountUser = async () => {

        const EmployeeData = await fetch('http://localhost:8080/employee/');
        const employee = await EmployeeData.json();
        setCountEmployee(employee.length);
        const AdminData = await fetch('http://localhost:8080/admin/');
        const admin = await AdminData.json();
        setCountAdmin(admin.length);
        const AttendanceData = await fetch('http://localhost:8080/attendance/');
        const attendance = await AttendanceData.json();

        // check to see the date is today

        // set date timezone to manila
        const now = moment.tz('Asia/Manila');

        const today = now.format('YYYY-MM-DD');
        const attendanceToday = attendance.filter(item => item.date === today);
        const checkinToday = attendanceToday.filter(item => item.check_in !== null);
        setCheckinData(checkinToday);
        const checkoutToday = attendanceToday.filter(item => item.check_out !== null);
        setCheckoutData(checkoutToday);

        setCountAttendanceheckin(checkinToday.length);
        setCountAttendanceheckout(checkoutToday.length);
    }


    const CheckinColumns = [
        { name: 'Employee Name', selector: row => row.employee_id, sortable: true },
        { name: 'Check In', selector: row => row.check_in, sortable: true },
    ];
    const CheckoutColumns = [
        { name: 'Name', selector: row => row.employee_id, sortable: true },
        { name: 'Check Out', selector: row => row.check_out, sortable: true },
    ];

    const navigate = useNavigate();
    if (!sessionStorage.getItem('session')) {
        navigate('/unautorized');
    }

    useEffect(() => {
        getCountUser();
        const timer = setTimeout(() => {
            setShowSpinner(false);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div>
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
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="card bg-primary-subtle shadow-none card-hover">
                                        <div className="card-body">
                                            <div className="row alig n-items-start">
                                                <div className="col-8">
                                                    <h5 className="card-title mb-9 fw-semibold"> Employee Number </h5>
                                                    <h4 className="fw-semibold mb-3">{countEmployee} Employees</h4>
                                                </div>
                                                <div className="col-4">
                                                    <div className="d-flex justify-content-end">
                                                        <div className="text-white bg-secondary rounded-circle p-6 d-flex align-items-center justify-content-center">
                                                            <IconUser />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="card bg-secondary-subtle shadow-none card-hover">
                                        <div className="card-body">
                                            <div className="row alig n-items-start">
                                                <div className="col-8">
                                                    <h5 className="card-title mb-9 fw-semibold"> Admin Members </h5>
                                                    <h4 className="fw-semibold mb-3">{CountAdmin} Admins</h4>
                                                </div>
                                                <div className="col-4">
                                                    <div className="d-flex justify-content-end">
                                                        <div className="text-white bg-secondary rounded-circle p-6 d-flex align-items-center justify-content-center">
                                                            <IconUserShield />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="card bg-success-subtle shadow-none card-hover">
                                        <div className="card-body">
                                            <div className="row alig n-items-start">
                                                <div className="col-8">
                                                    <h5 className="card-title mb-9 fw-semibold">Employee Check-in Today </h5>
                                                    <h4 className="fw-semibold mb-3"> {CountAttendanceCheckin} </h4>
                                                </div>
                                                <div className="col-4">
                                                    <div className="d-flex justify-content-end">
                                                        <div className="text-white bg-secondary rounded-circle p-6 d-flex align-items-center justify-content-center">
                                                            <IconDoorEnter />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="card bg-danger-subtle shadow-none card-hover">
                                        <div className="card-body">
                                            <div className="row alig n-items-start">
                                                <div className="col-8">
                                                    <h5 className="card-title mb-9 fw-semibold"> Employee Check-out Today</h5>
                                                    <h4 className="fw-semibold mb-3"> {CountAttendanceCheckout}  </h4>

                                                </div>
                                                <div className="col-4">
                                                    <div className="d-flex justify-content-end">
                                                        <div className="text-white bg-secondary rounded-circle p-6 d-flex align-items-center justify-content-center">
                                                            <IconDoorExit />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-6 d-flex align-items-stretch">
                                    <div className="card w-100">
                                        <div className="card-body p-4">
                                            <div className="mb-4">
                                                <h5 className="card-title fw-semibold">Check in List</h5>
                                            </div>
                                            <DataTableExtensions
                                                columns={CheckinColumns}
                                                data={CheckinData}
                                                print={false}
                                                export={false}
                                            >
                                                <DataTable columns={CheckinColumns} data={CheckinData} pagination responsive striped highlightOnHover />
                                            </DataTableExtensions>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 d-flex align-items-stretch">
                                    <div className="card w-100">
                                        <div className="card-body p-4">
                                            <h5 className="card-title fw-semibold mb-4">Check Out List</h5>
                                            <div className="table-responsive">
                                                <DataTableExtensions
                                                    columns={CheckoutColumns}
                                                    data={CheckoutData}
                                                    print={false}
                                                    export={false}
                                                >
                                                    <DataTable columns={CheckoutColumns} data={CheckoutData} pagination responsive striped highlightOnHover />
                                                </DataTableExtensions>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    )}
                </div>
                <Footer />
            </div>
        </div>

    )
}

export default dashboard