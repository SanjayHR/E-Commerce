import RestaurantCard from "./RestaurantCard.js";
import { useState, useEffect, useContext } from "react";
import Shimmer from "./Shimmer.js";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus.js";
import { Restaurant_API_URL } from "../utils/constants.js";
import UserContext from "../utils/userContext.js";

const Body = () => {
  // useState hook to create a state variable listOfRestaurants and a function setlistOfRestaurants to update it. The initial value is the local mock data.
  const [listOfRestaurants, setlistOfRestaurants] = useState(null);
  const [filteredRestaurants, setFilteredRestaurants] = useState(null);

  const [searchText, setSearchText] = useState("");

  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch data from the Swiggy API using the fetch function
      const data = await fetch(Restaurant_API_URL);

      // Convert the response to JSON format
      const json = await data.json();

      const restaurants =
        json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants ?? resList;

      // Optional Chaining - ?. is used to avoid errors if any property in the chain is undefined or null
      setlistOfRestaurants(restaurants);
      setFilteredRestaurants(restaurants);
    } catch (error) {
      console.warn("Swiggy API fetch failed, using local mock data instead.");
      setlistOfRestaurants(resList);
      setFilteredRestaurants(resList);
    }
  };

  const onlineStatus = useOnlineStatus();

  if (onlineStatus === false) {
    return (
      <h1>
        Looks like you are offline. Please check your internet connection.
      </h1>
    );
  }

  const { loggedInUser, setUserName } = useContext(UserContext);

  return listOfRestaurants?.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter flex">
        <div className="Search m-4 p-4">
          <input
            type="text"
            className="border-collapse border-2 border-gray-300 rounded-md p-2"
            placeholder="Search for restaurants..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-md m-2"
            onClick={() => {
              // Filter the listOfRestaurants based on the search text entered in the input box
              const filteredList = listOfRestaurants.filter((res) =>
                res?.info?.name
                  .toLowerCase()
                  .includes(searchText.toLowerCase()),
              );
              setFilteredRestaurants(filteredList);
            }}
          >
            Search
          </button>
        </div>

        <div className="search m-4 p-4">
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-md m-2"
            onClick={() => {
              const filteredList = listOfRestaurants?.filter(
                (res) => res?.info?.avgRating > 4.2,
              );
              setFilteredRestaurants(filteredList);
            }}
          >
            Top Rated listOfRestaurants
          </button>
        </div>

        <div className="user-name m-4 p-4">
          <label className="font-bold text-lg m-4 p-4">User Name:</label>
          <input
            type="text"
            className="border border-gray-300 rounded-md p-2"
            placeholder="Enter your name"
            value={loggedInUser}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
      </div>

      <div className="res-container flex flex-wrap">
        {filteredRestaurants?.map((restaurant) => (
          <Link
            to={`/restaurant/${restaurant?.info?.id}`}
            key={restaurant?.info?.id}
          >
            <RestaurantCard resData={restaurant?.info} />
          </Link>
        ))}
      </div>
    </div>
  );
};
export default Body;
