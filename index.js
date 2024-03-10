const express = require("express");
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://elipeforero21:elipeforero21@cluster0.laag0sa.mongodb.net/"
);
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));

db.once("open", function () {
  console.log("connection to mongo db");
  //model
  userSchema = mongoose.Schema({
    nombre: String,
    apellidos: String,
  });


  const User = mongoose.model("dbv2", userSchema);


    // empresas
    const empresas = mongoose.model("empresasv2", userSchema);

    //usuarios
      const usuarios = mongoose.model("usersv2", userSchema);

  // listar todos los datos de db2
  const app = express();
  app.use(express.json());


  app.get("/api/dbv2", async (req, res) => {
    const users = await User.find();
    res.json(users);
    });


    // listar todos los usuarios de usersv2
    app.get("/api/users", async (req, res) => {
      const usersv2 = await usuarios.find();
      res.json(usersv2);
    //  console.log(usersv2);
    });

    //LISTAR 10 PRIMEROS USUARIOS
    app.get("/api/users/limit", async (req, res) => {
      const diezusuarios = await usuarios.find().limit(10);
      res.json(diezusuarios);
    //   console.log(diezusuarios);
    });

    //listado de todas las empresas.	
    app.get("/api/empresas", async (req, res) => {
      const empresasv2 = await empresas.find();
      res.json(empresasv2);
    // console.log(empresasv2);
    });

    // listado de usuarios que sean de la empresa id 5.	
    app.get("/api/users/companies/5", async (req, res) => {
        const empresasconidcinco = await usuarios.find({empresa_id : 5});
        res.json(empresasconidcinco);
    // console.log(empresasconidcinco);
    });

    // listado de usuarios que sean de Bangladesh.	
    app.get("/api/users/country/Bangladesh", async (req, res) => {
        const usuariosdebangladesh = await usuarios.find({pais: "Bangladesh"});
        res.json(usuariosdebangladesh);
        // console.log(usuariosdebangladesh);
    });

    // listado de empresas de la ciudad Bangladesh.	
    app.get("/api/companies/city/Bangladesh", async (req, res) => {
        const empresas_de_bangladesh = await empresas.find({ciudad: "Bangladesh"});
        res.json(empresas_de_bangladesh);
        //no hay empresas en esa ciudad!
    });	 
    
  
  app.listen(3000, function () {
    console.log("server arriba");
  });
});
