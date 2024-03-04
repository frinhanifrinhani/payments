import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

import Navbar from './components/layout/Navbar'
import Container from './components/layout/Container'
import Footer from './components/layout/Footer'
import Message from './components/layout/Message'

import Home from './components/pages/Home'
import Register from './components/pages/Auth/Register'
import Login from './components/pages/Auth/Login'
import Profile from './components/pages/User/Profile'
import Balances from './components/pages/Balances/Balances'
import Payments from './components/pages/Payments/Payments'
import AddBalance from './components/pages/Balances/AddBalance'
import EditBalance from './components/pages/Balances/EditBalance'

import { UserProvider } from './context/UserContext'

function App() {
  return (
    <Router>
      <UserProvider>
        <Navbar />
        <Message />
        <Container>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/user/profile' element={<Profile />} />
            <Route path='/balance' element={<Balances />} />
            <Route path='/balance/add' element={<AddBalance />} />
            <Route path='/balance/edit/:id' element={<EditBalance />} />
            <Route path='/payment' element={<Payments />} />
            <Route path='/' element={<Home />} />
          </Routes>
        </Container>
        <Footer />
      </UserProvider>
    </Router>
  );
}

export default App;
