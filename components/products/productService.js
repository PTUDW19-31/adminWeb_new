//const { options, report } = require('.');
const {models} = require('../../models')

exports.list = () => {
    return models.sach.findAll({ raw: true });
};  

exports.hiden = (req) => {
    return models.sach.update(
        {
            STATUS: 'Hiden'
        },
        { where: { MASACH: req.params.id } }
    );
}

exports.active = (req) => {
    return models.sach.update(
        {
            STATUS: 'Active'
        },
        { where: { MASACH: req.params.id } }
    );
}

exports.store = (req) => {
    return models.sach.findOrCreate({
        where: {
            MASACH: req.body.id,
            TENSACH: req.body.name,
            LOAISACH: req.body.type,
            GIA: req.body.price,
            URL: req.body.image
        }
    });
}

exports.update = (req) => {
    return models.sach.findOne({
        where: {
            MASACH: req.params.id
        },
    });
}

exports.saveUpdate = (req) => {
    return models.sach.update(
        {
            MASACH: req.body.id,
            TENSACH: req.body.name,
            LOAISACH: req.body.type,
            GIA: req.body.price,
            URL: req.body.image
        },
        { where: { MASACH: req.params.id } }
    );
}