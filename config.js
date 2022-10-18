
let conn = {
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      port : 8889,
      user : 'root',
      password : 'root',
    }
  }
const options = require('./db/ecommerce.js')
let knex = require('knex')(conn);


  knex.raw('CREATE DATABASE productos').then(function () {
    knex.destroy();
  
    // connect with database selected
    conn.connection.database = 'productos';
    knex = require('knex')(conn);
  
    knex.schema
      .createTable('prod', function (table) {
        table.increments('id')
        table.string('title');
        table.double('price')
        table.string('icon')
      })
      .then(function () {
        knex.destroy();
        
        knex = require('knex')(options);
        
          // connect with database selected
          
        
          knex.schema
            .createTable('msj', function (table) {
              table.increments('id')
              table.string('autor');
              table.string('mensaje')
              table.date('fecha')
            })
            .then(function () {
              knex.destroy();
            });
        
      });
  });

