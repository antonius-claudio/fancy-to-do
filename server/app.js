require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const router = require('./routes');

app.use(express.json());
app.use(express.urlencoded({extended:false}));
console.log(`test env gak kebaca `, process.env.secret)
app.use(cors());
app.use(router);

app.listen(port, () => {
    console.log('listening on port: ', port);
});