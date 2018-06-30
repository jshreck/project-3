const router = require("express").Router();

var api_key = process.env.SEMANTICS3_KEY;
const api_secret = process.env.SEMANTICS3_SECRET;
const sem3 = require("semantics3-node")(api_key, api_secret);

// const getProduct = () => {

//     sem3.products.products_field("upc", "883974958450");

//     sem3.products.get_products(
//         (err, products) => {
//             if (err) {
//                 console.log(err);
//                 console.log("Couldn't execute request: get_products");
//                 return;
//             }
//             console.log("Results of request:\n" + JSON.stringify(products));
//         }
//     );

// };
// /api/find
router.route("/find/:id")
    .get((req, res)=>{
        sem3.products.products_field("upc", req.params.id);

        sem3.products.get_products(
            (err, products) => {
                if (err) {
                    console.log(err);
                    console.log("Couldn't execute request: get_products");
                    return;
                }
                console.log("Results of request:\n" + JSON.stringify(products));
                res.json(products);
            }
        );
    });

module.exports = router;
