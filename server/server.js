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

//get token access from the frontend
app.get('/getTokenAccess', async function(req, res){
    const accessToken = req.query.code;
    const params  = '?client_id=' + CLIENT_ID + "&client_secret" + CLIENT_SECRET + "&code=" + accessToken;
    const response = await fetch("https://github.com/login/oauth/access_token" + params, {
        method: 'POST',
        headers:{
            "Accept": "application/json"
        }
    }).then((response)=>{
        return response.json();
    }).then((data)=>{
        res.json(data);
    })
});


//get user data
app.get('/getUserData', async function(req, res){
    req.get("Authorization"); //Bearer ACCESSTOKEN

    const response = await fetch("https://api.github.com/user", {
        method: "GET",
        header:{
            "Authorization" : req.get("Authorization")
        }
    }).then((response)=>{
        return response.json();
    }).then((data)=>{
        res.json(data);
    })
})

const port = 4000;

app.listen(port, function(){
    console.log(`server is up and running at ${port}`)
})

