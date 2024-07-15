
import CartModel from "../models/cart.model.js";

class CartManager {
    async createCart() {
        try {
            const newCart = new CartModel({ products: [] });
            await newCart.save();
            return newCart;
        } catch (error) {
            console.error("Error al cargar los carritos desde el archivo", error)
            await this.saveCarts();
        }
    }

    async getCartById(cartId) {
        try {
            const cart = await CartModel.findById(cartId);
            if (!cart){
                console.log("Carrito no encontrado con ID " + cartId);
            }
            return cart;
        } catch (error) {
            console.error("Error al obtener el carrito por ID", error);
            throw error;
        }
    }

    async insertProductToCart(cartId, productId, quantity=1) {
        try {
            const cart = await this.getCartById(cartId);
            const existProduct = cart.products.find(item => item.product.toString() === productId);
            
            if (existProduct) {
                existProduct.quantity += quantity;
            }else {
                cart.products.push({
                    product: productId, 
                    quantity: quantity
                })
            };
            cart.markModified("products");
            await cart.save();
            return cart;
        } catch (error) {
            console.error("Error al insertar producto al carrito.", error);
            throw error;
        }
    }
}

export default CartManager;