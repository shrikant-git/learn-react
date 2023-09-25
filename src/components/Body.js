import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Shimmer from './Shimmer';
import RestaurantCard from './RestaurantCard';
import useOnlineStatus from '../utils/useOnlineStatus';
// import restaurantList from '../utils/mockData';

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurants, setfilteredRestaurants] = useState([]);

  const [searchText, setSearchText] = useState('');

  const fetchData = async () => {
    const data = await fetch(
      'https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING',
    );
    const json = await data.json();
    setListOfRestaurants(
      json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants,
    );
    setfilteredRestaurants(
      json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants,
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onlineStatus = useOnlineStatus();

  if (onlineStatus === false)
    return <h1>Looks like you are offline!. Please check your internet status</h1>;

  //Conditional Rendering
  // if (listOfRestaurants?.length === 0) return <Shimmer />;

  return listOfRestaurants?.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter">
        <div className="search m-4 p-4">
          {/*binding local value with input */}
          <input
            type="text"
            className="border border-solid"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            onClick={() => {
              const filteredRestaurant = listOfRestaurants?.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase()),
              );
              setfilteredRestaurants(filteredRestaurant);
            }}
          >
            Search
          </button>
        </div>
        <button
          className="filter-bn"
          onClick={() => {
            const filteredList = listOfRestaurants?.filter((res) => res.info.avgRating > 4);
            setListOfRestaurants(filteredList);
          }}
        >
          Top Rated Restaurant
        </button>
      </div>
      <div className="res-container">
        {filteredRestaurants?.map((restaurant) => (
          <Link key={restaurant?.info?.id} to={'/restaurants/' + restaurant?.info?.id}>
            <RestaurantCard resData={restaurant} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
