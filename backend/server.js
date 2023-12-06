const express = require ("express")
const server = express();
const { request , response } = require("http")
const cors = require("cors")
const mongoose = require("mongoose")
const Product = require ("./models/product.js")
const port = 3000;
const db_uri = "mongodb"


server.use(express.urlencoded({extended.false}))
server.use(express.json())
server.use(cors())

mongoose.connect(db_uri).then((result) => {
    server.listen(port , ()=> {console.log('Listing on ${port}...\n Connect to DB')
})
})
.catch((error) => {console.log(error)})

server.get("/", (request , response) =>{
    response.send("Live")
})

server.get("/products", async ( request , response) => {
    const products = await Product.find()
    response.send(products)
})

server.post("/addProduct" , async (request , response) =>{
    const product = request.body
    const postproduct = new Product({
        id: product.id,
        productName: product.productName,
        brand: product.brand,
        quantity: product.quantity,
        image:product.image,
        price: product.price
    })
    const saveProduct = await postproduct.save()
    saveProduct ? response.send("Product is added to the Inventory") : response.send ( " you have failed to add anything to the inventory")
})