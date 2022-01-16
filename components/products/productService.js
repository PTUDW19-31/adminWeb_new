//const { options, report } = require('.');
const {models, sequelize} = require('../../models')
const cloudImage = require('../../uploadIMG/cloudinary');



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

exports.store = async(req) => {
    const result = await cloudImage.uploadIMG(req.file.path);
    sequelize.transaction(async (t) => {
        const book = await models.sach.create({            
                TENSACH: req.body.name,
                LOAISACH: req.body.type,
                GIA: req.body.price,
                IMAGE: result.secure_url,
                IMAGE_PUBLICID: result.public_id
            }, {transaction: t});
        if (book) {
            await models.chitietsach.create({
                    MASACH: book.MASACH,
                    TACGIA: req.body.author,
                    NGAYXB: req.body.publishDate,
                    MOTA: req.body.description,
                }
                , {transaction: t})
        }     
    });
}

exports.update = (req) => {
    return models.sach.findOne({
        where: {
            MASACH: req.params.id
        },
        include: [{
            model: models.chitietsach, 
            as: 'chitietsach',
        }]
    });
}

exports.saveUpdate = async(req) => {
    models.chitietsach.update(
        {
            MASACH: req.body.id,
            TACGIA: req.body.author,
            NGAYXB: req.body.publishDate,
            MOTA: req.body.description
        }, { where: { MASACH: req.params.id } })
    if(req.file){
        const book = await models.sach.findOne({where: {MASACH: req.params.id}});
        const result = await cloudImage.updateIMG(req.file.path, book.IMAGE_PUBLICID);
        return models.sach.update(
            {
                MASACH: req.body.id,
                TENSACH: req.body.name,
                LOAISACH: req.body.type,
                GIA: req.body.price,
                IMAGE: result.secure_url,
                IMAGE_PUBLICID: result.public_id
            },
            { where: { MASACH: req.params.id } }
        ); 
    }
    return models.sach.update(
        {
            MASACH: req.body.id,
            TENSACH: req.body.name,
            LOAISACH: req.body.type,
            GIA: req.body.price,
        },
        { where: { MASACH: req.params.id } }
    );
}
