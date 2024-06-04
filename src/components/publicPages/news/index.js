import React, { useState, useEffect } from "react";
import Layout from "@/components/publicPages/layout";
import { getnews } from "@/services/news";
import { useParams } from "react-router-dom";
const value = { test: 1, tkb: 2, event: 3, introduce: 4, statute: 5, fee: 6 };
function News() {
  const { key } = useParams();
  const [data, setData] = useState({
    rows: [{ key: 1, id: 0 }],
    count: 1,
  });
  const [dataCarousel, setDataCarousel] = useState({
    rows: [{ key: 1, id: 0 }],
    count: 1,
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
  });
  const fetchNews = async () => {
    try {
      const res = await getnews({
        page: pagination.page,
        limit: pagination.limit,
        category_id: value[key],
      });
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchNewsCarousel = async () => {
    try {
      const res = await getnews({ category_id: value[key] });
      setDataCarousel(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchNewsCarousel();
  }, [value[key]]);
  useEffect(() => {
    fetchNews();
  }, [pagination, value[key]]);
  return (
    <div>
      <Layout
        data={data}
        dataCarousel={dataCarousel}
        pagination={pagination}
        setPagination={setPagination}
      ></Layout>
    </div>
  );
}

export default News;
