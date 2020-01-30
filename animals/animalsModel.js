const db = require('../data/dbConfig.js');

module.exports = {
  insert,
  remove,
  getAll,
};

async function insert(animal) {
  return db('animals').insert(animal, "id");
}

function getAll() {
    return db('animals');
  }

  
function remove (id) {
    return db('animals')
    .where('id', id)
    .del()
    
}