import React, { useEffect, useState } from "react";
import {
  getProfile,
  updateProfile,
  getRelativesProfile,
} from "@/services/profile";
import { useLocation } from "react-router-dom";
import { Button, Input, DatePicker, Radio } from "antd";
import { getGroupByUserId } from "@/services/group";
import dayjs from "dayjs";
import UploadAvatar from "@/components/pages/profile/UploadAvatar";

function Profile() {
  let { state } = useLocation();
  const format = "YYYY/MM/DD";
  const [profiles, setProfiles] = useState([{}]);
  const [group, setGroup] = useState({});
  const [options, setOptions] = useState(1);

  const [originalImg, setOriginalImg] = useState([]);
  const cloud_name = "depfh6rnw";
  const preset_key = "rsnt801s";

  const fetchProfile = async (id) => {
    const group = await getGroupByUserId(id);
    setGroup(group.data.Group);
    if (options === 1) {
      const res = await getProfile(id);
      setProfiles(res.data);

      setOriginalImg(
        res.data.map((row) => ({ avt: row.avt, id: res.data.id }))
      );
    }
    if (options === 2) {
      const res = await getRelativesProfile(id);
      setProfiles(res.data);

      setOriginalImg(
        res.data.map((row) => ({ avt: row.avt, id: res.data.id }))
      );
    }
  };
  useEffect(() => {
    fetchProfile(state.id);
  }, [state.id, options]);
  const onChange = (date, dateString, index) => {
    const newProfile = [...profiles];
    newProfile[index] = { ...newProfile[index], dateOfBirth: dateString };
    setProfiles(newProfile);
  };
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const newProfile = [...profiles];
    newProfile[index] = { ...newProfile[index], [name]: value };
    setProfiles(newProfile);
  };

  const onSubmit = async (index) => {
    const newProfile = [...profiles];
    if (profiles[index].avt && profiles[index].avt != originalImg[index]) {
      console.log(1);
      const formData = new FormData();
      console.log(profiles[index].avt);
      formData.append("file", profiles[index].avt);
      formData.append("upload_preset", preset_key);
      try {
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await res.json();
        console.log(data);
        if (data?.secure_url) {
          newProfile[index] = { ...newProfile[index], avt: data.secure_url };
          const res = await updateProfile(newProfile[index]);
          if (res.code === 0) {
            console.log(res.message);
          }
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      const res = await updateProfile(newProfile[index]);
      if (res.code === 0) {
        console.log(res.message);
      }
    }
  };
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
      {profiles.map((profile, index) => (
        <div className="border rounded-sm border-gray-400" key={index}>
          {/* <Avatar
            shape="square"
            size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
            src={profile?.avt}
            className="border rounded-sm border-gray-400"
          /> */}
          {profile && (
            <UploadAvatar
              profiles={profiles}
              setProfiles={setProfiles}
              index={index}
            />
          )}

          <div>
            <Input
              value={profile?.firstName}
              name="firstName"
              onChange={(e) => handleChange(e, index)}
              placeholder="Thêm họ"
            ></Input>
            <Input
              value={profile?.lastName}
              name="lastName"
              onChange={(e) => handleChange(e, index)}
              placeholder="Thêm tên"
            ></Input>
            <Input
              value={profile?.email}
              name="email"
              readOnly
              onChange={(e) => handleChange(e, index)}
              placeholder="Thêm email"
            ></Input>
            <Input
              value={profile?.phoneNumber}
              name="phoneNumber"
              onChange={(e) => handleChange(e, index)}
              placeholder="Thêm số điện thoại"
            ></Input>
            <Input
              value={profile?.address}
              name="address"
              onChange={(e) => handleChange(e, index)}
              placeholder="Thêm địa chỉ"
            ></Input>
            <Input
              value={profile?.CCCD}
              name="CCCD"
              onChange={handleChange}
              placeholder="Thêm CCCD"
            ></Input>
            {!profile?.dateOfBirth && (
              <DatePicker
                format={format}
                onChange={(date, dateString) =>
                  onChange(date, dateString, index)
                }
              />
            )}
            {profile?.dateOfBirth && (
              <DatePicker
                defaultValue={dayjs(profile.dateOfBirth)}
                format={format}
                onChange={(date, dateString) =>
                  onChange(date, dateString, index)
                }
              />
            )}
          </div>
          <div className="text-center">
            <Button type="primary" onClick={() => onSubmit(index)}>
              Save
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Profile;
