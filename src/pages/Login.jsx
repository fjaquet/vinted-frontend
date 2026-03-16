import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "../styles/pages/auth.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const VITE_API_fqdn = import.meta.env.VITE_API_fqdn;

  const navigate = useNavigate();

  const handleChange = (setValue) => {
    return (event) => {
      setValue(event.target.value);
    };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios({
        method: "post",
        url: `https://${VITE_API_fqdn}/user/login`,
        data: {
          email: email,
          password: password,
        },
      });
      Cookies.set("token", response.data.token, { expires: 7 });
      navigate("/publish");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      <div className="signup-page__container">
        <h1>Se connecter</h1>
        <form onSubmit={handleSubmit}>
          <input
            className="signup-form__input"
            type="email"
            name="Adresse email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={handleChange(setEmail)}
          />
          <input
            className="signup-form__input"
            type="password"
            name="password"
            id="password"
            placeholder="Mot de passe"
            value={password}
            onChange={handleChange(setPassword)}
          />

          <button>Se connecter</button>
        </form>
        <Link to="/signup">Pas encore de compte ? Inscris-toi !</Link>
      </div>
    </main>
  );
};

export default LoginPage;
