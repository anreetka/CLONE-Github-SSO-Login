const express = require('express');
const cors = require('cors');
const fetch=(...args)=>{
    import('node-fetch').then(({default: fetch})=>fetch(...args));
}
const bodyParser = require('body-parser'); 

require('dotenv').config();

const CLIENT_ID=process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

const app = express();

app.use(cors());
app.use(bodyParser.json());

const port = 4000;

app.listen(port, function(){
    console.log(`server is up and running at ${port}`)
})

