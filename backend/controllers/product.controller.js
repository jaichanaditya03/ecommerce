const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {Product} = require('../model/Product');
const { User } = require('../model/User'); 


const product = async (req, res) => {
    try{
        const product = await Product.find({});
        return res.status(200).json({
            message:"All Products",
            product:product
        })
    }catch(error){
        console.log(error);
        res.status(400).json({
            message:"Internal server error"
        })
    }
}



const addproduct = async(req,res)=>{
    try{
        let {name,price,image,description,stock,brand} = req.body;
        let {token} = req.headers;
        let decodedToken = jwt.verify(token,"supersecret");
        let user = await User.findOne({email:decodedToken.email});
        const product = await Product.create({
            name,
            price,
            image,
            description,
            stock,
            brand,
            user:user._id
        })
        return res.status(200).json({
            message: "Product created Successfully",
            product:product
        })
    }catch(error){
       console.log(error);
       res.status(400).json({
           message:"Internal server error cf"
       })
    }
}


const singleProduct = async(req,res)=>{
    try{
        let {id} = req.params;
        if(!id){
            return res.status(400).json({
                message:"Id not Found"
            })
        }
        let { token } = req.headers;
        const decodedToken = jwt.verify(token, "supersecret");
        const user = await User.findOne({ email: decodedToken.email });
        if(user){
            const foundProduct  = await Product.findById(id);
            console.log(foundProduct);

            if(!foundProduct){
                res.status(400).json({
                    message:"product not found"
                })
            }
            return res.status(200).json({
                message: "Product found successfully",
                product: foundProduct
            })
        }
    }catch(error){
       console.log(error);
       res.status(400).json({
           message:"Internal server error"
       })
    }
}

const updateProduct = async(req,res)=>{
    try{
        let {id} = req.params;
        let {name,price,image,description,stock,brand} = req.body.ProductData;
        let {token} = req.headers;

        let decodedToken = jwt.verify(token, "supersecret");
        let user = await User.findOne({email:decodedToken.email});

        if(user){
            const productUpdated = await Product.findByIdAndUpdate(id,{
                name,
                price,
                image,
                description,
                stock,
                brand
            });
            return res.status(200).json({
                message:"Product Updated Successfully",
                product: productUpdated
            });
        }

    }catch(error){
       console.log(error);
       res.status(400).json({
           message:"Internal server error --update product"
       });
    }
}


const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const token = req.headers.token || req.headers.authorization;

        if (!token) {
            return res.status(401).json({ message: "Access denied. No token provided." });
        }

        const decodedToken = jwt.verify(token, "supersecret");
        const user = await User.findOne({ email: decodedToken.email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully" });
        
    } catch (error) {
        console.error("Error deleting product:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {product,addproduct,singleProduct,updateProduct,deleteProduct};