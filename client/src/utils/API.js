import axios from "axios";

export default {
    findBarcode: (UPC) => {
        return axios.get(`api/find/${UPC}`);
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
    }
    
    //updateItem...tags or anything else?
}