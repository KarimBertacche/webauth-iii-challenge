
exports.up = function(knex) {
    return knex.schema
        .createTable('users', table => {
            table.increments();
            table.text('username', 128).notNullable();
            table.text('password').notNullable();
            table.string('departments');
        });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
};
