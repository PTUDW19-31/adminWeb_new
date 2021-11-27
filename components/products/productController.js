const productService = require('./productService');

exports.list = async (req, res) => {
    const products = await productService.list();
    // res.render('productGrid', { title: 'Product Grid' });
    res.render('editProduct', { products });
}