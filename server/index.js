const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000
// app.get('/', (req, res) => res.sendFile('../public/index.html'))

app.use(express.static(path.resolve(__dirname, 'public')))

app.listen(PORT)