const express = require('express');
const axios = require("axios");
const cors = require('cors');

// const fetch=(...args)=>{
//     import('node-fetch').then(({default: fetch})=>fetch(...args));
// }
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
    try{
        const response = await axios.get("https://github.com/login/oauth/access_token",{
            params: {
                client_id : CLIENT_ID,
                client_secret: CLIENT_SECRET,
                code: accessToken
            },
            headers:{
                "Accept": "application/json",
                "Accept-Encoding": "application/json"
            },
        });
        res.json(response.data);
    }catch(error){
        console.log("Error: ", error);
        return {error: "Internal Server Error"};
    }
});

//get user data
app.get('/getUserData', async function(req, res){
    const authorizationHeader = req.get("Authorization"); //Bearer ACCESSTOKEN
    const response = await axios.get("https://api.github.com/user", {
        headers:{
            "Authorization" : authorizationHeader
        }
    });
    res.json(response.data);
})

app.get('/getUserRepos', async function(req, res){
    const receivedUsername = req.query.username;
    const response = await axios.get('https://api.github.com/users/'+ receivedUsername + "/repos",{
        "Accept": "application/json"
    });
    response.data.forEach(repo=>console.log(repo.name));
    res.json(response.data);
})

const port = 4000;

app.listen(port, function(){
    console.log(`server is up and running at ${port}`)
})

