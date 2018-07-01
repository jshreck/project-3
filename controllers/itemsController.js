const db = require("../models");

module.exports = {
    find: (req, res) => {
        db.Item
            .findAll({
                where: {
                    UserId: req.params.userId,
                }
            })
            .then(items => res.json(items))
            .catch(err => res.status(404).json(err));
    }
};