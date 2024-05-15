import Login from './components/auth/login'
import Error404 from './components/auth/error404'
import ProtectedRoutes from './components/auth/protectedroutes'



import Dashboard from './components/admin/User/dashboard'
import Department from './components/admin/User/department'
import Position from './components/admin/User/position'
import Employee from './components/admin/User/employee'

import Attendance from './components/admin/User/attendance'
import Attendance_check_in from './components/admin/User/attendance_check_in'
import Attendance_check_out from './components/admin/User/attendance_check_out'

import Reports from './components/admin/Payroll/payroll_reports'
import React from 'react';

import Calendar from './components/admin/Payroll/payroll_calendar'
import Benefits from './components/admin/Payroll/payroll_benefits'
import Deductions from './components/admin/Payroll/payroll_deductions'

import TaxInfo from './components/admin/Tax/tax_info'
import TaxTable from './components/admin/Tax/tax_table'
import SuperAdmin from './components/admin/SuperAdmin/SuperAdmin'
// Import BrowserRouter, Routes, and Route from react-router-dom
import { BrowserRouter, Routes, Route } from 'react-router-dom';


//modals


function App() {
  // This is the root component that sets up client-side routing for the application.
  // It uses the `BrowserRouter` and `Routes` components from 'react-router-dom' to define a set of `Route`s.
  // Each `Route` maps a path to a component that should be rendered when the application's URL matches that path.
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='*' element={<Error404 />} />
        <Route path="/unautorized" element={<ProtectedRoutes />} />
        {/* protected routes */}
        < Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Department" element={<Department />} />
        <Route path="/Position" element={<Position />} />
        <Route path="/Attendance" element={<Attendance />} />
        <Route path="/Attendance/Check_in" element={<Attendance_check_in />} />
        <Route path="/Attendance/Check_out" element={<Attendance_check_out />} />

        <Route path="/Employee" element={<Employee />} />
        <Route path="/PayrollCalendar" element={<Calendar />} />

        <Route path="/PayrollReports" element={<Reports />} />
        <Route path="/PayrollBenefits" element={<Benefits />} />
        <Route path="/PayrollDeductions" element={<Deductions />} />

        <Route path="/TaxInfo" element={<TaxInfo />} />
        <Route path="/TaxTable" element={<TaxTable />} />

        <Route path="/SuperAdmin" element={<SuperAdmin />} />

      </Routes>
    </BrowserRouter >


  )
}

export default App
