import React from "react";
import { Link } from "react-router-dom";

function UserDashBoardMenu() {
  return (
    <div>
      <div className="w-full text-2xl mt-4 font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        <Link to={"/dashboard/user/profile"} className="w-full px-4 py-2 border-gray-200 rounded-t-lg dark:border-gray-600 ">
          Profile
        </Link>
        <Link to="/dashboard/user/order" className="w-full px-4 py-2  border-gray-200 dark:border-gray-600">
          Order
        </Link>
      
      </div>
    </div>
  );
}

export default UserDashBoardMenu;
