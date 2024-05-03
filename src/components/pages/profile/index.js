import React, { useEffect, useState } from "react";
import {
  getProfile,
  updateProfile,
  getRelativesProfile,
} from "@/services/profile";
import { useLocation } from "react-router-dom";
import { Button, Input, Avatar, DatePicker, Radio } from "antd";
import { getGroupByUserId } from "@/services/group";
import dayjs from "dayjs";

function Profile() {
  let { state } = useLocation();
  const format = "YYYY/MM/DD";
  const [profile, setProfile] = useState([{}]);
  const [group, setGroup] = useState({});
  const [options, setOptions] = useState(1);
  const fetchProfile = async (id) => {
    const group = await getGroupByUserId(id);
    setGroup(group.data.Group);
    if (options === 1) {
      const res = await getProfile(id);
      setProfile(res.data);
    }
    if (options === 2) {
      const res = await getRelativesProfile(id);
      setProfile(res.data);
    }
  };
  useEffect(() => {
    fetchProfile(state.id);
  }, [state.id, options]);
  const onChange = (date, dateString) => {
    setProfile({ ...profile, dateOfBirth: dateString });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };
  const onSubmit = async () => {
    console.log(profile);
    const res = await updateProfile(profile);
    if (res.code === 0) {
      console.log(res.message);
    }
  };
  console.log(profile);
  return (
    <div className="flex flex-col space-y-3">
      <div className="mt-3 space-x-2">
        <Radio.Group value={options}>
          <Radio.Button value={1} onClick={() => setOptions(1)}>
            thông tin cá nhân
          </Radio.Button>
          {group.name === "student" && (
            <Radio.Button value={2} onClick={() => setOptions(2)}>
              thông tin phụ huynh
            </Radio.Button>
          )}
          {group.name === "parent" && (
            <Radio.Button value={2} onClick={() => setOptions(2)}>
              thông tin học sinh
            </Radio.Button>
          )}
        </Radio.Group>
      </div>
      {profile.map((profile, index) => (
        <div className="border rounded-sm border-gray-400" key={index}>
          <Avatar
            shape="square"
            size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
            src={profile?.avt}
            className="border rounded-sm border-gray-400"
          />
          <div>
            <Input
              value={profile?.firstName}
              name="firstName"
              onChange={handleChange}
              placeholder="Thêm họ"
            ></Input>
            <Input
              value={profile?.lastName}
              name="lastName"
              onChange={handleChange}
              placeholder="Thêm tên"
            ></Input>
            <Input
              value={profile?.email}
              name="email"
              onChange={handleChange}
              placeholder="Thêm email"
            ></Input>
            <Input
              value={profile?.phoneNumber}
              name="phoneNumber"
              onChange={handleChange}
              placeholder="Thêm số điện thoại"
            ></Input>
            <Input
              value={profile?.address}
              name="address"
              onChange={handleChange}
              placeholder="Thêm địa chỉ"
            ></Input>
            <Input
              value={profile?.CCCD}
              name="CCCD"
              onChange={handleChange}
              placeholder="Thêm CCCD"
            ></Input>
            {!profile?.dateOfBirth && (
              <DatePicker format="DD-MM-YYYY" onChange={onChange} />
            )}
            {profile?.dateOfBirth && (
              <DatePicker
                defaultValue={dayjs(profile.dateOfBirth, format)}
                format={format}
                onChange={onChange}
              />
            )}
          </div>
          <div className="text-center">
            <Button type="primary" onClick={onSubmit}>
              Save
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Profile;
