import { LOGO_URL } from "../utils/constants";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus.js";

const Header = () => {
  // state variable are to be in top level of the component and not inside any conditional statements or loops. This is because React relies on the order of hooks to determine which state variable corresponds to which hook call. If you put a useState call inside a conditional statement or loop, it can cause unexpected behavior and bugs in your application. By keeping state variables at the top level of the component, you ensure that they are always initialized in the same order and that their values are preserved across re-renders.

  const [btnName, setBtnName] = useState("Login");

  // Never use useState inside a conditional statement or loop. It should always be called at the top level of the component to ensure that the state is properly initialized and maintained across re-renders. If you need to conditionally render different components based on state, you can do that in the return statement or by using conditional rendering techniques.
  // useEffect hook to log a message whenever the btnName state variable changes
  // When the btnName state variable changes, the useEffect hook will be triggered and the message "useEffect called" will be logged to the console.
  // The second argument [btnName] is a dependency array that tells React to only run the effect when btnName changes. If btnName doesn't change, the effect won't run again.
  // This is useful for optimizing performance and avoiding unnecessary re-renders.

  useEffect(() => {
    console.log("useEffect called");
  }, [btnName]);

  const onlineStatus = useOnlineStatus();

  return (
    <div className="flex justify-between bg-pink-50 shadow-lg sm:bg-yellow-50 md:bg-green-50 lg:bg-blue-50">
      <div className="flex items-center">
        <img className="w-56" src={LOGO_URL} />
      </div>
      <div className="flex items-center">
        <ul className="flex p-4 m-4">
          <li className="px-4">
            Online Status: {onlineStatus ? "✅" : "🔴"}
          </li>
          <li className="px-4">
            <Link to="/">Home</Link>
          </li>
          <li className="px-4">
            <Link to="/about">About</Link>
          </li>
          <li className="px-4">
            <Link to="/contact">Contact Us</Link>
          </li>
          <li className="px-4">
            <Link to="/grocery">Grocery</Link> 
          </li>
          <li className="px-4">
            <Link to="/cart">Cart</Link>
          </li>
          <button
            className="login-btn"
            onClick={() =>
              btnName === "Login" ? setBtnName("Logout") : setBtnName("Login")
            }
          >
            {btnName}
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Header;
