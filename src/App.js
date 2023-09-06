import './App.css';
import {Route, BrowserRouter, Routes} from 'react-router-dom'
import Registration from './components/User/Registration';

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route exact path='/' element={<Registration />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
