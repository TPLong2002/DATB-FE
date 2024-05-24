import { Fragment, useEffect } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "@/img/logo.png";
import { Logout } from "@/services/auth/signout";
import { useSelector, useDispatch } from "react-redux";
import { logout, accountUser } from "@/slice/authSlice";
import { Button } from "antd";
import Marquee from "react-fast-marquee";

const navigation = [
  {
    name: "Người dùng",
    link: "/user",
    imgIcon: "https://cdn-icons-png.flaticon.com/512/1144/1144760.png",
  },
  {
    name: "Lớp học",
    link: "/class",
    imgIcon: "https://cdn-icons-png.flaticon.com/512/45/45962.png",
  },
  {
    name: "Môn Học",
    link: "/subject",
    imgIcon: "https://static.thenounproject.com/png/3858302-200.png",
  },
  {
    name: "Khoảng phí",
    link: "/fee",
    imgIcon:
      "https://cdn3.iconfinder.com/data/icons/fees-payment/741/service_fees_plan_charge-512.png",
  },
  {
    name: "Điểm",
    link: "/mark",
    imgIcon: "https://cdn-icons-png.flaticon.com/512/2343/2343465.png",
  },
  {
    name: "Bài tập",
    link: "/assignment",
    imgIcon: "https://cdn-icons-png.flaticon.com/512/3775/3775707.png",
  },
  {
    name: "Vai trò",
    link: "/role",
    imgIcon: "https://static.thenounproject.com/png/281793-200.png",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
function mapPath(path) {
  if (path.startsWith("/subject/")) {
    return "/subject";
  }
  if (path.startsWith("/user/")) {
    return "/user";
  }
  if (path.startsWith("/class")) {
    return "/class";
  }
  if (path.startsWith("/assignment/")) {
    return "/assignment";
  }
  return path;
}
export default function Example() {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(accountUser()).then((res) => {
      localStorage.setItem("isAuth", res.payload.isAuth);
    });
  }, []);
  const dispatch = useDispatch();
  let location = useLocation();
  const handleLogout = async () => {
    const res = await Logout();
    if (res.code === 0) {
      dispatch(logout());
      localStorage.removeItem("token");
      localStorage.setItem("isAuth", false);
      localStorage.setItem("prePath", location.pathname);
      window.location.href = "/login";
    }
  };
  return (
    <Disclosure as="nav" className="bg-blue-500">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-10 w-auto bg-white p-1 rounded-full"
                    src={logo}
                    alt="Your Company"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {auth.isAuth ? (
                      navigation.map((item) => (
                        <Link
                          key={item.name}
                          to={item.link}
                          className={classNames(
                            item.link === mapPath(location.pathname)
                              ? "bg-blue-900 text-white"
                              : "text-white hover:bg-blue-700 hover:text-white",
                            "rounded-md px-3 py-2 text-sm font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          <div className="flex text-center items-center">
                            <img
                              src={item.imgIcon}
                              className="w-6 h-6 mr-2 filter invert brightness-0"
                            ></img>
                            {item.name}
                          </div>
                        </Link>
                      ))
                    ) : (
                      <Marquee></Marquee>
                    )}
                  </div>
                </div>
              </div>
              {auth.isAuth ? (
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <button
                    type="button"
                    className="relative rounded-full bg-blue-800 p-1 text-blue-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to={`/user/profile/${auth.id}`}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Your Profile
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Settings
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                              onClick={handleLogout}
                            >
                              Sign out
                            </a>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              ) : (
                <div>
                  <Button
                    className="shadow-md"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </Button>
                </div>
              )}
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
