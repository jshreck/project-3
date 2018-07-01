import axios from "axios";

export default {
    findBarcode: (UPC) => {
        console.log("API... id=" + UPC);
        return axios.get(`api/find/${UPC}`);
    },
    getItems: (userId) => {
        return axios.get(`/api/${userId}/items`);
    }

    //saveItem
    //getTags
    //deleteItem
    //updateItem...tags or anything else?
}