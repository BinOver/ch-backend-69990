import express from "express";
//import { CartManager } from "../dao/fs/CartManager.js"
import CartManager from "../dao/db/CartManager-db.js";



const routerCarts = express.Router();
const cartManager = new CartManager();

routerCarts.post("/", async (req,res) => {
    try {
        const newCart = await cartManager.createCart();
        res.json(newCart);
    } catch (error) {
        console.error ("Error al crear nuevo carrito", error);
        res.status(500).json({ error: "Error internio del servidor" });
    }
});

routerCarts.get("/:cid", async (req,res) => {
    const cartId = req.params.cid;
    try {
        const cart = await cartManager.getCartById(cartId);
        res.json(cart.products);
    } catch (error) {
        console.error("Error al obtener el carrito", error);
        res.status(500).json({error: "Error interno del servidor"});
    }
});

routerCarts.put("/:cid", async (req,res) => {
    const cartId = req.params.cid;
    const products = req.body;
    try {
        const cart = await cartManager.getCartById(cartId);
        if (cart) {
            products.forEach((newProduct) => {
                const indexOfProduct = cart.products.findIndex((p) =>
                    p.product._id.toString() === newProduct.product._id.toString());
                if (indexOfProduct !== -1) {
                    cart.products[indexOfProduct].quantity = newProduct.quantity;
                } else {
                    cart.products.push(newProduct);
                }
            });
            res.status(200).send({ resultado: "OK", carrito: cart.products });
        } else {
            res
                .status(404)
                .send({ resultado: "Carrito no encontrado", carrito: cart });
        }
        await cart.save();
    } catch (error) {
        console.error("Error al obtener el carrito", error);
        res.status(500).json({error: "Error interno del servidor"});
    }
});


routerCarts.post("/:cid/product/:pid", async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = req.body.quantity || 1;
    try {
        const updateCart = await cartManager.insertProductToCart(cartId,productId,quantity);
        res.json(updateCart.products);
    } catch (error) {
        console.error("Error al agregar un producto al carrito", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

routerCarts.put("/:cid/product/:pid", async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = req.body.quantity || 1;
    try {
        const updateCart = await cartManager.insertProductToCart(cartId,productId,quantity);
        res.json(updateCart.products);
    } catch (error) {
        console.error("Error al agregar un producto al carrito", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

routerCarts.delete('/:cid/products/:pid', async (req,res) =>{
    const cartId = req.params.cid;
    const productId = req.params.pid;
    try {
        const deleteCartProduct = await cartManager.deleteCartProductByPID(cartId,productId);
        res.json(deleteCartProduct.products);
    } catch (error) {
        console.error("Error al borrar producto del carrito", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }

} );
routerCarts.delete('/:cid',async (req,res) =>{
    const cartId = req.params.cid;
    try {
        const deleteCart = await cartManager.deleteCartByCID(cartId);
        res.json(deleteCart.products); 
    } catch (error) {
        console.error("Error al borrar producto del carrito", error);
        res.status(500).json({ error: "Error interno del servidor" });  
    }
} );

export default routerCarts;