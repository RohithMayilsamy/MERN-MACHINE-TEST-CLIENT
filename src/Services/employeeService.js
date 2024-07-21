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

export default{getAll,create,get,update,remove}