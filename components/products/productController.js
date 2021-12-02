//const { render } = require('../../app');
const pagination = require('../../public/js/pages/pagination');
const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_ID,
    api_secret: process.env.API_SECRET
});
const productService = require('./productService');

// delete
exports.hiden = async (req, res, next) => {
    await productService.hiden(req);
    res.redirect('back');
}
exports.active = async (req, res, next) => {
    await productService.active(req);
    res.redirect('back');
}

//update
exports.saveUpdate = async (req, res, next) => {
    await productService.saveUpdate(req);
    res.redirect('/editProduct');
}

exports.update = async (req, res, next) => {
    const product = await productService.update(req);
    res.render('formUpdatePro', { product });
}

//list
exports.list = async (req, res, next) => {
    const itemPerPage = 7;
    const page = !isNaN(req.query.page) && req.query.page > 0 ? req.query.page - 1 : 0;
    const products = await productService.list(page,itemPerPage);
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
    res.render('editProduct', {
        Items: pagItems,
        products: products.rows
    });
}

//store
exports.store =(async (req, res, next) => {
    const result = await cloudinary.v2.uploader.upload(req.file.path);
    try {
        const [book, created] = await productService.store(req, result);
        if(created){
            res.redirect('back');
        }
        else {
            res.redirect('/users');
        }
    }
    catch(err){
        res.redirect('/users');
    }
})

