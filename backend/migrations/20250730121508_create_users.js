exports.up = function(knex) {
  return knex.schema.createTable('users', function(table) {
    table.increments('id').primary();
    table.string('name').notNullable().unique();
    table.string('email').notNullable().unique();
    table.string('password').notNullable();
    table.boolean('email_confirmed').defaultTo(false);
    table.string('email_confirmation_token');
    table.timestamp('email_confirmation_sent_at');
    table.timestamps(true, true); 
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
