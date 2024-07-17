import { Router } from "express";
//import { ProductManager } from "../dao/fs/ProductManager.js";
import ProductManager from "../dao/db/ProductManager-db.js";

const routerViews = Router();
const productManager = new ProductManager();

routerViews.get("/", async (req, res) => {
    try {
        const products = await productManager.getProducts();
        const productsDocs = products.docs.map(p => {
            const {_id, ...rest} = p.toObject();
            return rest
        });
        res.render("home",{
            products:productsDocs,
            hasPrevPage: products.hasPrevPage, 
            hasNextPage: products.hasNextPage,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
            currentPage: products.page,
            totalPages: products.totalPages
        })
    } catch (error) {
        res.status(500).send("Error interno del servidor");
    }
});

routerViews.get("/realtimeproducts", async (req, res) => {
    try {
        res.render("realtimeproducts");
    } catch (error) {
        res.status(500).send("Error interno del servidor");
    }
});

export default routerViews;




