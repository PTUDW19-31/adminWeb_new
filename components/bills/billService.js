const {models} = require('../../models');
const bcrypt = require('bcryptjs'); 


exports.list = (page, itemPerPage) => {
    return models.hoadon.findAndCountAll({ offset: page*itemPerPage, limit: itemPerPage, raw: true });
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