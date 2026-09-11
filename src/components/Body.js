import RestaurantCard from "./RestaurantCard.js";
import { resList } from "../utils/mockData.js";
import { useState } from "react";

const Body = () => {
  // local state variable - restaurants

  const [restaurants, setRestaurants] = useState(resList);

  return (
    <div className="body">
      <div className="filter">
        <button
          className="filter-btn"
          onClick={() => {
            const filteredList = restaurants.filter(
              (res) => res?.card?.card?.info?.avgRating > 4.2,
            );
            setRestaurants(filteredList);
          }}
        >
          Top Rated Restaurants
        </button>
      </div>
      <div className="res-container">
        {restaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant.card.card.info.id}
            resData={restaurant}
          />
        ))}
      </div>
    </div>
  );
};
export default Body;
