import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/slice/authSlice";
import { CP } from "@/services/auth/changePassword";
import { Button } from "antd";
import Logo from "@/img/logo.png";

function Register() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();
  const [info, setInfo] = useState({
    username: "",
    oldPassword: "",
    password: "",
    cPassword: "",
  });
  useEffect(() => {
    if (auth.username) {
      setInfo({ ...info, username: auth.username });
    }
  }, [auth]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  };

  const confirmPassword = (password, cPassword) => {
    return password === cPassword;
  };
  const validatePassword = (password, cPassword) => {
    if (confirmPassword(password, cPassword)) {
      if (password.length >= 3) {
        return true;
      } else {
        toast.error("password is too short");
      }
    } else {
      toast.error("password is not same");
    }
    return false;
  };

  const handleSubmit = async () => {
    let check = true;

    if (!validatePassword(info.password, info.cPassword)) {
      check = false;
    }
    if (check) {
      try {
        const res = await CP(info);
        console.log(res);
        if (+res?.code === 0) {
          toast.success(res?.message);
          localStorage.removeItem("token");
          localStorage.setItem("isAuth", false);
          localStorage.setItem("prePath", location.pathname);
          localStorage.setItem("username", "");
          localStorage.setItem("group_id", "");
          localStorage.setItem("role", "");
          dispatch(logout());
        } else {
          toast.error(res?.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto h-24 w-auto" src={Logo} alt="Your Company" />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Đổi mật khẩu của bạn
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div>
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Tên đăng nhập
            </label>
          </div>
          <div className="mt-2">
            <input
              name="username"
              value={info.username}
              onChange={handleChange}
              className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Mật khẩu hiện tại
            </label>
          </div>
          <div className="mt-2">
            <input
              name="oldPassword"
              value={info.oldPassword}
              onChange={handleChange}
              className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Mật khẩu mới
            </label>
          </div>
          <div className="mt-2">
            <input
              name="password"
              value={info.password}
              onChange={handleChange}
              className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Xác nhận mật khẩu mới
            </label>
          </div>
          <div className="mt-2">
            <input
              name="cPassword"
              value={info.cPassword}
              onChange={handleChange}
              className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <p className="mt-10 text-center text-sm text-gray-500">
          <Button onClick={() => navigate(-1)}>Quay trở lại</Button>
        </p>
        <div className="">
          <button
            onClick={() => handleSubmit()}
            className="flex w-full justify-center mt-2 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
