const {sequelize}=require('../models')
const express=require('express');
const app = express();
app.use(express.json())

const crudController= require('../controller/crudController')


app.post("/create/users", async (req, res) => {
    
    await crudController.createUser(req, res);
});

app.get("/users",async (req, res) => {

    await crudController.getUser(req, res);
});

app.get("/users/:id",async (req, res) => {

    await crudController.getUserById(req,res)
});

app.post('/delete/users/:id',async (req, res) => {

    await crudController.deleteUser(req,res)
});

app.post('/update/users/:id',async (req, res) => {
    
    await crudController.updateUser(req,res)
});


const port = process.env.PORT || 5000;

app.listen(port,  async () =>{
    await sequelize.authenticate();
})