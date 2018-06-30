import axios from "axios";

export default {
    barcode: (id) => {
        console.log("API... id=" + id);
        return axios.get(`api/find/${id}`);
    }
    //saveItem
    //getTags
    //deleteItem
    //updateItem...tags or anything else?
}