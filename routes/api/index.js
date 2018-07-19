const router = require("express").Router();
const api_key = process.env.SEMANTICS3_KEY;
const api_secret = process.env.SEMANTICS3_SECRET;
const sem3 = require("semantics3-node")(api_key, api_secret);
const itemsController = require("../../controllers/itemsController");
const tagsController = require("../../controllers/tagsController");
const usersController = require("../../controllers/usersController");
const passport = require('../../config/passport');


// /api/find -> search semantics3 for upc
router.route("/find/:UPC")
    .get((req, res) => {
        sem3.products.products_field("upc", req.params.UPC);

        sem3.products.get_products(
            (err, products) => {
                if (err) {
                    console.log("Couldn't execute request: get_products");
                    console.log(err); //want to send err res so we can alert user on front end
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

router.route("/additem")
    .post(itemsController.add);

router.route("/delete/:id")
    .post(itemsController.delete);

router.route("/signup")
    .post(usersController.create);  

router.route("/login")
    .post(passport.authenticate('local'), (req, res) => {
    res.json({ name: req.user.name, id: req.user.id });
});  

router.route("/logout")
    .get((req, res) => {
    console.log("hitting");
    req.logout();
    res.json("logged out");
});

router.route("/addtag")
    .post(tagsController.add);

router.route("/delete/tag/:id")
    .post(tagsController.delete);

router.route("/item/:id")
    .get(itemsController.get)
    .post(itemsController.update);

module.exports = router;
