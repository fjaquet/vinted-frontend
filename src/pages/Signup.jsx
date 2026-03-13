import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "../assets/css/Signup.css";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);

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
        url: `https://${VITE_API_fqdn}/user/signup`,
        data: {
          email: email,
          username: username,
          password: password,
          newsletter: newsletter,
        },
      });
      Cookies.set("token", response.data.token, { expires: 7 });
      navigate("/");
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <main>
      <div className="signup-page__container">
        <h1>S'inscrire</h1>
        <form onSubmit={handleSubmit}>
          <input
            className="signup-form__input"
            type="text"
            username="username"
            id="username"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={handleChange(setUsername)}
          />
          <input
            className="signup-form__input"
            type="email"
            username="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={handleChange(setEmail)}
          />
          <input
            className="signup-form__input"
            type="password"
            username="password"
            id="password"
            placeholder="Mot de passe"
            value={password}
            onChange={handleChange(setPassword)}
          />
          <div className="signup-form__newsletter">
            <input
              className="signup-form__checkbox"
              type="checkbox"
              username="newsletter"
              id="newsletter"
              checked={newsletter}
              onChange={(event) => {
                setNewsletter(event.target.checked);
              }}
            />

            <label
              className="signup-form__newsletter-text"
              htmlFor="newsletter"
            >
              S'inscrire à notre newsletter
            </label>
          </div>
          <p className="signup-form__legal">
            En m'inscrivant je confirme avoir lu et accepté les Termes &
            Conditions et Politique de Confidentialité de Vinted. Je confirme
            avoir au moins 18 ans.
          </p>
          <button>S'inscrire</button>
        </form>
        <Link to="/login">Tu as déjà un compte ? Connecte-toi !</Link>
      </div>
    </main>
  );
};

export default SignupPage;
