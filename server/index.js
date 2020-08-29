const express = require('express');
const path = require('path');

// Setting up Express instance with port 
const app = express();
const port = process.env.PORT || 4000;

// Serve static React files
app.use(express.static(path.join(__dirname, '../public')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')));
};

// Default route
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'), 
  function (err) {
    res.status(500).send(err)
  })
})

// Initiate server listening
app.listen(port, () => {
  console.log(`Server now listening on Port ${port}...`);
});