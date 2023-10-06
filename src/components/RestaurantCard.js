import { CDN_URL } from '../utils/constants';

const RestaurantCard = (props) => {
  const { resData } = props;
  const { name, avgRating, cuisines, costForTwo, deliveryTime, cloudinaryImageId } = resData;

  return (
    <div
      data-testid="resCard"
      className="m-4 p-4 w-[200px] bg-gray-100 hover:bg-gray-200 rounded-lg"
    >
      <img className="rounded-lg" src={CDN_URL + cloudinaryImageId} />
      <h3 className="font-bold py-5 text-lg">{name}</h3>
      <h4>{cuisines.join(', ')}</h4>
      <h4>{avgRating} stars</h4>
      <h4>{costForTwo / 100} FOR TWO</h4>
      <h4>{deliveryTime} minutes</h4>
    </div>
  );
};

export const withPromotedLabel = (RestaurantCard) => {
  return (props) => {
    return (
      <div>
        <label className="absolute bg-black text-white m-2 p-2 rounded-lg">Promoted</label>
        <RestaurantCard {...props} />
      </div>
    );
  };
};

export default RestaurantCard;
