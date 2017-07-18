const dbuser = 'dbUser';
const dbpassword = '123456';

const port = 3000;
const connectionString = `mongodb://${dbuser}:${dbpassword}@ds155132.mlab.com:55132/share-db`;
// const connectionString = 'mongodb://localhost/mydb';
module.exports = { port, connectionString };
