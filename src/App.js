import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import Login from './components/Login';
import Register from './components/Register';
import UserRecipes from './components/UserRecipes';
import PublicRecipes from './components/PublicRecipes';
import MixItUp from './components/MixItUp';
import { AuthContext, AuthProvider } from './components/AuthContext';

function AppContent() {
  const { token, setToken } = useContext(AuthContext);

  const handleLogout = () => {
    setToken(null);
    window.location.href = '/login';
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">Ricette App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {token ? (
                <>
                  <Nav.Link as={Link} to="/user-recipes">Le Mie Ricette</Nav.Link>
                  <Nav.Link as={Link} to="/public-recipes">Ricette Pubbliche</Nav.Link>
                  <Nav.Link as={Link} to="/mix">Mix It Up</Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/login">Login</Nav.Link>
                  <Nav.Link as={Link} to="/register">Registrati</Nav.Link>
                </>
              )}
            </Nav>
            {token && <Button variant="outline-light" onClick={handleLogout}>Logout</Button>}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="mt-4">
        <Routes>
          <Route path="/login" element={ <Login /> } />
          <Route path="/register" element={!token ? <Register /> : <Navigate to="/user-recipes" />} />
          <Route path="/user-recipes" element={token ? <UserRecipes /> : <Navigate to="/login" />} />
          <Route path="/public-recipes" element={token ? <PublicRecipes /> : <Navigate to="/login" />} />
          <Route path="/mix" element={token ? <MixItUp /> : <Navigate to="/login" />} />
          <Route path="/" element={token ? <UserRecipes /> : <Login />} />
        </Routes>
      </Container>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
