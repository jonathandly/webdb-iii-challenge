
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohorts').del()
    .then(function () {
      // Inserts seed entries
      return knex('cohorts').insert([
        { name: 'WebPt3' },
        { name: 'WebPt4' },
        { name: 'WebPt5' }
      ]);
    });
};
