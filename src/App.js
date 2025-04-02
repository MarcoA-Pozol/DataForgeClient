import './App.css';
import RefreshAccessTokenModule from './components/Authentication/JWTManagement/JWTRefresh.jsx';
import AuthenticationView from "./components/Authentication/AuthenticationView.jsx";

function App() {
  return (
    <div className="App">
      <AuthenticationView/>
      <RefreshAccessTokenModule/>
    </div>
  );
}

export default App;
