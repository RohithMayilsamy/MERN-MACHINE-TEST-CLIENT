import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Home from './Home';
import AdminPage from './Component/AdminPage';
import EmployeeList from './Component/EmployeeList';
import EditEmployee from './Component/EditEmployee.jsx';

function App() {
  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/admin" element={<AdminPage/>} />
        <Route exact path="/EmployeeList" element={<EmployeeList/>} />
        <Route exact path="/AddEmployeeList" element={<EditEmployee/>} />
        <Route exact path="//EditEmployee/:id" element={<EditEmployee/>} />
      </Routes>
      
    </BrowserRouter>
  </div>
);
}

export default App;
