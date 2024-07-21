import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import placesService from "../Services/employeeService";

const EditEmployee = () => {
    const [name, setName] = useState('');
    const [file, setFile] = useState(null); // Initialize to null
    const [gmailid, setGmailid] = useState('');
    const [mobileno, setMobileno] = useState('');
    const [designation, setDesignation] = useState('');
    const [gender, setGender] = useState('');
    const [course, setCourse] = useState([]); // Initialize to an empty array
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            placesService.get(id).then(place => {
                setName(place.data.name);
                setGmailid(place.data.gmailid);
                setMobileno(place.data.mobileno);
                setDesignation(place.data.designation);
                setGender(place.data.gender);
                setCourse(place.data.course.split(',')); // Assuming course is a comma-separated string
            })
                .catch(error => {
                    console.log('Something went wrong', error);
                })
        }
    }, [id]);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    const handleCourseChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setCourse([...course, value]);
        } else {
            setCourse(course.filter(c => c !== value));
        }
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateMobile = (mobile) => {
        const mobileRegex = /^\d{10}$/;
        return mobileRegex.test(mobile);
    };

    const checkDuplicateEmail = async (email) => {
        const response = await placesService.checkEmailDuplicate(email);
        return response.data.isDuplicate;
    };

    const saveEmployee = async (e) => {
        e.preventDefault();
        
        try {
            if (!name || !gmailid || !file || !mobileno || !designation || !gender || !course.length) {
                throw new Error('Please fill in all fields.');
            }

            if (!validateEmail(gmailid)) {
                throw new Error('Invalid email format.');
            }

            if (!validateMobile(mobileno)) {
                throw new Error('Invalid mobile number. Must be 10 digits.');
            }

            const isDuplicate = await checkDuplicateEmail(gmailid);
            if (isDuplicate) {
                throw new Error('Email already exists.');
            }

            const formData = new FormData();
            formData.append("name", name);
            formData.append("gmailid", gmailid);
            formData.append("file", file); // Append selected file to FormData
            formData.append("mobileno", mobileno);
            formData.append("designation", designation);
            formData.append("gender", gender);
            formData.append("course", course.join(',')); // Convert array to comma-separated string

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
            
            let response;
            if (id) {
                response = await placesService.update(id, formData, config);
                console.log('Employee data updated successfully:', response.data);
                
            } else {
                response = await placesService.create(formData, config);
                console.log('Employee added successfully:', response.data);
            }

            navigate('/EmployeeList'); // Redirect user to home page after successful operation
        } catch (error) {
            console.error('Error saving employee data:', error);
            setError(error.response?.data?.message || error.message || 'Failed to save employee data. Please try again later.');
        }
    }

    return (
        <div className="container-fluid">
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
            <form onSubmit={saveEmployee}>
                <div className="form-group mt-3">
                    <input type="text" className="form-control col-4" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter  Name" />
                </div>
                <div className="form-group mt-2">
                    <input type="file" className="form-control col-4" onChange={handleFileChange} />
                </div>
                <div className="form-group mt-2">
                    <input type="text" className="form-control col-4" value={gmailid} onChange={(e) => setGmailid(e.target.value)} placeholder="Enter the Gmail " />
                </div>
                <div className="form-group mt-2">
                    <input type="text" className="form-control col-4" value={mobileno} onChange={(e) => setMobileno(e.target.value)} placeholder="Enter Mobile NO" />
                </div>
                <div className="form-group mt-2">
                    <select className="form-control col-4" value={designation} onChange={(e) => setDesignation(e.target.value)}>
                        <option value="">Select Designation</option>
                        <option value="HR">HR</option>
                        <option value="Manager">Manager</option>
                        <option value="Sales">Sales</option>
                    </select>
                </div>
                <div className="form-group mt-2">
                    <label>Gender:</label><br />
                    <input type="radio" value="Male" checked={gender === "Male"} onChange={(e) => setGender(e.target.value)} /> Male
                    <input type="radio" value="Female" checked={gender === "Female"} onChange={(e) => setGender(e.target.value)} /> Female
                </div>
                <div className="form-group mt-2">
                    <label>Course:</label><br />
                    <input type="checkbox" value="MCA" checked={course.includes("MCA")} onChange={handleCourseChange} /> MCA
                    <input type="checkbox" value="BCA" checked={course.includes("BCA")} onChange={handleCourseChange} /> BCA
                    <input type="checkbox" value="BSc" checked={course.includes("BSc")} onChange={handleCourseChange} /> BSc
                </div>
                <div>
                    <button type="submit" className="btn btn-success mt-2">
                        {id ? 'Update' : 'Save'}
                    </button>
                </div>
            </form>
            <hr />
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
}

export default EditEmployee;
