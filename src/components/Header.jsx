import logo from "../assets/img/logo.png";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Header = () => {
  const navigate = useNavigate();
  const token = Cookies.get("token");

  return (
    <header>
      <div className="container">
        <Link to="/">
          <img className="header__logo" src={logo} alt="logo vinted" />
        </Link>

        <div className="header__actions">
          {token ? (
            <div className="header__auth">
              <button
                className="header__btn disconnect-btn"
                onClick={() => {
                  Cookies.remove("token");
                  navigate("/");
                }}
              >
                Se déconnecter
              </button>
            </div>
          ) : (
            <div className="header__auth">
              <button
                className="header__btn"
                onClick={() => {
                  navigate("/signup");
                }}
              >
                S'inscrire
              </button>
              <button
                className="header__btn"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Se connecter
              </button>
            </div>
          )}

          <button className="header__btn">Vends tes articles</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
