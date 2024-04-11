import './App.css';


const CLIENT_ID = process.env.MY_CLIENT_ID;

function App() {

  function loginWithGithub(){
    window.location.assign("https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src='https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png' className='github-img' alt='github-logo' /><br/>
        <p className='begin-p'>To continue, please sign in with your github below:</p>
        <button className='git-signup'>Sign in with Github (SSO)</button>
      </header>
    </div>
  );
}

export default App;
