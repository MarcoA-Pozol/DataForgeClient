import './App.css';
import LoginView from './components/Authentication/Login/LoginView.jsx';
import UsersDataList from './components/DataVisualization/UsersDataList.jsx';
import RefreshAccessTokenModule from './components/Authentication/JWTManagement/JWTRefresh.jsx';

function App() {
  return (
    <div className="App">
      <h1>Hola, este es un login</h1>
      <LoginView/>
      <UsersDataList/>
      <RefreshAccessTokenModule/>
    </div>
  );
}

export default App;
