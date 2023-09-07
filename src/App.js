import './App.css';
import {Route, BrowserRouter, Routes} from 'react-router-dom'
import Registration from './components/User/Registration';
import Login from './components/User/Login';
import Home from './components/Home/Home';

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route exact path='/' element={<Registration />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/home' element={<Home />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
