import {Route,Routes} from "react-router-dom";
import LoginPage from "./components/LoginPage/LoginPage";
import UserPage from "./components/UserPage/UserPage";
import './App.css';

function App() {
  return (
    
    <div className="App">
      <Routes>
        <Route exact path="/" element={<LoginPage/>}/>
        <Route path="/user" element={<UserPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
