import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import useRestaurantMenu from '../utils/useRestaurantMenu';
import RestaurantCategory from './RestaurantCategory';

import Shimmer from './Shimmer';

const RestaurantMenu = () => {
  const [showIndex, setShowIndex] = useState(0);

  //How to get the data is abstracted(SRP)
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);

  if (resInfo === null) return <Shimmer />;

  const { name, cuisines, costForTwo } = resInfo?.cards[0].card?.card?.info;

  // const { itemCards } = resInfo?.cards[2].groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card;

  const categories = resInfo?.cards[2].groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
    (c) =>
      c.card?.card?.['@type'] === 'type.googleapis.com/swiggy.presentation.food.v2.ItemCategory',
  );

  return (
    <div className="text-center">
      <h1 className="font-bold my-6 text-2xl">{name}</h1>
      <p className="font-bold text-lg">{cuisines.join(', ')}</p>
      <h3>{costForTwo}</h3>
      <h2>Menu</h2>
      {categories?.map((category, index) => (
        //Controlled component since it's toggling is managed by it's parent
        <RestaurantCategory
          key={category?.card?.card?.title}
          data={category?.card?.card}
          showItems={index === showIndex}
          setShowIndex={() => setShowIndex(index)}
        />
      ))}

      {/* <ul>
        {itemCards?.map((item) => (
          <li key={item?.card?.info?.id}>
            {item?.card?.info?.name} -{'Rs. '}
            {item?.card?.info?.price / 100 || item?.card?.info?.defaultPrice / 100}
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default RestaurantMenu;
