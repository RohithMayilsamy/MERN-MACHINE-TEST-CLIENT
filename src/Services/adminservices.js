import httpClient from "../http-common";
const getAll = () =>
{
    return httpClient.get('admin');
}
const create = (data) =>
{
    return httpClient.post("/admin",data);
}
const get = (id) =>
{
    return httpClient.get(`/admin/${id}`);
}
const update = (data) =>
{
    return httpClient.put('/admin',data);
}
const remove =(id)=>
{

    return httpClient.delete(`/admin/${id}`);
}

const login = (data) => {
    return httpClient.post("/admin", data);
}

export default { getAll, create, get, update, remove, login };
