import { useEffect, useState } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import { IconCirclePlus } from "@tabler/icons-react"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
const Employee_Modal_Add = () => {
    const [FirstName, setFirstName] = useState('');
    const [LastName, setLastName] = useState('');
    const [Email, setEmail] = useState('');
    const [Address, setAddress] = useState('');
    const [Phone, setPhone] = useState('');
    const [Position, setPosition] = useState('');
    const [Department, setDepartment] = useState('');
    const [Salary, setSalary] = useState('');
    const [Gender, setGender] = useState('');
    const [Birthdate, setBirthdate] = useState('');
    const [Status, setStatus] = useState('');
    const SaveData = async (e) => {
        e.preventDefault();
        if (!FirstName) {
            return Swal.fire('Error', 'Please enter a first name', 'error');
        }
        if (!LastName) {
            return Swal.fire('Error', 'Please enter a last name', 'error');
        }
        if (!Email) {
            return Swal.fire('Error', 'Please enter an email', 'error');
        }
        if (!Address) {
            return Swal.fire('Error', 'Please enter an address', 'error');
        }
        if (!Phone) {
            return Swal.fire('Error', 'Please enter a phone number', 'error');
        }
        if (!Position) {
            return Swal.fire('Error', 'Please select a position', 'error');
        }
        if (!Department) {
            return Swal.fire('Error', 'Please select a department', 'error');
        }
        if (!Salary || isNaN(Salary)) {
            return Swal.fire('Error', 'Please enter a salary', 'error');
        }
        const response = await axios.post("http://localhost:8080/employee/", {
            firstname: FirstName,
            lastname: LastName,
            email: Email,
            address: Address,
            phone: Phone,
            position: Position,
            department: Department,
            salary: Salary,
            gender: Gender,
            birthdate: Birthdate,
            status: Status
        }).then(
            Swal.fire('Loading Please Wait', '', 'info')
        )
        console.log(response)
        if (response.status === 200) {
            Swal.fire('Success', 'The Employee named ' + FirstName + ' is added', 'success').then((result) => {
                handleClose(); // Close the modal
                //remove the value input field
                setFirstName(''); setLastName(''); setEmail(''); setAddress(''); setPhone(''); setPosition(''); setDepartment(''); setSalary(''); setGender(''); setBirthdate(''); setStatus('');
            })
        }
    }
    // Define a state variable for the data
    const [getDepartment, setgetDepartment] = useState([]);
    const [getPosition, setgetPosition] = useState([]);

    // Call the API to fetch the  data
    const getSelectData = async () => {
        const FetchPosition = await axios.get('http://localhost:8080/position/');
        setgetPosition(FetchPosition.data);
        const FetchDepartment = await axios.get('http://localhost:8080/department/');
        setgetDepartment(FetchDepartment.data);
    };

    // Call the API when the component mounts
    useEffect(() => {
        getSelectData()
    }, []);
    // Modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
    };


    return (
        // Create a Modal That Add Employees
        <>

            <Button variant="primary" onClick={handleShow}> <IconCirclePlus />Add</Button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size='lg'
            >
                <Modal.Header>
                    <Modal.Title>Add Employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="form-horizontal r-separator" onSubmit={SaveData}>
                        <div className="card-body m-3">
                            <h5>Personal Info</h5>
                            <div className="form-group mb-0">
                                <div className="row align-items-center">
                                    <label htmlFor="inputText1" className="col-3 text-end control-label col-form-label">First Name</label>
                                    <div className="col-9 border-start pb-2 pt-2">
                                        <input type="text"
                                            className="form-control"
                                            id="fname"
                                            placeholder="First Name Here"
                                            value={FirstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group mb-0">
                                <div className="row align-items-center">
                                    <label htmlFor="inputText2" className="col-3 text-end control-label col-form-label">Last Name</label>
                                    <div className="col-9 border-start pb-2 pt-2">
                                        <input type="text"
                                            className="form-control"
                                            id="lname"
                                            placeholder="Last Name Here"
                                            value={LastName}
                                            onChange={(e) => setLastName(e.target.value)} />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group mb-0">
                                <div className="row align-items-center">
                                    <label htmlFor="inputEmail1" className="col-3 text-end control-label col-form-label">Email</label>
                                    <div className="col-9 border-start pb-2 pt-2">
                                        <input type="email"
                                            className="form-control"
                                            id="inputEmail1"
                                            value={Email}
                                            placeholder='Enter Email Here'
                                            onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group mb-0">
                                <div className="row align-items-center">
                                    <label htmlFor="inputEmail1" className="col-3 text-end control-label col-form-label">Birthday</label>
                                    <div className="col-9 border-start pb-2 pt-2">
                                        <input type="date"
                                            className="form-control"
                                            id="inputEmail1"
                                            value={Birthdate}
                                            onChange={(e) => setBirthdate(e.target.value)} />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group mb-0">
                                <div className="row align-items-center">
                                    <label htmlFor="inputText2" className="col-3 text-end control-label col-form-label">Address</label>
                                    <div className="col-9 border-start pb-2 pt-2">
                                        <input type="text"
                                            className="form-control"
                                            id="lname"
                                            placeholder="Enter Address Here"
                                            value={Address}
                                            onChange={(e) => setAddress(e.target.value)} />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group mb-0">
                                <div className="row align-items-center">
                                    <label htmlFor="inputText3" className="col-3 text-end control-label col-form-label">Gender</label>
                                    <div className="col-9 border-start pb-2 pt-2">
                                        <select className="form-select mr-sm-2"
                                            value={Gender} onChange={(e) => setGender(e.target.value)}>
                                            <option selected>Choose...</option>
                                            <option value={"Male"}>Male</option>
                                            <option value={"Female"}>Female</option>
                                            <option value={"Non-Binary"}>Non-Binary</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group mb-0">
                                <div className="row align-items-center">
                                    <label htmlFor="inputEmail1" className="col-3 text-end control-label col-form-label">Contact Num</label>
                                    <div className="col-9 border-start pb-2 pt-2">
                                        <input type="tel"
                                            className="form-control"
                                            id="contact"
                                            placeholder="Enter Number Here : [0-9]{3}-[0-9]{3}-[0-9]{4}"
                                            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                            value={Phone}
                                            onChange={(e) => setPhone(e.target.value)} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-body text-bg-light">
                            <h4 className="card-title mt-2 pb-3">Employee Type</h4>
                            <div className="form-group mb-0">
                                <div className="row align-items-center">
                                    <label htmlFor="inputText3" className="col-3 text-end control-label col-form-label">Position</label>
                                    <div className="col-9 border-start pb-2 pt-2">
                                        <select
                                            className='form-select'
                                            id='position'
                                            value={Position}
                                            onChange={(e) => setPosition(e.target.value)}
                                        >
                                            <option value="">Choose Position</option>
                                            {getPosition.map((item, index) => (
                                                <option key={index} value={item.position}>{item.position}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group mb-0">
                                <div className="row align-items-center">
                                    <label htmlFor="inputSelect1" className="col-3 text-end control-label col-form-label">Department</label>
                                    <div className="col-9 border-start pb-2 pt-2">
                                        <select
                                            className="form-select"
                                            value={Department}
                                            onChange={(e) => setDepartment(e.target.value)}
                                            id="deparmtent">
                                            <option value="">Choose Department</option>
                                            {getDepartment.map((item, index) => (
                                                <option key={index} value={item.department}>{item.department}</option>
                                            ))}
                                        </select>

                                    </div>
                                </div>
                            </div>
                            <div className="form-group mb-0">
                                <div className="row align-items-center">
                                    <label htmlFor="inputText2" className="col-3 text-end control-label col-form-label">Salary</label>
                                    <div className="col-9 border-start pb-2 pt-2">
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="inputText2"
                                            placeholder="Enter Salary Here"
                                            value={Salary}
                                            onChange={(e) => setSalary(e.target.value)} />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group mb-0">
                                <div className="row align-items-center">
                                    <label htmlFor="inputSelect1" className="col-3 text-end control-label col-form-label">Employment Status</label>
                                    <div className="col-9 border-start pb-2 pt-2">
                                        <select
                                            className="form-select"
                                            id="status"
                                            value={Status}
                                            onChange={(e) => setStatus(e.target.value)}>
                                            <option value="">Choose Your Option</option>
                                            <option value="Full-Time">Full Time</option>
                                            <option value="Part-Time">Part Time</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body m-3">
                                <div className="form-group mb-0 text-end">
                                    <button type="button" className="btn btn-gray rounded-pill px-4 ms-2" onClick={handleClose}>
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn btn-primary rounded-pill px-4">
                                        Save
                                    </button>

                                </div>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>

    )
}

export default Employee_Modal_Add