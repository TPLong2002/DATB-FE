import { useState } from "react";

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
} from "@ant-design/icons";

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

const items = [
  getItem("Bài tập", "/student/assignment", <TableOutlined />),
  getItem("Điểm", "/student/mark", <FileTextOutlined />),
];

export default function Example({ children }) {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

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

  const dropdownItems = [
    {
      label: "Profile",
      key: `/user/profile/${auth.id}`,
      icon: <UserOutlined />,
    },
    {
      label: "Logout",
      key: "/logout",
      icon: <LogoutOutlined />,
    },
    {
      label: "Dashboard",
      key: "/user",
      icon: <MenuUnfoldOutlined />,
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
  const breadcrumbItems = pathSnippets.map((snippet, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
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
            {auth.isAuth ? (
              <div className="flex flex-col items-end space-x-2">
                <Dropdown overlay={menu} placement="bottomRight">
                  <Button icon={<UserOutlined />}></Button>
                </Dropdown>
                <div className="text-xs">Welcome {auth.name}</div>
              </div>
            ) : (
              <Link to="/login">Login</Link>
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
