const server = require('./server');
const PORT = 5500;

server.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
})
