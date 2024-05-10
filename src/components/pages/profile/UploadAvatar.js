// AvatarUpload.js
import React, { useEffect, useState } from "react";

const AvatarUpload = (props) => {
  const { profiles, setProfiles, index } = props;
  const [img, setImg] = useState("");
  useEffect(() => {
    setImg(profiles[index].avt);
  }, [profiles[index].id]);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImg(reader.result);
      const newProfile = [...profiles];
      newProfile[index] = { ...newProfile[index], avt: file };
      setProfiles(newProfile);
    };
    reader.readAsDataURL(file);
  };
  return (
    <div className="bg-gray-100 flex items-center justify-center h-32 w-32">
      <div className="max-w-sm bg-gray rounded-lg shadow-md">
        <div className="relative w-32 h-32 overflow-hidden mx-auto rounded-sm border border-gray-200">
          <img src={img} className="object-cover w-32 h-32" alt="Avatar" />
          <label
            htmlFor="avatarInput"
            className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black bg-opacity-50 text-white opacity-0 hover:opacity-100 transition-opacity duration-300"
          >
            <span className="text-center">Upload</span>
            <input
              type="file"
              id="avatarInput"
              className="absolute inset-0 w-32 h-32 opacity-0 cursor-pointer"
              onChange={handleImageChange}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default AvatarUpload;
