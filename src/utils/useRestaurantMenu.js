import { useState, useEffect } from "react";
import { MENU_API_URL } from "../utils/constants.js";

const useRestaurantMenu = (restaurantId) => {
  const [restaurantInfo, setRestaurantInfo] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // const data = await fetch(MENU_API_URL + restaurantId);
    // const json = await data.json();
    // setRestaurantInfo(json?.data?.cards?.[0]?.card?.card?.info);

    const data = await fetch(MENU_API_URL + restaurantId);
    if (data.ok && data.status === 200) {
      const json = await data.json();
      setRestaurantInfo(json?.data?.cards?.[0]?.card?.card?.info);
    } else {
      console.error("Failed to fetch menu: ", data.status);
    }
  };
  return restaurantInfo;
};

export default useRestaurantMenu;
