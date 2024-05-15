import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFeeById } from "@/services/fee";
import dayjs from "dayjs";
import { DatePicker, Input } from "antd";
const format = "DD/MM/YYYY";

function DetailFee() {
  const { id } = useParams();
  const [fee, setFee] = useState({});
  const fetchFee = async () => {
    const res = await getFeeById(id);
    if (+res.code === 0) {
      setFee(res.data);
    }
  };
  useEffect(() => {
    fetchFee();
  }, [id]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFee = { ...fee, [name]: value };
    setFee(newFee);
  };
  const onChange = (date, dateString, e) => {
    const { name } = e.target;
    const newFee = { ...fee, [name]: dateString };
    setFee(newFee);
  };
  return (
    <div>
      {fee && (
        <div>
          <div>
            <Input value={fee.name} name="name" onChange={handleChange}></Input>
            <Input
              value={fee.price}
              name="price"
              onChange={handleChange}
            ></Input>
          </div>
          <div>
            {fee.startDate && (
              <DatePicker
                defaultValue={dayjs(fee.startDate)}
                format={format}
                name="startDate"
                onChange={(date, dateString, e) =>
                  onChange(date, dateString, e)
                }
              />
            )}
            {fee.endDate && (
              <DatePicker
                defaultValue={dayjs(fee.endDate)}
                format={format}
                name="endDate"
                onChange={(date, dateString, e) =>
                  onChange(date, dateString, e)
                }
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default DetailFee;
