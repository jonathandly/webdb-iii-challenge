const cleaner = require('knex-cleaner');

exports.seed = function(knex) {
  
  // cleans all tables and resets the primary keys
  return cleaner.clean(knex); 

};
