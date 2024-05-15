import axios from 'axios';
import Swal from 'sweetalert2'
import Button from 'react-bootstrap/Button';
import { IconTrash } from '@tabler/icons-react';
import React from 'react'

const Employee_Delete = (id) => {

    const deletedata = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete('http://localhost:8080/employee/' + id.Deleteid).then((response) => {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Employee has been deleted.",
                        icon: "success"

                    })
                })
            } else {
                Swal.fire({
                    title: "Cancelled!",
                    text: "Employee Deletion process is cancelled.",
                })
            }

        })
    }

    return (
        <>
            <Button className="btn btn-light btn-danger btn-sm" onClick={deletedata} >
                <IconTrash style={{ color: 'red' }} />
            </Button>
        </>

    )
}

export default Employee_Delete