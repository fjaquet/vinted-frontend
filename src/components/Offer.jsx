import { Link } from "react-router-dom";

const Offer = ({ offer }) => {
  return (
    <Link to={`offer/${offer._id}`} className="offer-card">
      <div className="offer-card__owner">
        <img
          className="offer-card__avatar"
          src={offer.owner.account.avatar.url}
          alt=""
        />
        <p className="offer-card__username">{offer.owner.account.username}</p>
      </div>
      <img className="offer-card__image" src={offer.product_image.url} alt="" />
      <div className="offer-card__details">
        <p className="offer-card__price">{offer.product_price} €</p>
        <p className="offer-card__size">{offer.product_details[1].TAILLE}</p>
        <p className="offer-card__brand">{offer.product_details[0].MARQUE}</p>
      </div>
    </Link>
  );
};

export default Offer;
