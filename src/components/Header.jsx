import logo from "../assets/img/logo.png";

const Header = () => {
  return (
    <header>
      <div className="container">
        <img className="header__logo" src={logo} alt="logo vinted" />
        <div className="header__actions">
          <div className="header__auth">
            <button className="header__btn">S'inscrire</button>
            <button className="header__btn">Se connecter</button>
          </div>
          <button className="header__btn">Vends tes articles</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
