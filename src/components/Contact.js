import React from "react";

const Contact = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-center m-2 p-4">
        This is Contact Us Page
      </h1>
      <form className="flex flex-col items-center justify-center m-2 p-4">
        <input
          type="text"
          placeholder="Name"
          className="border border-gray-300 rounded-md py-2 px-4 m-2 w-96 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          placeholder="Email"
          className="border border-gray-300 rounded-md py-2 px-4 m-2 w-96 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          placeholder="Message"
          className="border border-gray-300 rounded-md py-2 px-4 m-2 w-96 focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md w-96 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Contact;
