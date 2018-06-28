import React from "react";
import Grid from "@material-ui/core"

const AddItemForm = (props) => {
    return (
        <Grid item spacing={40} justify="center">
        <form>
            Item Name:<input type="text" name="itemName" />
            <br />
            Expiration Date: <input type="text" name="expDate"/>
            <br />
            <input type="submit" value="Submit" />
        </form>
        </Grid>
    )
}

export default AddItemForm;