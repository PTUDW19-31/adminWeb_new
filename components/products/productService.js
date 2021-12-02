//const { options, report } = require('.');
const {models} = require('../../models')






exports.list = (page, itemPerPage) => {
    return models.sach.findAndCountAll({ offset: page*itemPerPage, limit: itemPerPage, raw: true });
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

exports.store = (req, result) => {
    return models.sach.findOrCreate({
        where: {
            TENSACH: req.body.name,
            LOAISACH: req.body.type,
            GIA: req.body.price,
            IMAGE: result.secure_url
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
            IMAGE: req.body.image
        },
        { where: { MASACH: req.params.id } }
    );
}