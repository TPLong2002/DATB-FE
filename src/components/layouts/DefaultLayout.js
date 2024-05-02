import Nav from "./Nav";
function Layout({ children }) {
  return (
    <div className="header">
      <Nav />
      <div className="flex flex-row">
        <div className="w-1/6"></div>
        <div className="w-4/6 space-y-3 h-full">
          <div className="w-full h-fit border rounded-sm border-gray-400">
            news
          </div>
          {children}
        </div>
        <div className="w-1/6"></div>
      </div>
    </div>
  );
}

export default Layout;
