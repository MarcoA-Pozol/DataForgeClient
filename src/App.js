import './App.css';
import LoginView from './components/Authentication/Login/LoginView.jsx';
import RefreshAccessTokenModule from './components/Authentication/JWTManagement/JWTRefresh.jsx';

function App() {
  return (
    <div className="App">
      <LoginView/>
      <RefreshAccessTokenModule/>
    </div>
  );
}

export default App;
