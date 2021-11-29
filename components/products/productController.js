//const { render } = require('../../app');
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
    const products = await productService.list();
    for(let items of products){
        if(items.STATUS == 'Hiden'){
            items.COLORSTATUS = 'danger'
        }
        else{
            items.COLORSTATUS = 'success'
        }
    }
    res.render('editProduct', { products });
}

//store
exports.store = async (req, res, next) => {
    try {
        const [book, created] = await productService.store(req);
        if(created){
            res.redirect('/editProduct');
        }
        else {
            res.redirect('/users');
        }
    }
    catch(err){
        res.redirect('/users');
    }
}

