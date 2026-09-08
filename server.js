process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION💥 Shutting Down...');
  console.log(err.name, err.message);
  process.exit(1);
});
require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./index');
const DB = process.env.DATABASE_URL;
mongoose.connect(DB).then(() => {
  console.log('Connect Database Successfuly🚀');
});

const PORT = process.env.PORT || 3000;
let server;
if (!process.env.VERCEL) {
  server = app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`);
  });
}

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION💥 Shutting Down...');
  console.log(err.name, err.message);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

module.exports = app;
