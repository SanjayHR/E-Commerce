import RestaurantCard from "./RestaurantCard.js";
import { resList } from "../utils/mockData.js";
import { useState } from "react";
import { useEffect } from "react";
import Shimmer from "./Shimmer.js";
import { Link } from "react-router-dom";

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

  return listOfRestaurants?.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="search">
        <input
          type="text"
          className="search-box"
          placeholder="Search for restaurants..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button
          className="search-btn"
          onClick={() => {
            // Filter the listOfRestaurants based on the search text entered in the input box
            const filteredList = listOfRestaurants.filter((res) =>
              res?.info?.name.toLowerCase().includes(searchText.toLowerCase()),
            );
            setFilteredRestaurants(filteredList);
          }}
        >
          Search
        </button>
      </div>
      <div className="filter">
        <button
          className="filter-btn"
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
      <div className="res-container">
        {filteredRestaurants.map((restaurant) => (
          <Link to={`/restaurant/${restaurant?.info?.id}`} key={restaurant?.info?.id}>
            <RestaurantCard resData={restaurant?.info} />
          </Link>
        ))}
      </div>
    </div>
  );
};
export default Body;