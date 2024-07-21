import httpClient from "../http-common.js";
const getAll = ()=>
{
    return httpClient.get('/employees');
}
const create = (data, config) =>
{
    return httpClient.post("/employees", data, config).then((response)=> response.data);
}
const get = id =>
{
    return httpClient.get(`/employees/${id}`);
}
const update = (id, data,config) =>
    {
        return httpClient.put(`/employees/${id}`, data, config).then((response)=> response.data); 
    }
    
const remove = id =>
{
    return httpClient.delete(`/employees/${id}`);
}


// Add this function to check for duplicate emails
const checkEmailDuplicate = (email) => {
    return httpClient.get(`/employees/checkEmailDuplicate?email=${email}`);
}

export default { getAll, create, get, update, remove, checkEmailDuplicate }