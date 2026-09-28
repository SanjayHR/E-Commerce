import { useState, useEffect } from "react";
import Shimmer from "./Shimmer.js";
import { useParams } from "react-router-dom";
import { MENU_API_URL } from "../utils/constants.js";
import { resList } from "../utils/mockData.js";

const RestaurantMenu = () => {
  const [resInfo, setResInfo] = useState(null);

  const { resId } = useParams();
  console.log("Restaurant ID from URL:", resId);

  useEffect(() => {
    fetchMenuData();
  }, [resId]);

  const fetchMenuData = async () => {
    let restaurant;

    try {
      const response = await fetch(`${MENU_API_URL}${resId}`);

      if (!response.ok) {
        throw new Error(`Menu request failed with status ${response.status}`);
      }

      const json = await response.json();
      restaurant = json?.data?.cards?.[0]?.card?.card?.info;
    } catch (error) {
      console.warn("Menu API unavailable; using local restaurant data.", error);
    }

    restaurant ??= resList.find(
      (item) => String(item.info.id) === String(resId),
    )?.info;
    restaurant ??= resList[0]?.info;

    if (restaurant) {
      setResInfo({ cards: [{ card: { card: { info: restaurant } } }] });
    } else {
      setResInfo({ cards: [] });
    }
  };

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
