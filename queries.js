const Pool = require('pg').Pool
const pool = new Pool({
  user: 'sreevanir',
  host: 'localhost',
  database: 'postgres',
  password: 'Admin',
  port: 5432,
})

// const query = `
// CREATE TABLE entity (
//     id int,
//     entity varchar,
//     details varchar    
// );
// `;

// pool.query(query, (err, res) => {
//   if (err) {
//       console.error(err);
//       return;
//   }
//   console.log('Table is successfully created');  
// });

const getAllCustomers= (request, response) => {
  pool.query('SELECT * FROM customer ORDER BY Custid ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getAllOrders= (request, response) => {
  pool.query('SELECT * FROM ORDERS ORDER BY orderId ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const deleteCustomerById = (request, response) => {

  const custid = request.params.orderid;
 
pool.query('delete FROM  customer WHERE custid = $1', [orderid], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const deleteOrderById = (request, response) => {
  
  
  const orderid = request.params.orderid;
  

  pool.query('delete FROM  orders WHERE orderid = $1', [orderid], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const addCustomer = (request, response) => {

  const { Custid, custFirstName, custSecondName,custEmail, custPhone, custAddress} = request.body

  pool.query('INSERT INTO customer (Custid, custFirstName, custSecondName ,custEmail, custPhone, custAddress) VALUES ($1, $2, $3, $4, $5, $6)', [Custid, custFirstName, custSecondName, custEmail, custPhone, custAddress], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Customer added with ID: ${Custid}`)
  })
}

const addOrder = (request, response) => {
  const { Custid, orderId, Ordername, Orderprice,orderDate,deliveryDate} = request.body

  pool.query('INSERT INTO orders (Custid, orderId, Ordername ,Orderprice, orderDate, deliveryDate) VALUES ($1, $2, $3, $4, $5, $6)', [Custid, orderId, Ordername, Orderprice, orderDate, deliveryDate], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`orders added with customer ID: ${Custid}`)
  })
}

const addExpense = (request, response) => {
  const { expense_type, amount, expenseDate } = request.body

  pool.query('INSERT INTO expense (expense_type, amount, expenseDate) VALUES ($1, $2, $3)', [expense_type, amount, expenseDate], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`expenses added with expense_type: ${expense_type}`)
  })
}


module.exports = {
  getAllCustomers,
  getAllOrders,
  deleteCustomerById,
  deleteOrderById,
  addOrder,
  addCustomer,
  addExpense
  // updateUser,
  // deleteUser,
}
