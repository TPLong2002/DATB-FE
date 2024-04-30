import React, { useEffect } from "react";
import { getProfile } from "@/services/profile";
import { useLocation } from "react-router-dom";

function Profile() {
  let { state } = useLocation();
  const fetchProfile = async (id) => {
    const res = await getProfile(id);
    console.log(res);
  };
  useEffect(() => {
    fetchProfile(state.id);
  }, []);
  return <div>profile</div>;
}

export default Profile;
