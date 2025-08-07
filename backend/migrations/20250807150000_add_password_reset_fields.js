exports.up = function(knex) {
  return knex.schema.table('users', function(table) {
    table.string('password_reset_token');
    table.timestamp('password_reset_sent_at');
  });
};

exports.down = function(knex) {
  return knex.schema.table('users', function(table) {
    table.dropColumn('password_reset_token');
    table.dropColumn('password_reset_sent_at');
  });
};
