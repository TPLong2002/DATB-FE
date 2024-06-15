import React, { useState } from "react";
import { toast } from "react-toastify";
import Log from "@/services/auth/login";
import { useDispatch } from "react-redux";
import { login } from "@/slice/authSlice";
import { Link, useNavigate } from "react-router-dom";
import Logo from "@/img/logo.png";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("123Admin");
  const [valid, setValid] = useState({ username: true, password: true });
  const dispatch = useDispatch();
  // const validateValueLogin = (valueLogin) => {
  //   if (valueLogin.length >= 10) {
  //     const checkPhone = /^\d+$/.test(valueLogin);
  //     if (checkPhone) {
  //       return true;
  //     }
  //     const checkEmail = /\S+@\S+\.\S+/.test(valueLogin);
  //     if (checkEmail) {
  //       return true;
  //     }
  //     return false;
  //   } else {
  //     toast.error("value login is short");
  //     setValid({ ...valid, valueLogin: false });
  //     return false;
  //   }
  // };

  const handleSubmit = async () => {
    let check = true;
    if (!username) {
      check = false;
      setValid({ ...valid, username: false });
      toast.error("Please enter your username");
    }
    if (!password) {
      check = false;
      setValid({ ...valid, username: false });
      toast.error("Please enter your password");
    }
    // if (!validateValueLogin(valueLogin)) {
    //   check = false;
    // }
    if (check) {
      // api
      const res = await Log(username, password);

      if (res && +res.code === 0) {
        localStorage.setItem("token", `${res.data.access_token}`);
        toast.success(res.message);
        console.log(res.data);
        localStorage.setItem("isAuth", true);
        localStorage.setItem("username", res.data.name);
        localStorage.setItem("group_id", res.data.group_id);
        localStorage.setItem("role", res.data.role);
        dispatch(login({ ...res.data, isAuth: true }));
      }
      if (res && +res.code !== 0) {
        toast.error(res.message);
      }
    }
  };
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto h-24 w-auto" src={Logo} alt="Your Company" />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Tên tài khoảng
            </label>
            <div className="mt-2">
              <input
                name="username"
                type="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className={` w-full rounded-md px-2 border  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                  !valid.username ? "border-red-500" : ""
                }`}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="text-sm">
                <Link
                  to="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
            <div className="mt-2">
              <input
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={` w-full rounded-md px-2 border  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                  !valid.password ? "border-red-500" : ""
                }`}
              />
            </div>
          </div>

          <div className="mt-4">
            <button
              type="submit"
              onClick={handleSubmit}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </div>

        <p className="mt-10 text-center text-sm text-gray-500">
          <Link
            to="/"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Back to home
          </Link>
        </p>
      </div>
    </div>
  );
}
export default Login;
