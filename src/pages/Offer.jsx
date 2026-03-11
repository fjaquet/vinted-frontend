import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import ProductDetails from "../components/ProductDetails";
import "../assets/css/Offer.css";

const OfferPage = () => {
  const { id } = useParams();

  const [offer, setOffer] = useState({});
  const [isLoading, setIsloading] = useState(true);

  const VITE_API_fqdn = import.meta.env.VITE_API_fqdn;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios({
          method: "get",
          url: `https://${VITE_API_fqdn}/offer/${id}`,
        });

        const newOffer = response.data;

        setOffer(newOffer);
        setIsloading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <p>loading</p>
      ) : (
        <main>
          <div className="container">
            <img
              className="offer__image"
              src={offer.product_pictures[0].url}
              alt="test"
            />

            <aside className="offer__panel">
              <p className="offer__price">{offer.product_price} €</p>
              <ul className="offer__details">
                {offer.product_details.map((detail, index) => (
                  <ProductDetails key={index} detail={detail} />
                ))}
              </ul>
              <p className="offer__name">{offer.product_name}</p>
              <p className="offer__desc">{offer.product_description}</p>
              <div className="offer__owner">
                <img
                  className="offer__owner-avatar"
                  src={offer.owner.account.avatar.url}
                  alt="toto"
                />
                <p className="offer__owner-name">
                  {offer.owner.account.username}
                </p>
              </div>
              <button className="offer__buy-btn">Acheter</button>
            </aside>
          </div>
        </main>
      )}
    </>
  );
};

export default OfferPage;
