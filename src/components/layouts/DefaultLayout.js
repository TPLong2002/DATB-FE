import { Fragment, useEffect, useState } from "react";

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
  NotificationOutlined,
} from "@ant-design/icons";

import Marquee from "react-fast-marquee";

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
  getItem("Người dùng", "/user", <UserOutlined />),
  getItem("Lớp học", "/class", <TableOutlined />),
  getItem("Môn học", "/subject", <BookOutlined />),
  getItem("Khoảng phí", "/fee", <TransactionOutlined />),
  getItem("Điểm", "/mark", <FileTextOutlined />),
  getItem("Bài tập", "/assignment", <ReadOutlined />),
  getItem("Vai trò", "/role", <UserSwitchOutlined />),
  getItem("Tin tức", "/admin/news", <NotificationOutlined />),
];
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
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{
          position: "fixed", // Fix the position of the sidebar
          height: "100vh", // Make sure it covers the full height of the viewport
          overflowY: "auto", // Enable vertical scrolling
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
          theme="dark"
          defaultSelectedKeys={[`${location.pathname}`]}
          mode="inline"
          items={items}
          onClick={(e) => navigate(e.key)}
        />
      </Sider>
      <Layout style={{ marginLeft: collapsed ? 80 : 200 }}>
        <Header style={{ padding: 0, background: colorBgContainer }}>
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
        <Content style={{ margin: "0 16px" }}>
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
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}
