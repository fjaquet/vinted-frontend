import axios from "axios";
import { useEffect, useState } from "react";
import Offer from "../components/Offer";
import { useNavigate } from "react-router-dom";
import "../styles/pages/home.css";

const HomePage = ({ filterTitle, ascPrice, prices }) => {
  const [offers, setOffers] = useState([]);
  const [isLoading, setIsloading] = useState(true);

  const VITE_API_fqdn = import.meta.env.VITE_API_fqdn;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let queryUrl = "";
        let sort = "";
        if (ascPrice) {
          sort = "price-asc";
        } else {
          sort = "price-desc";
        }

        const minPrice = prices[0];
        const maxPrice = prices[1];

        if (filterTitle) {
          queryUrl = `https://${VITE_API_fqdn}/offers?sort=${sort}&title=${filterTitle}&priceMin=${minPrice}&priceMax=${maxPrice}`;
        } else {
          queryUrl = `https://${VITE_API_fqdn}/offers?sort=${sort}&priceMin=${minPrice}&priceMax=${maxPrice}`;
        }
        const response = await axios({
          method: "get",
          url: queryUrl,
        });

        const newOffers = response.data.offers;

        setOffers(newOffers);
        setIsloading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [filterTitle, ascPrice, prices]);

  return (
    <>
      {isLoading ? (
        <main>
          <p>Is loading...</p>
        </main>
      ) : (
        <main>
          <section className="home__hero">
            <div className="home__hero-content">
              <p className="home__hero-title">
                Prêts à faire du tri dans vos placards ?
              </p>
              <button
                className="home__hero-button"
                onClick={() => {
                  navigate("/publish");
                }}
              >
                Commencer à vendre
              </button>
            </div>
          </section>

          <section className="home__offers container">
            {offers.map((offer) => (
              <Offer key={offer._id} offer={offer} />
            ))}
          </section>
        </main>
      )}
    </>
  );
};

export default HomePage;
