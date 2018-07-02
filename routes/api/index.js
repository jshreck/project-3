const router = require("express").Router();
const api_key = process.env.SEMANTICS3_KEY;
const api_secret = process.env.SEMANTICS3_SECRET;
const sem3 = require("semantics3-node")(api_key, api_secret);
const itemsController = require("../../controllers/itemsController");
const tagsController = require("../../controllers/tagsController");


// /api/find -> search semeantics3 for upc
router.route("/find/:UPC")
    .get((req, res) => {
        sem3.products.products_field("upc", req.params.UPC);

        sem3.products.get_products(
            (err, products) => {
                if (err) {
                    console.log("Couldn't execute request: get_products");
                    console.log(err);
                    return;
                }
                res.json(products);
            }
        );
    });

router.route("/:userId/items")
    .get(itemsController.find);

router.route("/:userId/tags")
    .get(tagsController.find);   
    //adding items for user
    //deleting items
    //adding tags for items
    //deleting tags for items

module.exports = router;
