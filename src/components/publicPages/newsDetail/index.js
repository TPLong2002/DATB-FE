// import { Image, Typography } from "antd";

// const { Title } = Typography;
// const { TextArea } = Input;

// function News() {
//   return (
//     <div>
//       <div>
//         <Image src="https://tuyensinh.huflis.edu.vn//Uploads/images/HOC%20PHI%202(7).png"></Image>
//       </div>
//       <div>
//         <Title>Tiêu đề</Title>
//       </div>
//       <div>
//         <TextArea rows={20}> </TextArea>
//       </div>
//     </div>
//   );
// }

// export default News;

// src/components/NewsDetail.js
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getNewsById } from "@/services/news";
import { Image, Input } from "antd";
import dayjs from "dayjs";
const format = "DD/MM/YYYY HH:mm";

const NewsDetail = () => {
  const { id } = useParams();
  const [news, setNews] = useState({});

  const fetchNews = async () => {
    try {
      const res = await getNewsById(id);
      setNews(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(news);
  useEffect(() => {
    fetchNews();
  }, [id]);

  if (!news) {
    return <div>News not found</div>;
  }

  return (
    <div className="max-w-screen-lg mx-auto my-8">
      <div className="flex items-center mb-5 justify-between">
        <h2 className="text-3xl font-bold">{news.title}</h2>
        <h3 className="text-gray-400 text-sm ml-4">
          {dayjs(news.createdAt).format(format)}
        </h3>
      </div>

      <Image
        src={news.thumbnail}
        alt={news.title}
        className="mb-4 border rounded-lg shadow-lg"
        width={"100%"}
      />
      <Input.TextArea rows={10} value={news.content} readOnly></Input.TextArea>
    </div>
  );
};

export default NewsDetail;
