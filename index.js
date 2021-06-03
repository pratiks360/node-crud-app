const express=require('express');

var oracledb= require('oracledb');

const app = express();

app.get('/', (req,res) => {
 res.send('hello world');
});

app.get('/api/courses', (req,res) => {
   res.send([1,2,3]);
});

var connection= oracledb.connection(
  {
    host : 'localhost' ,
    user :  'SYSTEM' ,
    password : 'tiger' ,
    database : 'con1'
  }
);

connection.connect(function(err){
  if (err) throw err;
  console.log('connected..');
});


app.listen(3000, () => console.log('listening on port 3000...'));