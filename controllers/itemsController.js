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
    },

    add: (req, res) => {
        const item = req.body;
        db.Item
            .create(
                {
                    name: item.name,
                    barcode: item.barcode,
                    exp_date: item.exp_date,
                    tags: item.tags,
                    note: item.note,
                    UserId: item.UserId
                }
            )
            .then(item => res.json(item))
            .catch(err => res.status(400).json(err));
    },

    delete: (req, res) => {
        db.Item
            .destroy({
                where: {
                    id: req.params.id,
                }
            })
            .then(item => res.json(item))
            .catch(err => res.status(404).json(err));
    }

};