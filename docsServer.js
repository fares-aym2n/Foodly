const express = require('express');
const { router: docsRouter, swaggerDocument } = require('./docs/docs');

// Keep documentation in its own Vercel function. Loading Swagger UI assets
// must not import server.js, which establishes the MongoDB connection.
const app = express();

app.get('/api-docs.json', (req, res) => {
  res.type('application/json').send(swaggerDocument);
});
app.use('/api-docs', docsRouter);

module.exports = app;
