import { Router } from "express";
import { CartManager } from "../controllers/CartManager.js"

const routerCarts = Router();
const cartManager = new CartManager();

routerCarts.post("/", async (res,req) => {
    try {
        const newCart = await cartManager.createCart();
        res.json(newCart);
    } catch (error) {
        console.error ("Error al crear nuevo carrito", error);
        res.status(500).json({ error: "Error internio del servidor" });
    }
});


routerCarts.get("/:cid", async (req, res) => {
    const cartId = parseInt(req.params.cid);
    try {
        const cart = await cartManager.getCartById(cartId);
        res.json(cart.products);
    } catch (error) {
        console.error("Error al obtener el carrito", error);
        res.status(500).json({error: "Error interno del servidor"});
    }
});

routerCarts.post("/:cid/product/:pid", async (req, res) => {
    const cartId = parseInt(req.params.cid);
    const productId = req.params.pid;
    const quantity = req.body.quantity || 1;
    try {
        const updateCart = await cartManager.insertProductToCart(cartId,productId,quantity);
        res.json(updateCart.products);
    } catch (error) {
        console.error("Error al agregar un producto al carrito", error)
        res.status(500).json({ error: "Error interno del servidor" });
    }
})

export default routerCarts;