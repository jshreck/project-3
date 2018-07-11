const db = require("../models");


module.exports = {
    create: (req, res) => {
        console.log(req.body);
        db.User
        .create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
          })
            .then(user => res.json(user)) //make this route to /login later, res.redirect(307, "/api/login");
            .catch(err => res.status(400).json(err));
    },
    // login: (req, res) => {
    //     passport.authenticate("local"), function (request, response){
    //         response.json("worked");
    //     };
    // } 
};