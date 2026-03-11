import axios from "axios";
import { useEffect, useState } from "react";
import Offer from "../components/Offer";
import "../assets/css/Home.css";

const HomePage = () => {
  const [offers, setOffers] = useState([]);
  const VITE_API_fqdn = import.meta.env.VITE_API_fqdn;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios({
          method: "get",
          url: `https://${VITE_API_fqdn}/offers`,
        });

        const newOffers = response.data.offers;

        setOffers(newOffers);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <main>
      <section className="home__hero">
        <div className="home__hero-content">
          <p className="home__hero-title">
            Prêts à faire du tri dans vos placards ?
          </p>
          <button className="home__hero-button">Commencer à vendre</button>
        </div>
      </section>

      <section className="home__offers container">
        {offers.map((offer) => (
          <Offer key={offer._id} offer={offer} />
        ))}
      </section>
    </main>
  );
};

export default HomePage;
