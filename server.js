const express = require('express');
const server = express();
const userRoutes = require('./users/userRouter');
const postRoutes = require('./posts/postRouter');

server.use(logger);
server.use(express.json());

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});
server.use('/api/users', userRoutes);
server.use('/api/posts', postRoutes);

//custom middleware

function logger(req, res, next) {
  console.log(`${req.method} ${req.originalUrl} at ${new Date().toString()}`);
  next();
}

module.exports = server;
