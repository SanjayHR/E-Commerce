import RestaurantCard from "./RestaurantCard.js";
import { resList } from "../utils/mockData.js";
import { useState } from "react";
import { useEffect } from "react";
import Shimmer from "./Shimmer.js";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus.js";

const Body = () => {
  // useState hook to create a state variable listOfRestaurants and a function setlistOfRestaurants to update it. The initial value is the local mock data.
  const [listOfRestaurants, setlistOfRestaurants] = useState(resList);
  const [filteredRestaurants, setFilteredRestaurants] = useState(resList);

  const [searchText, setSearchText] = useState("");

  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch data from the Swiggy API using the fetch function
      const data = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING",
      );

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
              const filteredList = listOfRestaurants.filter(
                (res) => res?.info?.avgRating > 4.2,
              );
              setFilteredRestaurants(filteredList);
            }}
          >
            Top Rated listOfRestaurants
          </button>
        </div>
      </div>
      <div className="res-container flex flex-wrap">
        {filteredRestaurants.map((restaurant) => (
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
