exports.up = function(knex) {
    return knex.schema.createTable('user_cards', function(table) {
        table.increments('id').primary();
        table.integer('user_id').unsigned().notNullable();
        table.integer('card_id').unsigned().notNullable();
        table.boolean('status').defaultTo(false);
        table.integer('quantity').defaultTo(0);
        table.foreign('user_id').references('id').inTable('users');
        table.foreign('card_id').references('id').inTable('cards');
        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('user_cards');
};
