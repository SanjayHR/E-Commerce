import { useState, useEffect } from "react";
import { MENU_API_URL } from "../utils/constants.js";

const useRestaurantMenu = (restaurantId) => {
  const [restaurantInfo, setRestaurantInfo] = useState(null);

  useEffect(() => {
    fetchData();
  });

  const fetchData = async () => {
    // const data = await fetch(MENU_API_URL + restaurantId);
    // const json = await data.json();
    // setRestaurantInfo(json?.data?.cards?.[0]?.card?.card?.info);

    // const data = await fetch(MENU_API_URL + restaurantId);
    // if (data.ok && data.status === 200) {
    //   const json = await data.json();
    //   setRestaurantInfo(json?.data?.cards?.[0]?.card?.card?.info);
    // } else {
    //   console.error("Failed to fetch menu: ", data.status);
    // }

    try {
      // const originalUrl = "MENU_API_URL" + restaurantId;
        
      //   // 2. Prepended with a public CORS proxy to bypass browser blocks
      //   const proxyUrl = `https://proxy.corsfix.com/?${originalUrl}`;

        const response = await fetch("https://pastebin.com/raw/0QcdEDBL");

        if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        // 3. Await the conversion from the data stream into an object
        const jsonData = await response.json();
        
        setRestaurantInfo(jsonData?.data?.cards?.[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
      } catch (err) {
        console.error("Failed to fetch menu: ", err.message);
      }
  };
  return restaurantInfo;
};

export default useRestaurantMenu;
