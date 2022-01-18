//const { options, report } = require('.');
const {models, sequelize} = require('../../models')
const cloudImage = require('../../uploadIMG/cloudinary');
const { Op } = require('sequelize');


exports.list = (page, itemPerPage, title) => {
    var condition = '';
    if (title) {
      condition = title;
    }
    return models.sach.findAndCountAll({ 
        where: {
            TENSACH :{
                [Op.like]: '%' + condition + '%',
            }
        },
        offset: page*itemPerPage, 
        limit: itemPerPage, raw: true });
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
    const book = await models.sach.create({            
            TENSACH: req.body.name,
            LOAISACH: req.body.type,
            GIA: req.body.price,
            IMAGE: result.secure_url,
            IMAGE_PUBLICID: result.public_id
        });
    if (book) {
        models.chitietsach.create({
                MASACH: book.MASACH,
                TACGIA: req.body.author,
                NGAYXB: req.body.publishDate,
                MOTA: req.body.description,
            })
        if (req.body.category) {
            for (const id of req.body.category) {
                models.sach_has_category.create({
                    MASACH: book.MASACH,
                    CATEGORY_ID: id,
                })
            };
        }          
    }     
    
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
    await models.sach_has_category.destroy({
        where: {masach : req.params.id}
      })
  
    if (req.body.category) {
        for (const element of req.body.category) {
            await models.sach_has_category.create({
                MASACH: req.params.id,
                CATEGORY_ID: element,
                });
        };
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
exports.addCategory = async(req) => {
    return models.category.findOrCreate({
        where: {
            NAME: req.body.category
        }
    })
}
exports.getCategory = async() => {
    return models.category.findAll({raw: true});
}
exports.getBookCategory = async(req) => {
    return models.sach_has_category.findAll({
        where: {MASACH: req.params.id},
        raw: true
    })
}