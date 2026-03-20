import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

function Sidebar() {
  const [open, setopen] = useState(false);
  return (
    <div style={{}} className=" flex flex-col">
      <button onClick={() => setopen(!open)}>
        {open ? <FaTimes /> : <FaBars />}
        {/* {open ? "close   " :"open "} */}
      </button>

      {open && (
        <div
          style={{}}
          className="bg-gray-400 w-50 min-h-screen p-5 text-black"
        >
          <h3 className=" mb-10 mt-0 text-lg font-bold p-5">Admin</h3>

          <div className="flex flex-col gap-2">
            <Link
              to="/"
              className=" px-3   p-5  rounded transition   text-white hover:bg-gray-700"
            >
              Products
            </Link>
            <Link
              to="/add"
              className="px-3  py-2 rounded transition text-white hover:bg-gray-700"
            >
              Add Product
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
