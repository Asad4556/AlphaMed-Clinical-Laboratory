const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('alphamed_lims', 'root', '', {
    host: 'localhost',
    dialect: 'mysql', // Or 'postgres'
    logging: false
});

sequelize.authenticate()
    .then(() => console.log('✅ Database connected successfully'))
    .catch(err => console.error('❌ DB Connection Error: ', err));

module.exports = sequelize;
