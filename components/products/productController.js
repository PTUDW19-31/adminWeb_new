//const { render } = require('../../app');
const pagination = require('../../public/js/pages/pagination');
const productService = require('./productService');

//store
exports.store = async (req, res, next) => {
    try {    
        await productService.store(req);
        // if(created){
        return res.redirect('back');
        // }
        // else {
        //     res.status(401).json("Sản phẩm đã tồn tại!");
        // }
    }
    catch(err){
        console.log(err);
        res.status(401).json("Something went wrong!");
    }

};

// delete
exports.hiden = async (req, res, next) => {
    await productService.hiden(req);
    res.redirect('back');
};
exports.active = async (req, res, next) => {
    await productService.active(req);
    res.redirect('back');
};

//update
exports.saveUpdate = async (req, res, next) => {
    await productService.saveUpdate(req);
    res.redirect('/editProduct');
};

exports.update = async (req, res, next) => {
    if(req.user){
        const product = await productService.update(req);
        const Category = await productService.getCategory();
        const categoryOfBook = await productService.getBookCategory(req);
        res.render('formUpdatePro', { product, Category, categoryOfBook });
    } else{
        res.redirect('/');
    }
}

//list
exports.list = async (req, res, next) => {
    if(req.user){
        const itemPerPage = 10;
        const page = !isNaN(req.query.page) && req.query.page > 0 ? req.query.page - 1 : 0;
        const {title} = req.query
        const products = await productService.list(page,itemPerPage, title);
        const TotalPage = Math.ceil(products.count/itemPerPage) > page + 1 ? Math.ceil(products.count/itemPerPage) : page + 1
        const pagItems = pagination.paginationFunc(page+1, TotalPage);

        if(!products){
            res.status(401).json("Something went wrong!");
        } 
        
        for(let items of products.rows){
            if(items.STATUS == 'Hiden'){
                items.COLORSTATUS = 'danger'
            }
            else{
                items.COLORSTATUS = 'success'
            }
        };
        const category = await productService.getCategory()
        res.render('editProduct', {
            Items: pagItems,
            products: products.rows,
            category,
            title
        });
    } else{
        res.redirect('/');
    }
}

exports.addCategory = async (req, res, next) => {
    try {    
        const [category, created] = await productService.addCategory(req);
        if(created){
            return res.redirect('back');
        }
        else {
            res.status(401).json("Thể loại đã tồn tại!");
        }
    }
    catch(err){
        console.log(err);
        res.status(401).json("Something went wrong!");
    }

};




