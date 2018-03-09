const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3002
// app.get('/', (req, res) => res.sendFile('../public/index.html'))

if (process.env.NODE_ENV ==="production"){
  app.use(express.static(path.resolve(__dirname, 'public')))
}


app.listen(PORT, ()=>console.log('working!!!'))
