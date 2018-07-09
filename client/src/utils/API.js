import axios from "axios";

export default {
    findBarcode: (UPC) => {
        console.log("API... id=" + UPC);
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
    }
    

    //saveItem
    //getTags
    //deleteItem
    //updateItem...tags or anything else?
}