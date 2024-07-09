import mongoose from 'mongoose';


mongoose.connect("mongodb+srv://binover:coderhouse@cluster0.sdawg.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0")
    .then(()=> console.log("Conectado a la base de datos"))
    .catch((error) => ("Error en la conexion con la base de datos " + error.message))