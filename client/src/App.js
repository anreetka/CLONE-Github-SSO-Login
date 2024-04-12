import { useEffect, useState } from 'react';
import './App.css';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

function App() {
  const [userData, setUserData] = useState({});
  const [reRender, setReRender] = useState(false);
  const [userRepo, setUserRepo] = useState({});

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

  async function getUserRepoData(){
    const username = userData.login;
    console.log(username);
    const response = await fetch("http://localhost:4000/getUserRepos?username=" + username,{
      method: "GET",
    });
    console.log(response);
    const data = await response.json();
    setUserRepo(data);
    data.forEach(repo=>console.log(repo.name));
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
          <h1 style={{color: "white", marginTop:'0px', paddingTop:'10px'}}>Welcome to the Logged Session {userData.name}!</h1>

          <button className='get-repos git-signup'
          onClick={getUserRepoData}
          >Get My Repos</button>

          <button className='git-signup log'
          onClick={handleLogout} 
          >Logout</button>

        <div class="repo-container">
          {userRepo.length > 0 ? (
            userRepo.map((repo) => (
              <div key={repo.id} className="repo-card">

                <h3>{repo.name}</h3>
                <p>Visibility: {repo.visibility}</p>

              </div>
            ))
          ) : (
            <div className="no-repo">Click on get my repos to fetch repositories.</div>
          )}
        </div>
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
