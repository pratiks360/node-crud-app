const Pool = require('pg').Pool
const pool = new Pool({
  user: 'sreevanir',
  host: 'localhost',
  database: 'postgres',
  password: 'Admin',
  port: 5432,
})

const query = `
CREATE TABLE entity_facts (
    id int,
    entity varchar,
    details varchar    
);
`;

pool.query(query, (err, res) => {
  if (err) {
      console.error(err);
      return;
  }
  console.log('Table is successfully created');  
});

const getUsers = (request, response) => {
  pool.query('SELECT * FROM entity_facts ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getUserById = (request, response) => {
  
  
  const id = request.params.id;
  

  pool.query('SELECT * FROM entity_facts WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createUser = (request, response) => {
  const { id, entity, details } = request.body

  pool.query('INSERT INTO entity_facts (id, entity, details) VALUES ($1, $2, $3)', [id, entity, details], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${id}`)
  })
}


module.exports = {
  getUsers,
  getUserById,
  createUser
  // updateUser,
  // deleteUser,
}
