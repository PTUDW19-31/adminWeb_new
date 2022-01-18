const {models} = require('../../models');
const bcrypt = require('bcryptjs'); 
const { Op } = require('sequelize');

exports.list = (page, itemPerPage, title) => {
    var condition = '';
    if (title) {
      condition = title;
    }
    return models.account.findAndCountAll({ 
        where: {
            [Op.or]: [
                {OWNER :{
                    [Op.like]: '%' + condition + '%',
                }},
                {EMAIL:{
                    [Op.like]: '%' + condition + '%',
                }}
            ]
        },
        offset: page*itemPerPage, 
        limit: itemPerPage, raw: true 
    });
};  


exports.add = async(email, password) => {
    const user = await models.account.findOne({ where: {EMAIL: email}, raw: true });
    if(user){
        return null;
    }
    const hashPassword = await bcrypt.hash(password, 10);
    return models.account.create({
        EMAIL: email,
        PASSWORD: hashPassword,
        ROLE: 'Admin'
    });
}