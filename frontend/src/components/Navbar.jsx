import { Link } from "react-router-dom";
import { useAuth } from '../hooks/useAuth.js';

export default function Navbar() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    if (window.confirm('Deseja sair do sistema?')) {
      await logout();
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          ONG-ADAPV
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/Animais">
                Animais
              </Link>
            </li>
            {user && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/Inscricoes">
                    Vagas
                  </Link>
                </li>
                <div className="navbar-nav">
                  <span className="navbar-text me-3">
                    Olá, {user.email} ({user.role})
                  </span>
                  <button
                    className="btn btn-outline-light btn-sm"
                    onClick={handleLogout}
                  >
                    Sair
                  </button>
                </div>
              </>
            )}

          </ul>

        </div>

      </div>
    </nav>
  );
}
