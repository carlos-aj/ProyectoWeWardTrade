exports.up = function(knex) {
    return knex.schema.createTable('group_members', function(table) {
        table.integer('user_id').unsigned().notNullable();
        table.integer('group_id').unsigned().notNullable();
        table.primary(['user_id', 'group_id']);
        table.foreign('user_id').references('id').inTable('users');
        table.foreign('group_id').references('id').inTable('group');
        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('group_members');
};