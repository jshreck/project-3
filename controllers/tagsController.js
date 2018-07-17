const db = require("../models");

module.exports = {
    find: (req, res) => {
        db.Tag
            .findAll({
                where: {
                    UserId: req.params.userId,
                }
            })
            .then(tags => res.json(tags))
            .catch(err => res.status(404).json(err));
    },

    add: (req, res) => {
        console.log(req.body);
        db.Tag
            .create(req.body)
            .then(tag => res.json(tag))
            .catch(err => res.status(400).json(err));
    }
};

