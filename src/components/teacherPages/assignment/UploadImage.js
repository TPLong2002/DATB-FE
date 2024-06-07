// AvatarUpload.js
import React, { useEffect, useState } from "react";

const AvatarUpload = (props) => {
  const { assignment, setAssignment } = props;
  const [img, setImg] = useState("");

  useEffect(() => {
    if (assignment.image) {
      setImg(assignment.image);
    }
  }, [assignment]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setImg(reader.result);
        setAssignment((prevAssignment) => ({
          ...prevAssignment,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-gray-100 flex items-center w-11/12 h-full min-h-32">
      <div className="bg-gray rounded-lg shadow-md w-full h-full min-h-32">
        <div className="relative h-full min-h-32 overflow-hidden rounded-sm border border-gray-200">
          {img ? (
            <img
              src={img}
              className="object-cover w-full h-auto"
              alt="Avatar"
            />
          ) : (
            <div className="flex items-center justify-center h-full min-h-32 bg-gray-200 text-gray-500">
              No Image
            </div>
          )}
          <label
            htmlFor="avatarInput"
            className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black bg-opacity-50 text-white opacity-0 hover:opacity-100 transition-opacity duration-300"
          >
            <span className="text-center">Upload</span>
            <input
              type="file"
              id="avatarInput"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleImageChange}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default AvatarUpload;
