import './App.css';
import {Route, BrowserRouter, Routes} from 'react-router-dom'
import Registration from './components/User/Registration';
import Login from './components/User/Login';
import Home from './components/Home/Home';
import ProtectedRoute from './components/Route/ProtectedRoute';
import Invitation from './components/Invitation/Invitation';

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route exact path='/' element={<Registration />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/' element={<ProtectedRoute />}>
              <Route exact path='home' element={<Home />} />
              <Route exact path='invitation/:username' element={<Invitation />} />
            </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
