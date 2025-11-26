import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AuthProvider from './components/AuthProvider.jsx';
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from './components/Navbar.jsx';
import Login from "./pages/Login";
import Home from "./pages/Home";

function App() {

  return (
    <>
      <Router>
        <AuthProvider>
          <div className="App">
            <Navbar />

            <Routes>
              <Route path="/login" element={<Login />} />

              <Route path="/" element={
                // <ProtectedRoute>
                  <Home />
                // </ProtectedRoute>
              } />

              {/* <Route path="/produtos" element={
                <ProtectedRoute roles={['admin', 'operador']}>
                  <ProdutosPage />
                </ProtectedRoute>
              } /> */}

              {/* <Route path="/pedidos" element={
                <ProtectedRoute roles={['admin', 'operador']}>
                  <PedidosPage />
                </ProtectedRoute>
              } /> */}
            </Routes>
          </div>
        </AuthProvider>
      </Router>
    </>
  )
}

export default App
