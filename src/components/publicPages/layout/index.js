import { Typography, Carousel, Pagination } from "antd";
import { Link } from "react-router-dom";
function Layout(props) {
  const { data, dataCarousel, pagination, setPagination } = props;

  const { rows, count } = data;
  return (
    <div>
      <div>{/* <Typography.Title>Tin tức về ?</Typography.Title> */}</div>
      <div className="max-w-screen-lg mx-auto my-8 ">
        <Carousel arrows autoplay>
          {dataCarousel.rows.slice(0, 3).map((row) => (
            <div key={row.id} className="relative ">
              <Link to={`/news/detail/${row.id}`}>
                <img
                  src={row.thumbnail}
                  alt={row.title}
                  className="w-full h-96 object-cover border rounded-lg"
                />
              </Link>
            </div>
          ))}
        </Carousel>
        <h2 className="text-2xl font-bold mb-4">Tin Tức Mới Nhất</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rows.map((row) => (
            <div
              key={row.id}
              className="border rounded-lg overflow-hidden shadow-lg"
            >
              <Link to={`/news/detail/${row.id}`}>
                <img
                  src={row.thumbnail}
                  alt={row.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{row.title}</h3>
                  <p className="text-gray-600 line-clamp-1">{row.content}</p>
                  <p className="text-gray-400 text-sm">{row.createAt}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="text-center">
        <Pagination
          total={count}
          defaultPageSize={pagination.limit}
          showSizeChanger={true}
          pageSizeOptions={["1", "10", "50"]}
          onChange={(page, pageSize) => {
            setPagination({ ...pagination, page, limit: pageSize });
          }}
        ></Pagination>
      </div>
    </div>
  );
}

export default Layout;
