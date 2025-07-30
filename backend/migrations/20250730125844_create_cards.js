exports.up = function(knex) {
    return knex.schema.createTable('cards', function(table) {
        table.increments('id').primary();
        table.string('name').notNullable().unique();
        table.string('country').notNullable();
        table.text('image').notNullable();
        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cards');
};
