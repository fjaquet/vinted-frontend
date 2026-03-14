import logo from "../assets/img/logo.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { Range } from "react-range";

const Header = ({
  filterTitle,
  setFilterTitle,
  ascPrice,
  setAscPrice,
  prices,
  setPrices,
}) => {
  const navigate = useNavigate();
  const token = Cookies.get("token");

  let location = useLocation();

  return (
    <header>
      <div className="container">
        <Link to="/">
          <img className="header__logo" src={logo} alt="logo vinted" />
        </Link>

        {location.pathname === "/" && (
          <div className="header__filters">
            <div className="header__filters-title">
              <HiOutlineMagnifyingGlass className="glass" />
              <input
                type="text"
                name="filterTitle"
                id="filterTitle"
                placeholder="Recherche des articles"
                value={filterTitle}
                onChange={(event) => setFilterTitle(event.target.value)}
              />
            </div>

            <div className="header__filters-price">
              <p>Trier par prix: </p>
              <div
                className="header__filters-price-toggle"
                onClick={() => {
                  setAscPrice(!ascPrice);
                }}
              >
                <div className="header__filters-price-button"></div>

                {ascPrice ? (
                  <span className="header__filters-price-icon--asc">↑</span>
                ) : (
                  <span className="header__filters-price-icon--desc">↓</span>
                )}
              </div>

              <div className="header__price-range">
                <p className="header__price-range-text">Prix entre :</p>

                <Range
                  label="Select your value"
                  step={0.1}
                  min={0}
                  max={1000}
                  values={prices}
                  onChange={(prices) => setPrices(prices)}
                  renderTrack={({ props, children }) => (
                    <div
                      {...props}
                      style={{
                        ...props.style,
                        height: "6px",
                        width: "100%",
                        backgroundColor: "#ccc",
                        borderRadius: "3px",
                      }}
                    >
                      {children}
                    </div>
                  )}
                  renderThumb={({ props, index }) => (
                    <div
                      {...props}
                      key={props.key}
                      style={{
                        ...props.style,
                        height: "20px",
                        width: "20px",
                        borderRadius: "50%",
                        backgroundColor: "#2cb1ba",
                      }}
                    >
                      <div style={{ position: "relative" }}>
                        <div
                          style={{
                            position: "absolute",
                            top: "-25px",
                            left: "50%",
                            transform: "translateX(-50%)",
                            whiteSpace: "nowrap",
                            pointerEvents: "none",
                            backgroundColor: "#2cb1ba",
                            color: "white",
                            padding: "4px",

                            borderRadius: "5px",
                          }}
                        >
                          {prices[index]} €
                        </div>
                      </div>
                    </div>
                  )}
                />
              </div>
            </div>
          </div>
        )}
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
