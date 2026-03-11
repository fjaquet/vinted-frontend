const ProductDetails = ({ detail }) => {
  const [tabDetail] = Object.entries(detail);

  return (
    <li className="offer__detail-item">
      <span className="offer__detail-label">{tabDetail[0]}</span>
      <span className="offer__detail-value">{tabDetail[1]}</span>
    </li>
  );
};

export default ProductDetails;
