const express=require('express');
const bodyParser = require('body-parser')
const { Client } = require('pg');
const client = new Client({
    user: 'sreevanir',
    host: 'localhost',
    database: 'postgres',
    password: 'admin',
    port: 5432,
});
client.connect(function(err){
  if (err) throw err;
  console.log('connected..');
});

const db = require('./queries')

const app=express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))


 app.post('/addCustomers', db.addCustomer)
 app.post('/addOrders',db.addOrder)
 app.post('/addExpenses',db.addExpense)
 app.get('/getAllCustomers',db.getAllCustomers)
 app.get('/getAllOrders',db.getAllOrders)
 app.delete('/deleteCustomer/:custid',db.deleteCustomerById)
 app.delete('/deleteOrders/:orderid',db.deleteOrderById)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.listen(3000, () => console.log('listening on port 3000...'));