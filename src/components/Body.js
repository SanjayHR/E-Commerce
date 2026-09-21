import RestaurantCard from "./RestaurantCard.js";
import { resList } from "../utils/mockData.js";
import { useState } from "react";
import { useEffect } from "react";
import Shimmer from "./Shimmer.js";

const Body = () => {
  // useState hook to create a state variable listOfRestaurants and a function setlistOfRestaurants to update it. The initial value is an empty array.
  const [listOfRestaurants, setlistOfRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  const [searchText, setSearchText] = useState("");

  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // Fetch data from the Swiggy API using the fetch function
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING",
    );

    // Convert the response to JSON format
    const json = await data.json();

    // Optional Chaining - ?. is used to avoid errors if any property in the chain is undefined or null
    setlistOfRestaurants(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants,
    );
    setFilteredRestaurants(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants,
    );
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
          <RestaurantCard
            key={restaurant?.info?.id}
            resData={restaurant?.info}
          />
        ))}
      </div>
    </div>
  );
};
export default Body;