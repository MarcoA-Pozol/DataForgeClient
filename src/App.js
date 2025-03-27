import './App.css';
import LoginView from './components/Authentication/Login/LoginView.jsx';
import UsersDataList from './components/DataVisualization/UsersDataList.jsx';
import RefreshAccessTokenModule from './components/Authentication/JWTManagement/JWTRefresh.jsx';

function App() {
  return (
    <div className="App">
      <RefreshAccessTokenModule/>
      <LoginView username='JuanMartinez' password='juanmartinez'/>
      <UsersDataList/>
    </div>
  );
}

export default App;
