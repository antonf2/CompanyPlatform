import Layout from './Components/Shared/Layout';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import Management from './Pages/Management';
import Wiki from './Pages/Wiki';
import Inventory from './Pages/Inventory';
import Login from './Pages/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path='management' element={<Management />} />
          <Route path='wiki' element={<Wiki />} />
          <Route path='inventory' element={<Inventory />} />
        </Route>
        <Route path='login' element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
