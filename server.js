process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION💥 Shutting Down...');
  console.log(err.name, err.message);
  process.exit(1);
});
require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./index');
const DB = process.env.DATABASE_URL;

mongoose
  .connect(DB)
  .then(() => {
    console.log('Connect Database Successfully 🚀');
  })
  .catch((err) => {
    console.log('DATABASE CONNECTION ERROR 💥');
    console.log(err.name);
    console.log(err.message);
  });

const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION💥 Shutting Down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
