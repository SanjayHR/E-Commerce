import { CDN_URL } from "../utils/constants.js";

const RestaurantCard = (props) => {
  const { resData } = props;
  console.log(resData);
  const { cloudinaryImageId, name, cuisines, avgRating, areaName } = resData;

  return (
    <div className="m-4 p-4 w-[200px] rounded-lg transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg bg-gray-100 hover:shadow-gray-500/50">
      <img className="rounded-lg" src={CDN_URL + cloudinaryImageId} />
      <h3 className="font-bold text-xl py-2">{name}</h3>
      <h4 className="py-1">{cuisines.join(", ")}</h4>
      <h4 className="py-1">⭐ {avgRating}</h4>
      <h4 className="py-1">{areaName}</h4>
    </div>
  );
};

export default RestaurantCard;
