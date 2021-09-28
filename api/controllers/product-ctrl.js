const Product = require('../models/product');
const fs = require('fs');
const fastcsv = require("fast-csv");
const { success, error } = require("consola");
const { resolve } = require('path');


const csvfile = __dirname + "/../../api/public/files/products.csv";
const stream = fs.createReadStream(csvfile);


const aggregateProducts = async (req, res) => {
    try {
        const aggregatedProducts = await Product.aggregate([
            { $group: { _id: "$name", total: { $sum: 1 }}}
        ]);
        success({
            message: `Products aggregated`,
            badge: true,
        });
        res.send({success: "Products aggregated", status: 200, data: aggregatedProducts});
    } catch(err) {
        error({
            message: `Error on aggregating product`,
            badge: true,
        });
        res.send({ error: "Error on aggregating products", status: 403 });
    }
}


const updateProduct = async (req, res) => {
    try {
        const productDets = req.body;
        const product = { sku: req.params.query };
        const updateTo = { $set: { name: productDets.name, sku: productDets.sku, description: productDets.description }};
        await Product.updateOne(product, updateTo);
        success({
            message: `Updated product detail successfully`,
            badge: true,
        });
        res.send({ success: "Updated product detail successfully", status: 200 });
    } catch(err) {
        error({
            message: `Error on updatig produt`,
            badge: true,
        });
        res.send({ error: "Error on updatig produt", status: 403});
    }
}


const importCSV = async (req, res) => {
    try {
        let  products  = []
        let csvStream = await fastcsv
        .parse()
        .on("data", function(data) {
            products.push({
            name: data[0],
            sku: data[1],
            description: data[2]
            });
        })
        .on("end", function() {
           
            products.shift();
            Product.insertMany(products, (err, res) => { if (err) throw err; });
        });
        stream.pipe(csvStream);
        success({
            message: `Data imported successfully.`,
            badge: true,
        });
        res.send({success : "Data imported successfully.", status : 200});
    } catch(err) {
        error({
            message: `Getting error on importing CSV`,
            badge: true,
        });
        res.send({error: "Getting error on importing CSV", status : 403});
    }
}

const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        success({
            message: `Products fetched successfully`,
            badge: true,
        });
        res.send({success : "Products fetched successfully", status : 200, data: products});
    } catch(err) {
        error({
            message: `Error on getting products`,
            badge: true,
        });
        res.send({error: "Error on getting products", status : 403});
    }
}

const getProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findById({_id: id});
        success({
            message: `Product fetched successfully`,
            badge: true,
        });
        res.send({success : "Product fetched successfully", status : 200, data: product});
    } catch(err) {
        error({
            message: `Error on getting product`,
            badge: true,
        });
        res.send({error: "Error on getting product", status : 403});
    }
}


module.exports = {
    importCSV,
    getProducts,
    updateProduct,
    aggregateProducts,
    getProduct
}