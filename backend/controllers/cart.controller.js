
require('dotenv').config(); // must be on top

const jwt = require('jsonwebtoken');
const {Cart} = require('../model/Cart');
const {User} = require('../model/User');
const {Product} = require('../model/Product');
const {model}  = require('mongoose');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const sendEmail = require('../utils/userEmail');


//create cart for user
const cart = async(req,res)=>{
    try{
        const {token} = req.headers;
        const decodedToken = jwt.verify(token,"supersecret");
        const user  = await User.findOne({email:decodedToken.email}).populate({
            path: 'cart',
            populate:{
                path: 'products',
                model:'Product',

            }
        })
            if(!user){
                res.status(400).json({
                    message: 'User not found'
                })
            }
            res.status(200).json({
                message: 'Cart created successfully',
                cart:user.cart
            })

    }catch(error){
        console.log(error);
        res.status(400).json({
            message:"internal server error"
        })
    }
}



// Add product to cart
const addcart = async (req, res) => {
  try {
    const { token } = req.headers;
    const decodedToken = jwt.verify(token, "supersecret");

    const { productID, quantity } = req.body;

    if (!productID || !quantity) {
      return res.status(400).json({
        message: "Some fields are missing"
      });
    }

    const user = await User.findOne({ email: decodedToken.email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const product = await Product.findById(productID);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findById(user.cart);

    if (cart) {
      const exists = cart.products.some(
        (p) => p.product.toString() === productID
      );

      if (exists) {
        return res.status(409).json({
          message: "Product already in the cart"
        });
      }

      //  Add product to existing cart
      cart.products.push({ product: productID, quantity });
      cart.total += product.price * quantity;
      await cart.save();
    } else {
      //  Create new cart and assign to user
      const newCart = await Cart.create({
        products: [{ product: productID, quantity }],
        total: product.price * quantity
      });

      user.cart = newCart._id;
      await user.save();
    }

    return res.status(200).json({
      message: "Product added to cart"
    });

  } catch (error) {
    console.error("addcart error:", error);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
};



//get cart for user
const getCart = async (req, res) => {
  try {
    const { token } = req.headers;
    const decodedToken = jwt.verify(token, "supersecret");

    const user = await User.findOne({ email: decodedToken.email }).populate({
      path: 'cart',
      populate: {
        path: 'products.product',
        model: 'Product'
      }
    });

    if (!user || !user.cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json({
      message: "Cart fetched successfully",
      cart: user.cart
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};



// Update cart (increase/decrease/remove product)
const updateCart = async (req, res) => {
  try {
    const { productId, action } = req.body;
    const { token } = req.headers;
    const decoded = jwt.verify(token, "supersecret");

    const user = await User.findOne({ email: decoded.email }).populate({
      path: "cart",
      populate: {
        path: "products.product",
        model: "Product"
      }
    });

    if (!user || !user.cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const cart = user.cart;
    const itemIndex = cart.products.findIndex(
      (p) => p.product._id.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    const item = cart.products[itemIndex];
    const price = item.product.price;

    if (action === "increase") {
      item.quantity += 1;
    } else if (action === "decrease") {
      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        cart.products.splice(itemIndex, 1);
      }
    } else if (action === "remove") {
      cart.products.splice(itemIndex, 1);
    } else {
      return res.status(400).json({ message: "Invalid action" });
    }

    // ✅ Recalculate total properly after changes
    cart.total = cart.products.reduce((acc, curr) => {
      return acc + curr.product.price * curr.quantity;
    }, 0);

    await cart.save();
    res.status(200).json({ message: "Cart updated successfully", cart });

  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ message: "Something went wrong", error });
  }
};


//payment
const payment = async (req, res) => {
try{
  const {token} = req.headers;
  const decodedToken = jwt.verify(token,"supersecret"); 
  const user = await User.findOne({email:decodedToken.email}).populate({
    path: 'cart',
    populate:{
      path: 'products.product',
      model:'Product'
    }
  })
  if(!user || !user.cart|| user.cart.products.length === 0){
    return res.status(404).json({message:"Cart not found"});
  }

  //payment
  const lineItems = user.cart.products.map((item) => {
   return {price_data: {
      currency: 'inr',
      product_data: {
        name: item.product.name,
        images: [item.product.image],
      },
      unit_amount: item.product.price * 100, // Convert to cents
    },
    quantity: item.quantity,
  }})

  const currentUrl = process.env.CLIENT_URL || 'http://localhost:3000';

  const session = await stripe.checkout.sessions.create({
  payment_method_types: ['card'],
  line_items: lineItems,
  mode: 'payment',
  success_url: `${currentUrl}/success`,
  cancel_url: `${currentUrl}/cancel`
  
  })

  //send email to user
  await sendEmail(user.email, user.cart.products.map((item) => ({
    name: item.product.name,
    price: item.product.price,
    quantity: item.quantity
  })))
  
  //empty cart
  user.cart.products = [];
  user.cart.total = 0;
  await user.cart.save();
  await user.save();
    res.status(200).json({
    message: "Payment successful",
    url: session.url,
  });


}catch(error){
    console.log(error);
    res.status(400).json({
        message:"internal server error"
    })
  } 
}



module.exports = {addcart,cart,getCart,updateCart,payment};