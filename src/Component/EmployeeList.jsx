import { useEffect, useState } from "react";
import hotelService from "../Services/employeeService";
import { Link } from "react-router-dom";
import '../border.css'
const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [filteredEmployees, setFilteredEmployees] = useState([]);

    const init = () => {
        hotelService.getAll().then(response => {
            console.log('printing hotels data', response.data);
            setEmployees(response.data);
            setFilteredEmployees(response.data);
        })
        .catch(error => {
            console.log('Something went wrong', error);
        });
    };

    useEffect(() => {
        init();
    }, []);

    const handleDelete = (id) => {
        console.log('Printing id', id);
        hotelService.remove(id).then(response => {
            console.log('hotel deleted successfully', response.data);
            init();
        })
        .catch(error => {
            console.log('Something went wrong', error);
        });
    };

    const handleSearch = () => {
        const keyword = searchKeyword.toLowerCase();

        const filtered = employees.filter(employee =>
            employee.id.toString().includes(keyword) ||
            employee.name.toLowerCase().includes(keyword) ||
            employee.gmailid.toLowerCase().includes(keyword) ||
            employee.createdDate.toLowerCase().includes(keyword)
        );

        setFilteredEmployees(filtered);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div>
            <div>
            <div className="oneq">
                    <div className='twoq'>
                        <div className='threeq'>
                             <Link to='/EmployeeList' className='btn'>Home</Link>
                        </div>
                         <div className='fourq'>
                            <Link to='/EmployeeList' className='btn'>Employee List</Link>
                        </div>
                        <div className='fiveq'>
                            <Link to='/' className='btn'>Log Out</Link>
                        </div>
                    </div>
                    <div className='oneoneq'>
                        Employee List
                    </div>
                </div>

                <table className="table table-bordered table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <th colSpan={7}><div className="" style={{marginLeft:'86%'}}>Total Count : {filteredEmployees.length}</div></th>
                            <th> <Link to='/AddEmployeeList' className="btn btn-success">Create Employee</Link></th>
                        </tr>
                        <tr>
                            <th colSpan={7}><div className="" style={{ marginLeft: '90%' }}>Search</div></th>
                            <th>
                                <input
                                    placeholder="Enter search keywords"
                                    value={searchKeyword}
                                    onChange={(e) => setSearchKeyword(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                />
                            </th>
                        </tr>
                        <tr>
                            <th>Id</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Gmail id</th>
                            <th>Designation</th>
                            <th>Gender</th>
                            <th>Created Date</th>
                            <th>Modify</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEmployees.length > 0 ? (
                            filteredEmployees.map(employee => (
                                <tr key={employee.id}>
                                    <td>{employee.id}</td>
                                    <td>
                                    <img className="ms-5 im" src={require(`../EmployeeImage/${employee.fileName}`)}></img>
                                    </td>
                                    <td>{employee.name}</td>
                                    <td>{employee.gmailid}</td>
                                    <td>{employee.designation}</td>
                                    <td>{employee.gender}</td>
                                    <td>{employee.createdDate}</td>
                                    <td>
                                        <Link to={`/EditEmployee/${employee.id}`} className="btn btn-info">Edit</Link>
                                        <button className="btn btn-danger ms-1" onClick={() => handleDelete(employee.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" style={{ textAlign: 'center' }}>No results found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmployeeList;




// import React, { useState, useEffect } from 'react';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import 'primereact/resources/themes/saga-blue/theme.css';  // Choose a theme
// import 'primereact/resources/primereact.min.css';
// import 'primeicons/primeicons.css';
// import employeeService from '../Services/employeeService'; // Adjust the import path if necessary
// import '../border.css'
// const EmployeeList = () => {
//     const [employees, setEmployees] = useState([]);

//     useEffect(() => {
//         // Fetch all employees
//         employeeService.getAll()
//             .then(response => setEmployees(response.data))
//             .catch(error => console.error('Error fetching employee data:', error));
//     }, []);

//     return (
//         <div className="datatable-responsive">
//             <DataTable value={employees} paginator rows={10} className="p-datatable-responsive-demo">
//                 <Column field="id" header="ID" sortable></Column>
//                 <Column field="name" header="Name" sortable></Column>
//                 <Column field="gmailid" header="Email" sortable></Column>
//                 <Column field="mobileno" header="Mobile No" sortable></Column>
//                 <Column field="designation" header="Designation" sortable></Column>
//                 <Column field="gender" header="Gender" sortable></Column>
//                 <Column field="createdDate" header="Created Date" sortable></Column>
                
//             </DataTable>
//         </div>
//     );
// }

// export default EmployeeList;


// import React, { useState, useEffect } from 'react';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import { Button } from 'primereact/button';
// import 'primereact/resources/themes/saga-blue/theme.css';  // Choose a theme
// import 'primereact/resources/primereact.min.css';
// import 'primeicons/primeicons.css';
// import employeeService from '../Services/employeeService'; // Adjust the import path if necessary
    

// const EmployeeList = () => {
//     const [employees, setEmployees] = useState([]);

//     useEffect(() => {
//         fetchEmployees();
//     }, []);

//     const fetchEmployees = () => {
//         employeeService.getAll()
//             .then(response => setEmployees(response.data))
//             .catch(error => console.error('Error fetching employee data:', error));
//     };

//     const editEmployee = (employee) => {
//         console.log('Edit employee:', employee);
//         // Implement the edit logic here
//         // For example, open a modal with employee data for editing
//     };

//     const deleteEmployee = (employeeId) => {
//         console.log('Delete employee:', employeeId);
//         employeeService.delete(employeeId)
//             .then(() => {
//                 fetchEmployees(); // Refresh the employee list after deletion
//             })
//             .catch(error => console.error('Error deleting employee:', error));
//     };

//     const actionBodyTemplate = (rowData) => {
//         return (
//             <React.Fragment>
//                 <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => editEmployee(rowData.id)} />
//                 <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => deleteEmployee(rowData.id)} />
//             </React.Fragment>
//         );
//     };

//     return (
//         <div className="datatable-container">
//             <DataTable value={employees} paginator rows={10} className="p-datatable-responsive-demo">
//                 <Column field="id" header="ID" sortable></Column>
//                 <Column field="name" header="Name" sortable></Column>
//                 <Column field="gmailid" header="Email" sortable></Column>
//                 <Column field="mobileno" header="Mobile No" sortable></Column>
//                 <Column field="designation" header="Designation" sortable></Column>
//                 <Column field="gender" header="Gender" sortable></Column>
//                 <Column field="createdDate" header="Created Date" sortable></Column>
//                 <Column body={actionBodyTemplate} header="Actions" style={{ textAlign: 'center', width: '8em' }} />
//             </DataTable>
//         </div>
//     );
// }

// export default EmployeeList;
