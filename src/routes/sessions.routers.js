import { Router } from "express";
import userModel from "../dao/models/user.model.js";

const routerSessions = Router();

routerSessions.post("/register",async (req, res) => {
    const {first_name, last_name, email,password,age} = req.body;

    try {
        const existUser = await userModel.findOne({ email: email });
        console.log(existUser);
        if(existUser) {
            return res.status(400).send("El correo electronico ya esta registrado");
        }
        const  newUser = await userModel.create({first_name,last_name,email,password,age});
        req.session.user ={...newUser,_doc};
        res.status(200).send("Usuario creado con exito");
    } catch (error) {
        res.status(500).send("Error interno al crear usuario " + error);
    }
});

routerSessions.post("/login",async(req,res) => {
    const {email,passwd} = req.body;

    try {
        const user = await userModel.findOne({email: email});
        if(user) {
            if(user.password = passwd) {
                req.session.user = {
                    email: user.email,
                    age: user.age,
                    first_name: user.first_name,
                    last_name: user.last_name,
                }
                res.redirect("/profile")
            } else {
            res.status(401).send("Password Incorrecto");
            }
        } else {
            res.status(404).send("Usuario no encontrado");
        }
    } catch (error) {
        res.status(500).send("Error interno al logear usuario");
    }
});

export default routerSessions; 
