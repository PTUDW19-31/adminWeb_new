const {models} = require('../../models');
const {Op} = require('sequelize')


exports.list = (page, itemPerPage, search, chooseDate) => {
    return models.hoadon.findAndCountAll({ 
        where: {
            [Op.and]: [
                {NGAYLAPHD: {[Op.like]: '%' + chooseDate + '%'}},
                {[Op.or]: [
                    {SOHD: {[Op.like]: '%' + search + '%'}},
                    {MAKH: {[Op.like]: '%' + search + '%'}},
                    {NGUOINHAN: {[Op.like]: '%' + search + '%'}},
                    {DIACHI: {[Op.like]: '%' + search + '%'}},
                    {PHONE: {[Op.like]: '%' + search + '%'}},
                    {STATUS: {[Op.like]: '%' + search + '%'}},
                ]}
            ]
        },
        offset: page*itemPerPage, 
        limit: itemPerPage, raw: true 
    });
};  


exports.view = async(sohd) => {
    const billdetail = await models.chitiethoadon.findAll({ 
        where: {SOHD: sohd},
        include: [{
            model: models.sach,
            as: 'MASACH_sach'
        }]
    });
    let totalBill = null;
    for(let items of billdetail){
        totalBill+=Number(items.THANHTIEN);
    }
    return { billdetail, totalBill} 
}