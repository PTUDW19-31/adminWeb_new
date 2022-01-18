const accountService = require('./accountService');
const pagination = require('../../public/js/pages/pagination');


exports.list = async (req, res, next) => {
    if(req.user){
        const itemPerPage = 10;
        const page = !isNaN(req.query.page) && req.query.page > 0 ? req.query.page - 1 : 0;
        const {title} = req.query
        const accounts = await accountService.list(page,itemPerPage, title);
        const TotalPage = Math.ceil(accounts.count/itemPerPage) > page + 1 ? Math.ceil(accounts.count/itemPerPage) : page + 1
        const pagItems = pagination.paginationFunc(page+1, TotalPage);

        if(!accounts){
            res.render('editAccount',{message: 'Something went wrong !!! Try again!'});
        } 
        
        for(let items of accounts.rows){
            if(items.STATUS == 'Hiden'){
                items.COLORSTATUS = 'danger'
            }
            else{
                items.COLORSTATUS = 'success'
            }
        };
        res.render('editAccount', {
            Items: pagItems,
            accounts: accounts.rows
        });
    } else{
        res.redirect('/');
    }
}



exports.add = async(req, res) => {
    const {email, password} = req.body;
    try {    
        const account = await accountService.add(email, password);
        if(account){
            return res.render('editAccount',{message: 'Success'});
        }
        else {
            return res.render('editAccount',{message: 'Account is existed !!! Try again!'});
        }
    }
    catch(err){
        return res.render('editAccount',{message: 'Something went wrong !!! Try again!'});
    }
}

exports.hiden = async (req, res, next) => {
    const isHiden = await accountService.hiden(req);
    if (!isHiden) {
        return res.render('editAccount',{message: 'Cannot block your current log in account'});
    }
    res.redirect('back');
};
exports.active = async (req, res, next) => {
    await accountService.active(req);
    res.redirect('back');
};