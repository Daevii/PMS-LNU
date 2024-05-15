import React from 'react';
import { Link } from 'react-router-dom';
import {
    IconUser,
    IconListDetails,
    IconSection,
    IconCalendarClock,
    IconWallet,
    IconFileReport,
    IconTransactionDollar,
    IconGiftCard,
    IconIndentDecrease,
    IconReceiptTax,
    IconReceipt,
    IconUserShield,
    IconLogout,
    IconUserX,
    IconUsersPlus,


} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Sidebar = () => {
    const navigate = useNavigate();

    const Logout = () => {
        // Clear session data from session storage
        sessionStorage.removeItem('session');
        navigate('/');
        Swal.fire('Success', 'Logout Successfully', 'success');


    }
    return (
        <aside className="left-sidebar with-vertical">
            < div >
                <div className="brand-logo d-flex align-items-center justify-content-between">
                    <Link to="/Dashboard" className="text-nowrap logo-img">
                        <img src="../assets/images/backgrounds/Lyceumheader.png" width={190} alt="Logo" />
                    </Link>
                    <div className="close-btn d-xl-none d-block ms-auto fs-6" data-sidebar-close="">x</div>
                </div>
                {/* Sidebar navigation*/}
                <nav className="sidebar-nav scroll-sidebar" data-simplebar>
                    <ul id="sidebarnav">
                        <li className="nav-small-cap">
                            <i className="ti ti-dots nav-small-cap-icon fs-4" />
                            <span className="hide-menu">Dashboard</span>
                        </li>
                        <li className="sidebar-item">
                            <Link to="/Dashboard" className="sidebar-link" aria-expanded="false">
                                <i className="ti ti-layout-dashboard" />
                                <span className="hide-menu">Dashboard</span>
                            </Link>
                        </li>
                        <li className="nav-small-cap">

                            <i className="ti ti-dots nav-small-cap-icon fs-4" />
                            <span className="hide-menu">Employees</span>
                        </li>
                        <li className="sidebar-item">
                            <Link to="/Employee" className="sidebar-link" aria-expanded="false">
                                <IconUser />
                                <span className="hide-menu">Employee Table</span>
                            </Link>
                        </li>
                        <li className="sidebar-item">
                            <Link to="/Department" className="sidebar-link" aria-expanded="false">
                                <IconListDetails />
                                <span className="hide-menu">Department Table</span>
                            </Link>
                        </li>
                        <li className="sidebar-item">
                            <Link to="/Position" className="sidebar-link" aria-expanded="false">
                                <IconSection />
                                <span className="hide-menu">Position Table</span>
                            </Link>
                        </li>
                        <li className="sidebar-item">
                            <Link to="/Attendance" className="sidebar-link" aria-expanded="false">
                                <IconCalendarClock />
                                <span className="hide-menu">Time and Attendance</span>
                            </Link>
                        </li>
                        <li className="sidebar-item">
                            <Link to="/Attendance/Check_in" className="sidebar-link" aria-expanded="false">
                                <IconUsersPlus />
                                <span className="hide-menu">Employee Check-in</span>
                            </Link>
                        </li>
                        <li className="sidebar-item">
                            <Link to="/Attendance/Check_out" className="sidebar-link" aria-expanded="false">
                                <IconUserX />
                                <span className="hide-menu">Employee Check-out</span>
                            </Link>
                        </li>

                        <li className="nav-small-cap">
                            <i className="ti ti-dots nav-small-cap-icon fs-4" />
                            <span className="hide-menu">Payroll Table</span>
                        </li>
                        <li className="sidebar-item">
                            <Link to="/PayrollCalendar" className="sidebar-link" aria-expanded="false">
                                <IconWallet />
                                <span className="hide-menu">Payroll Calendar</span>
                            </Link>
                        </li>
                        <li className="sidebar-item">
                            <Link to="/PayrollReports" className="sidebar-link" aria-expanded="false">
                                <IconFileReport />
                                <span className="hide-menu">Payroll Reports</span>
                            </Link>
                        </li>

                        <li className="sidebar-item">
                            <Link to="/PayrollBenefits" className="sidebar-link" aria-expanded="false">
                                <IconGiftCard />
                                <span className="hide-menu">Payroll Benefits</span>
                            </Link>
                        </li>
                        <li className="sidebar-item">
                            <Link to="/PayrollDeductions" className="sidebar-link" aria-expanded="false">
                                <IconIndentDecrease />
                                <span className="hide-menu">Payroll Deductions</span>
                            </Link>
                        </li>


                        <li className="nav-small-cap">
                            <i className="ti ti-dots nav-small-cap-icon fs-4" />
                            <span className="hide-menu">Tax</span>
                        </li>
                        <li className="sidebar-item">
                            <Link to="/TaxInfo" className="sidebar-link" aria-expanded="false">
                                <IconReceiptTax />
                                <span className="hide-menu">Tax Information</span>
                            </Link>
                        </li>
                        <li className="sidebar-item">
                            <Link to="/TaxTable" className="sidebar-link" aria-expanded="false">
                                <IconReceipt />
                                <span className="hide-menu">Tax Table</span>
                            </Link>
                        </li>
                        <li className="nav-small-cap">
                            <i className="ti ti-dots nav-small-cap-icon fs-4" />
                            <span className="hide-menu">Other</span>
                        </li>
                        <li className="sidebar-item">
                            <Link to="/SuperAdmin" className="sidebar-link" aria-expanded="false">
                                <IconUserShield />
                                <span className="hide-menu">Admin Table</span>
                            </Link>
                        </li>
                    </ul>

                    <div className="unlimited-access hide-menu bg-light-primary position-relative mb-7 mt-5 rounded">
                        <div className="hstack gap-3">
                            <div className="d-flex">
                                <div className="unlimited-access-title">
                                    <button onClick={Logout} target="_blank" className="btn btn-primary fs-2 fw-semibold lh-sm"> <IconLogout />  Logout</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* End Sidebar navigation */}
            </div >

        </aside>
    )
}

export default Sidebar;