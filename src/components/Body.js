import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import Shimmer from './Shimmer';
import RestaurantCard, { withPromotedLabel } from './RestaurantCard';
import useOnlineStatus from '../utils/useOnlineStatus';
import UserContext from '../utils/userContext';

// import restaurantList from '../utils/mockData';

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurants, setfilteredRestaurants] = useState([]);

  const [searchText, setSearchText] = useState('');

  const { loggedInUser, setUsername } = useContext(UserContext);

  //HOC
  const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);

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
      <div className="filter flex">
        <div className="search m-4 p-4">
          {/*binding local value with input */}
          <input
            type="text"
            data-testid="searchInput"
            className="border border-solid"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            className="px-4 py-2 bg-green-100 m-4 rounded-md"
            onClick={() => {
              const filteredRestaurant = listOfRestaurants?.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase()),
              );
              setfilteredRestaurants(filteredRestaurant);
            }}
          >
            Search
          </button>
          <button
            className="px-4 py-2 bg-gray-100 rounded-lg"
            onClick={() => {
              const filteredList = listOfRestaurants.filter((res) => res.info.avgRating > 4);
              setfilteredRestaurants(filteredList);
            }}
          >
            Top Rated Restaurants
          </button>
        </div>

        <div className="search m-4 p-4 flex items-center">
          <label>Logged in user: </label>
          <input
            type="text"
            className="border border-black px-4"
            value={loggedInUser}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-wrap">
        {filteredRestaurants?.map((restaurant) => (
          <Link key={restaurant?.info?.id} to={'/restaurants/' + restaurant?.info?.id}>
            {restaurant?.info?.promoted ? (
              <RestaurantCardPromoted resData={restaurant?.info} />
            ) : (
              <RestaurantCard resData={restaurant?.info} />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
