import './App.css';
import LoginView from './components/Authentication/Login/LoginView.jsx';
import RegisterView from './components/Authentication/Register/RegisterView.jsx';
import RefreshAccessTokenModule from './components/Authentication/JWTManagement/JWTRefresh.jsx';

function App() {
  return (
    <div className="App">
      <LoginView/>
      <RegisterView/>
      <RefreshAccessTokenModule/>
    </div>
  );
}

export default App;
