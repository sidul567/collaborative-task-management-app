import './App.css';
import {Route, BrowserRouter, Routes} from 'react-router-dom'
import Registration from './components/User/Registration';
import Login from './components/User/Login';

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route exact path='/' element={<Registration />} />
            <Route exact path='/login' element={<Login />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
