exports.up = function(knex) {
    return knex.schema.createTable('friendships', function(table) {
        table.integer('user_id').unsigned().notNullable();
        table.integer('friend_id').unsigned().notNullable();
        table.enum('status', ['pending', 'accepted', 'rejected']).defaultTo('pending');
        table.primary(['user_id', 'friend_id']);
        table.foreign('user_id').references('id').inTable('users');
        table.foreign('friend_id').references('id').inTable('users');
        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('friendships');
};