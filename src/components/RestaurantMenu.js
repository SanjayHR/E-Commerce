import { useState, useEffect } from "react";
import Shimmer from "./Shimmer.js";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu.js";
import { IMAGE_URL } from "../utils/constants.js";

const RestaurantMenu = () => {
  const { resId } = useParams();

  const resInfo = useRestaurantMenu(resId);

  if (resInfo === null) {
    return <Shimmer />;
  }

  // const restaurant = resInfo
  //   .map((item) => item?.info)
  //   .find((info) => info?.id === resId);

  // if (!restaurant) {
  //   return <div>Restaurant info not available</div>;
  // }

  // const { name, cuisines, costForTwoMessage } = restaurant;

  return (
    <div className="restaurant-menu m-auto p-4 w-[600px] rounded-lg bg-gray-100 ">
      {resInfo.map((menuItems) => {
        const { id, name, costForTwo, cloudinaryImageId } = menuItems?.info;
        return (
          <div
            key={id}
            className="res-card border-collapse  border-gray-300 rounded-md p-4 m-4 items-center"
          >
            <img className="rounded-lg w-24 h-24" src={IMAGE_URL + cloudinaryImageId} />
            <h3>{name}</h3>
            <p>{costForTwo}</p>
          </div>
        );
      })}
      <h1>{name}</h1>
    </div>
  );
};

export default RestaurantMenu;
