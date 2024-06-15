import { useEffect, useState } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "@/img/logo.png";
import { Logout } from "@/services/auth/signout";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/slice/authSlice";
import { Button, Breadcrumb, Layout, Menu, theme, Image, Dropdown } from "antd";
import {
  UserOutlined,
  BookOutlined,
  TableOutlined,
  TransactionOutlined,
  FileTextOutlined,
  ReadOutlined,
  UserSwitchOutlined,
  LogoutOutlined,
  MenuUnfoldOutlined,
  LoginOutlined,
  RetweetOutlined,
} from "@ant-design/icons";
import { getCategory } from "@/services/news";

import Marquee from "react-fast-marquee";
import Calendar from "@/components/components/public/Calendar";

const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

let items = [
  getItem("Thi kiểm tra", "/news/test", <UserOutlined />),
  getItem("Thời khóa biểu", "/news/tkb", <TableOutlined />),
  getItem("Học phí", "/news/fee", <ReadOutlined />),
  getItem("Sự kiện", "/news/event", <BookOutlined />),
  getItem("Giới thiệu", "/news/introduce", <TransactionOutlined />),
  getItem("Quy chế văn bản", "/news/statute", <FileTextOutlined />),
];

export default function Example({ children }) {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  // useEffect(() => {
  //   const fetchCategory = async () => {
  //     try {
  //       const res = await getCategory();
  //       if (+res.code === 0) {
  //         items = res.data.map((item) => {
  //           return {
  //             ...item,
  //             key: `/news/${item.id}`,
  //             label: item.description,
  //           };
  //         });
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchCategory();
  // }, []);
  const dispatch = useDispatch();
  let location = useLocation();

  const handleLogout = async () => {
    const res = await Logout();
    if (+res.code === 0) {
      localStorage.removeItem("token");
      localStorage.setItem("isAuth", false);
      localStorage.setItem("prePath", location.pathname);
      localStorage.setItem("username", "");
      localStorage.setItem("group_id", "");
      localStorage.setItem("role", "");
      dispatch(logout());
    }
  };
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const getDashboardKey = (role) => {
    if (role === "admin") {
      return { label: "Dashboard", key: "/dashboard" };
    } else if (role === "parent") {
      return { label: "Dashboard", key: "/parent" };
    } else if (role === "student") {
      return { label: "Bài tập", key: "/student/assignment" };
    } else if (role === "teacher") {
      return { label: "Quản lý điểm", key: "/teacher/mark" };
    } else {
      return { label: "Dashboard", key: "/dashboard" };
    }
  };
  const dropdownItems = [
    {
      label: getDashboardKey(auth.role).label,
      key: getDashboardKey(auth.role).key,
      icon: <MenuUnfoldOutlined />,
    },
    {
      label: "Profile",
      key: `/user/profile/${auth.id}`,
      icon: <UserOutlined />,
    },
    {
      label: "Đổi mật khẩu",
      key: "/changepassword",
      icon: <RetweetOutlined />,
    },
    {
      label: "Logout",
      key: "/logout",
      icon: <LogoutOutlined />,
    },
  ];
  const handleMenuClick = (e) => {
    if (e.key === "/logout") {
      handleLogout();
    }
    navigate(e.key);
  };
  const menu = <Menu onClick={handleMenuClick} items={dropdownItems} />;
  const pathSnippets = location.pathname.split("/").filter((i) => i);
  if (pathSnippets.length === 0) {
    pathSnippets.push("");
  }
  const breadcrumbItems = pathSnippets.map((snippet, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    if (snippet === "") {
      return <Breadcrumb.Item key="home">Home</Breadcrumb.Item>;
    }
    return <Breadcrumb.Item key={url}>{snippet}</Breadcrumb.Item>;
  });
  return (
    <Layout style={{ minHeight: "100vh" }} className="min-h-screen">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{
          position: "fixed", // Fix the position of the sidebar
          height: "100vh", // Make sure it covers the full height of the viewport
          overflowY: "auto", // Enable vertical scrolling
          background: "white",
        }}
        className="custom-sider"
      >
        <div className="demo-logo-vertical flex justify-center items-center py-5 ">
          <img
            src={logo}
            className="w-1/2 h-auto hover:cursor-pointer"
            onClick={() => navigate("/")}
          ></img>
        </div>
        <Menu
          theme="light"
          defaultSelectedKeys={[`${location.pathname}`]}
          mode="inline"
          items={items}
          onClick={(e) => navigate(e.key)}
        />
      </Sider>
      <Layout style={{ marginLeft: collapsed ? 80 : 200 }}>
        <Header style={{ padding: 0 }} className="text-white bg-[#002140]">
          <div className="flex justify-between items-center pr-4">
            <Marquee className="flex-1">
              Chào mừng đến với website trường Trường THPT Nguyễn Hiền
            </Marquee>
            <div className="h-9 border"></div>
            {auth.isAuth ? (
              <div className="flex items-end space-x-2 pl-1">
                <div className="flex-col">
                  <div className="text-xs">Welcome</div>
                  <div className="text-xs">{auth.name}</div>
                </div>
                <Dropdown overlay={menu} placement="bottomRight">
                  <Button icon={<UserOutlined />}></Button>
                </Dropdown>
              </div>
            ) : (
              <Button
                className="flex ml-1"
                icon={<LoginOutlined />}
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            )}
          </div>
        </Header>
        <div className=" flex-col flex-grow">
          <div className="flex">
            <Content style={{ margin: "0 16px" }} className="">
              <Breadcrumb style={{ margin: "16px 0" }}>
                {breadcrumbItems}
              </Breadcrumb>
              <div
                style={{
                  padding: 24,
                  minHeight: 360,
                  background: colorBgContainer,
                  borderRadius: borderRadiusLG,
                }}
              >
                {children}
              </div>
            </Content>
            <div className="mr-4 mt-[3.25rem]">
              <Calendar></Calendar>
            </div>
          </div>
        </div>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}
