const { Order } = require('../models/index');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');


const OrdersController = {};


// (Create) Create an order

OrdersController.newOrder = (req,res) => {
    
    let body = req.body;

    console.log("este es body",body)

    Order.create({
        price: body.price,
        peliculaId: body.peliculaId,
        usuarioId: body.usuarioId,
        fecha: body.fecha
    })
    .then(pedido => {
        if(pedido){
            res.send(pedido)
        }else{
            res.send("La creación de un nuevo pedido ha fallado");
        }
    })
    .catch((error => {
        res.send(error)
    }))
}

// (Read) Show all orders

OrdersController.showOrders = async (req,res) => {

    let neededData = `SELECT user.name AS name, movies.title AS title , movies.popularity AS top_rated, users.username AS username, users.email AS email
    FROM users INNER JOIN orders 
    ON users.id = orders.userId INNER JOIN movies 
    ON movies.id = orders.movieId WHERE popularity > 6 AND name LIKE '%Ra%' ORDER BY top_rated DESC`; 

    let result = await Order.sequelize.query(neededData,{
        type: Order.sequelize.QueryTypes.SELECT});

    if(result){
        res.send(result);
    }

}

// - Show only active:

OrdersController.showActiveOrders = (req, res) => {};

// (Update) Modify order

OrdersController.updateOrder = (req, res) => {};

// (Delete) Orders

// - All

OrdersController.deleteAllOrders = (req, res) => {};

// - Filtered by Id

OrdersController.deleteOrder = (req, res) => {};


module.exports = OrdersController;


