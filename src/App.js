// const heading = React.createElement('h1', { id: 'heading' }, 'Hello, World First!');
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(heading);

import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header.js";
import Body from "./components/Body.js";

const AppLayout = () => {
  return (
    <div className="app">
      <Header />
      <Body />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppLayout />);

export default AppLayout;
