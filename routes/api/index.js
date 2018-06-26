const router = require("express").Router();
const exampleRoutes = require("./example");

// Article routes
router.use("/example", exampleRoutes);

module.exports = router;
