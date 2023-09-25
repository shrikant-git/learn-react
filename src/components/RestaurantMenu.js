import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import useRestaurantMenu from '../utils/useRestaurantMenu';

import Shimmer from './Shimmer';

const RestaurantMenu = () => {
  // const [resInfo, setResInfo] = useState(null);

  //How to get the data is abstracted(SRP)
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);

  console.log('res: ', resInfo);

  // const fetchMenu = async () => {
  //   const data = await fetch(MENU_API + resId);
  //   const json = await data.json();
  //   setResInfo(json.data);
  // };

  // useEffect(() => {
  //   fetchMenu();
  // }, []);

  if (resInfo === null) return <Shimmer />;

  const { name, cuisines, costForTwo } = resInfo?.cards[0].card?.card?.info;

  const { carousel } = resInfo?.cards[2].groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card;

  return (
    <div className="menu">
      <h1>{name}</h1>
      <p>{cuisines.join(', ')}</p>
      <h3>{costForTwo}</h3>
      <h2>Menu</h2>
      <ul>
        {carousel?.map((item) => (
          <li key={item?.dish?.info?.id}>
            {item?.dish?.info?.name} -{'Rs. '}
            {item?.dish?.info?.price / 100 || item?.dish?.info?.defaultPrice / 100}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantMenu;
