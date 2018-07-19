import axios from "axios";

export default {
    findBarcode: (UPC) => {
        return axios.get(`/api/find/${UPC}`);
    },
    getItems: (userId) => {
        return axios.get(`/api/${userId}/items`);
    },
    getUserTags: (userId) => {
        return axios.get(`/api/${userId}/tags`);
    },
    addItem: (item) => {
        return axios.post(`/api/additem`, item);
    },
    deleteItem: (id) => {
        return axios.post(`/api/delete/${id}`);
    },
    createUser: (user) => {
        return axios.post(`/api/signup`, user);
    },
    login: (user) => {
        return axios.post(`/api/login`, user);
    },
    logout: () => {
        return axios.get(`/api/logout`);
    },
    addTag: (tag) => {
        return axios.post(`/api/addtag`, tag);
    },
    deleteTag: (tag) => {
        return axios.post(`/api/delete/tag/${tag}`);
    },
    getItemInfo: (id) => {
        return axios.get(`/api/item/${id}`);
    },
    editItem: (item) => {
        return axios.post(`/api/item/${item.id}`, item);
    }
}