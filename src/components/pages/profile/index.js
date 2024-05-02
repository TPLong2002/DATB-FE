import React, { useEffect, useState } from "react";
import { getProfile } from "@/services/profile";
import { useLocation } from "react-router-dom";
import { Button, Input, Avatar, DatePicker } from "antd";
import { getGroupByUserId } from "@/services/group";
import { format } from "date-fns";
import dayjs from "dayjs";

function Profile() {
  let { state } = useLocation();
  const format = "YYYY/MM/DD";
  const [profile, setProfile] = useState({});
  const [group, setGroup] = useState({});
  const fetchProfile = async (id) => {
    const res = await getProfile(id);
    const group = await getGroupByUserId(id);
    setProfile(res.data);
    setGroup(group.data.Group);
  };
  useEffect(() => {
    fetchProfile(state.id);
  }, []);
  console.log(profile);
  return (
    <div className="flex flex-col space-y-3">
      <div className="mt-3 space-x-2">
        <Button>thông tin cá nhân</Button>
        {group.name === "student" && <Button>thông tin phụ huynh</Button>}
        {group.name === "parent" && <Button>thông tin học sinh</Button>}
      </div>
      <div className="border rounded-sm border-gray-400">
        <Avatar
          shape="square"
          size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
          src={profile.avt}
        />
        <div>
          <Input value={profile?.firstName}></Input>
          <Input value={profile?.lastName}></Input>
          <Input value={profile?.email}></Input>
          <Input value={profile?.phoneNumber}></Input>
          <Input value={profile?.address}></Input>
          <Input value={profile?.CCCD}></Input>
          {!profile?.dateOfBirth && <DatePicker format="DD-MM-YYYY" />}
          {profile?.dateOfBirth && (
            <DatePicker
              defaultValue={dayjs(profile.dateOfBirth, format)}
              format={format}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
