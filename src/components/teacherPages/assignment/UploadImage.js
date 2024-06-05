// AvatarUpload.js
import React, { useEffect, useState } from "react";

const AvatarUpload = (props) => {
  const { assignment, setAssignment } = props;
  const [img, setImg] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImg(reader.result);

      setAssignment({ ...assignment, image: file });
    };
    reader.readAsDataURL(file);
  };
  return (
    <div className="bg-gray-100 flex items-center w-4/5 h-full min-h-32">
      <div className=" bg-gray rounded-lg shadow-md w-full h-full min-h-32">
        <div className="relative h-full min-h-32 overflow-hidden rounded-sm border border-gray-200">
          <img src={img} className="object-cover w-full h-auto" alt="Avatar" />
          <label
            htmlFor="avatarInput"
            className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black bg-opacity-50 text-white opacity-0 hover:opacity-100 transition-opacity duration-300"
          >
            <span className="text-center">Upload</span>
            <input
              type="file"
              id="avatarInput"
              className="absolute inset-0 w-48 h-32 opacity-0 cursor-pointer"
              onChange={handleImageChange}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default AvatarUpload;
