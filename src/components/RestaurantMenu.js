import { useState, useEffect } from "react";
import Shimmer from "./Shimmer.js";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu.js";

const RestaurantMenu = () => {
  const { resId } = useParams();

  const resInfo = useRestaurantMenu(resId);
  
  if (resInfo === null) {
    return <Shimmer />;
  }

  const restaurant = resInfo?.cards?.[0]?.card?.card?.info;

  if (!restaurant) {
    return <div>Restaurant info not available</div>;
  }

  const { name, cuisines, costForTwoMessage } = restaurant;

  return (
    <div className="restaurant-menu">
      <h1>{name}</h1>
      <p>
        {(cuisines || ["Menu unavailable"]).join(", ")} -{" "}
        {costForTwoMessage || restaurant.costForTwo || "Price unavailable"}
      </p>
    </div>
  );
};

export default RestaurantMenu;
