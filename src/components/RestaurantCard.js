import { CDN_URL } from '../utils/constants';

const RestaurantCard = (props) => {
  const { resData } = props;
  const { name, avgRating, cuisines, costForTwo, deliveryTime, cloudinaryImageId } = resData?.info;

  return (
    <div className="res-card">
      <img className="res-logo" src={CDN_URL + cloudinaryImageId} />
      <h3>{name}</h3>
      <h4>{cuisines.join(', ')}</h4>
      <h4>{avgRating} stars</h4>
      <h4>{costForTwo / 100} FOR TWO</h4>
      <h4>{deliveryTime} minutes</h4>
    </div>
  );
};

export default RestaurantCard;
