import React from "react";
import { IoSearchSharp } from "react-icons/io5";

const SearchInut = () => {
  return (
    <form className="flex items-center space-x-2">
      <input
        type="text"
        placeholder="Search..."
        className="input input-border rounded-full focus:outline-none focus:ring-0"
      />
      <button type="submit" className="btn btn-circle bg-sky-500 text-white">
        <IoSearchSharp className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
};

export default SearchInut;
