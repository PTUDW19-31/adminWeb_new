const billService = require('./billService');
const pagination = require('../../public/js/pages/pagination');


exports.list = async (req, res, next) => {
    if(req.user){
        const itemPerPage = 10;
        const page = !isNaN(req.query.page) && req.query.page > 0 ? req.query.page - 1 : 0;
        const chooseDate = req.query.chooseDate || "";
        const search = req.query.search || "";
        const bills = await billService.list(page,itemPerPage, search, chooseDate);
        const TotalPage = Math.ceil(bills.count/itemPerPage) > page + 1 ? Math.ceil(bills.count/itemPerPage) : page + 1
        const pagItems = pagination.paginationFunc(page+1, TotalPage);

        if(!bills){
            res.render('manageBill',{message: 'Something went wrong !!! Try again!'});
        } 

        res.render('manageBill', {
            Items: pagItems,
            bills: bills.rows,
            chooseDate,
            search
        });
    } else{
        res.redirect('/');
    }
}

exports.view = async (req, res) =>{
    if(req.user){
        const sohd = req.params.id;
        const { billdetail, totalBill } = await billService.view(sohd);

        if(!billdetail){
            res.render('billDetail',{message: 'Something went wrong !!! Try again!'});
        } 
        res.render('billDetail', {
            billHD: billdetail[0].SOHD,
            billdetail,
            totalBill
        });
    } else{
        res.redirect('/');
    }
}