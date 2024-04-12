import { useEffect, useState } from 'react';
import './App.css';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

function App() {
  const [userData, setUserData] = useState({});
  const [reRender, setReRender] = useState(false);

  useEffect(()=>{
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParams = urlParams.get("code");

    if(codeParams && (localStorage.getItem("accessToken") === null)){
        async function getAccessToken(){
          await fetch("http://localhost:4000/getTokenAccess?code="+ codeParams,{
            method:"GET"
          }).then((response)=>{
            console.log(response);
            return response.json();
          }).then((data)=>{
            console.log(data);
            if(data.access_token){
              localStorage.setItem("accessToken", data.access_token);
              getUserData();
              setReRender(reRender=>!reRender);
            }
          })
        }

        getAccessToken();
    }
  }, [reRender]);

  async function getUserData(){
    await fetch('http://localhost:4000/getUserData', {
      method: "GET",
      headers:{
        "Authorization": "Bearer " + localStorage.getItem("accessToken")
      }
    }).then((response)=>{
      return response.json();
    }).then((data)=>{
      setUserData(data);
    })
  }

  function handleLogout(){
    localStorage.removeItem("accessToken"); 
    setReRender(!reRender);
    setUserData({});
  }

  
  function loginWithGithub(){
    window.location.assign("https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID);
  }


  return (
    <div className="App">
      <header className="App-header">
        {/* check if the user is logged in or not */}
        {localStorage.getItem("accessToken")?
        <>
          <h1>Welcome to the Logged Session {userData.name}!</h1>
          <button className='git-signup log'
          onClick={handleLogout} 
          >Logout</button>
        </>
        :
        <>
          <img src='https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png' className='github-img' alt='github-logo' /><br/>
          <p className='begin-p'>To continue, please sign in with your github below:</p>
          <button className='git-signup'
          onClick={loginWithGithub}
          >Sign in with Github (SSO)</button>
        </>
        
        }
      </header>
    </div>
  );
}

export default App;
