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
    }
};