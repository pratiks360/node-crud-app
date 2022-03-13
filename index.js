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


app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById);
app.post('/users', db.createUser)
// app.put('/users/:id', db.updateUser)
// app.delete('/users/:id', db.deleteUser)


app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.listen(3000, () => console.log('listening on port 3000...'));