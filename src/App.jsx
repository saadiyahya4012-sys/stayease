import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Hotels from './pages/Hotels.jsx';
import HotelDetails from './pages/HotelDetails.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Booking from './pages/Booking.jsx';
import Confirmation from './pages/Confirmation.jsx';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

function AppShell({ demoUser, onDemoLogin, onLogout }) {
  const location = useLocation();
  const isStandaloneLogin = location.pathname === '/login';

  return (
    <div className="min-h-screen flex flex-col">
      {!isStandaloneLogin && <Navbar demoUser={demoUser} onLogout={onLogout} />}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/hotels/:id" element={<HotelDetails />} />
          <Route path="/login" element={<Login onDemoLogin={onDemoLogin} />} />
          <Route path="/register" element={<Register onDemoLogin={onDemoLogin} />} />
          <Route path="/booking/:id" element={<Booking demoUser={demoUser} />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      {!isStandaloneLogin && <Footer />}
    </div>
  );
}

export default function App() {
  const [demoUser, setDemoUser] = useState(null);

  const handleDemoLogin = (user) => {
    setDemoUser(user);
  };

  const handleLogout = () => {
    setDemoUser(null);
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppShell
        demoUser={demoUser}
        onDemoLogin={handleDemoLogin}
        onLogout={handleLogout}
      />
    </BrowserRouter>
  );
}
