import React, { useState } from "react";
import { toast } from "react-toastify";

import { Link, useNavigate } from "react-router-dom";
import Logo from "@/img/logo.png";
import { forgotPassword } from "@/services/auth/forgotPassword";

function Login() {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  const [valid, setValid] = useState({ email: true });
  const validateEmail = (email) => {
    if (email.length >= 10) {
      const checkEmail = /\S+@\S+\.\S+/.test(email);
      if (checkEmail) {
        setValid({ ...valid, email: true });
        return true;
      }
      toast.error("Email không hợp lệ");
      return false;
    } else {
      toast.error("Email quá ngắn");
      setValid({ ...valid, email: false });
      return false;
    }
  };

  const handleSubmit = async () => {
    let check = true;
    if (!email) {
      check = false;
      setValid({ ...valid, email: false });
      return toast.error("Vui lòng nhập email");
    }

    if (!validateEmail(email)) {
      check = false;
    }

    if (check) {
      const res = await forgotPassword(email);
      if (res && res.code === 0) {
        toast.success(res.message);
        navigate("/login");
      } else {
        toast.error(res.message);
      }
    }
  };
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto h-24 w-auto" src={Logo} alt="Your Company" />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Lấy lại mật khẩu
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email
            </label>
            <div className="mt-2">
              <input
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={` w-full rounded-md px-2 border  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                  !valid.email ? "border-red-500" : ""
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
              Gửi
            </button>
          </div>
        </div>

        <p className="mt-10 text-center text-sm text-gray-500">
          <Link
            to="/"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Quay về trang chủ
          </Link>
        </p>
      </div>
    </div>
  );
}
export default Login;
