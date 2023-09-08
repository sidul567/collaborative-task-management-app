import './App.css';
import {Route, BrowserRouter, Routes} from 'react-router-dom'
import Registration from './components/User/Registration';
import Login from './components/User/Login';
import Home from './components/Home/Home';
import ProtectedRoute from './components/Route/ProtectedRoute';
import Invitation from './components/Invitation/Invitation';
import MyTeam from './components/Team/MyTeam';
import ManageTask from './components/Home/ManageTask';
import 'react-toastify/dist/ReactToastify.css';
import Toaster from './components/Toaster/Toaster';
import Profile from './components/Profile/Profile';
import NotFound from './components/NotFound/NotFound';

function App() {
  return (
    <BrowserRouter>
        <Toaster />
        <Routes>
            <Route exact path='/' element={<Login />} />
            <Route exact path='/registration' element={<Registration />} />
            <Route exact path='/' element={<ProtectedRoute />}>
              <Route exact path='home' element={<Home />} />
              <Route exact path='team' element={<MyTeam />} />
              <Route exact path='profile' element={<Profile />} />
              <Route exact path='task/:id' element={<ManageTask />} />
              <Route exact path='invitation/:username' element={<Invitation />} />
            </Route>
            <Route path='*' element={<NotFound />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
