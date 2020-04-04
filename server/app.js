require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const router = require('./routes');

app.use(express.json());
app.use(express.urlencoded({extended:false}));
console.log(`secret=`, process.env.secret)
console.log(`clientId=`, process.env.clientId)
console.log(`clientSecret=`, process.env.clientSecret)
console.log(`client_id=`, process.env.client_id)
console.log(`client_id_github=`, process.env.client_id_github)
console.log(`client_secret_github=`, process.env.client_secret_github)

app.use(cors());
app.use(router);

app.listen(port, () => {
    console.log('listening on port: ', port);
});