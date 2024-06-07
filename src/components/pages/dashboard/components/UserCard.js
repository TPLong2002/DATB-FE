import React from "react";

const UserCard = ({ userCount, bg, typeUser, icon, h = 32 }) => {
  return (
    <div
      className={`flex items-center justify-between h-${h} bg-white border rounded-lg shadow-md`}
    >
      <div className={`w-1/3 h-full flex items-center justify-center ${bg}`}>
        {icon}
      </div>
      <div className="flex flex-col justify-center w-2/3 px-4">
        <span className="text-3xl font-semibold text-gray-900">
          {userCount}
        </span>
        <div className="text-gray-600 text-lg">{typeUser}</div>
      </div>
    </div>
  );
};

export default UserCard;
