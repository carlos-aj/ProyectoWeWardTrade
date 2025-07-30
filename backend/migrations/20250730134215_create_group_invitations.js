exports.up = function(knex) {
    return knex.schema.createTable('group_invitations', function(table) {
        table.increments('id').primary();
        table.integer('group_id').unsigned().notNullable();
        table.integer('sender_id').unsigned().notNullable();
        table.integer('receiver_id').unsigned().notNullable();
        table.enum('status', ['pending', 'accepted', 'rejected']).defaultTo('pending');
        table.foreign('sender_id').references('id').inTable('users');
        table.foreign('receiver_id').references('id').inTable('users');
        table.foreign('group_id').references('id').inTable('group');
        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('group_invitations');
};