import Nav from "./Nav";
function Layout({ children }) {
  return (
    <div className="header">
      <Nav />
      <div className="container mx-auto px-4">{children}</div>
    </div>
  );
}

export default Layout;
