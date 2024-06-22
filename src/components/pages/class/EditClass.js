import React, { useEffect, useState, useRef } from "react";
import { getClassById, updateClass } from "@/services/class";
import { UploadOutlined } from "@ant-design/icons";
import Papa from "papaparse";
import { Modal, Input, Select, Button } from "antd";
import { getAllGrade } from "@/services/grade";
import { getAllSchoolyear } from "@/services/schoolyear";
import { getTeachersWithoutGVCN } from "@/services/user";

const App = (props) => {
  const { fetchData, class_id, openEdit, setOpenEdit } = props;
  const [_class, setClass] = useState();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState(
    "Bạn có chắc muốn tạo lớp này không ?"
  );
  const [grade, setGrade] = useState([]);
  const [selectGrade, setSelectGrade] = useState();
  const [allSchoolyear, setAllSchoolyear] = useState([{}]);
  const [selectSchoolyear, setSelectSchoolyear] = useState();
  const [allteachers, setAllTeachers] = useState();

  // const [importedFile, setImportedFile] = useState(null);
  const fileInputRef = useRef(null); // Use useRef to create a ref
  const fetchClass = async () => {
    console.log("class_id", class_id);
    const res = await getClassById(class_id);
    setClass(res.data);
    // setAllTeachers(res.data.GVCN.Profile)
  };
  const fetchGrade = async () => {
    const res = await getAllGrade();
    setGrade([{ id: null, name: "Tất cả" }, ...res.data]);
  };
  const fetchSchoolyear = async () => {
    const res_schoolyear = await getAllSchoolyear();
    setAllSchoolyear(res_schoolyear.data);
  };
  const fetchteachers = async () => {
    const res = await getTeachersWithoutGVCN();
    setAllTeachers(res.data);
  };

  useEffect(() => {
    if (class_id)
      Promise.all([
        fetchClass(),
        fetchGrade(),
        fetchSchoolyear(),
        fetchteachers(),
      ]);
  }, [class_id]);
  const handleOk = async () => {
    const create = await updateClass(_class);
    if (+create.code === 0) {
      setModalText(create.message);
      setConfirmLoading(true);
      setTimeout(async () => {
        fetchData().then(() => {
          setOpenEdit(false);
          setConfirmLoading(false);
        });
      }, 1000);
    }
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;

    setClass({ ..._class, [name]: value });
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpenEdit(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    // Event listener on reader when the file
    // loads, we parse it and set the data.
    reader.onload = async ({ target }) => {
      console.log("File loaded successfully");
      const csv = Papa.parse(target.result, {
        header: true,
      });
      const parsedData = csv?.data;

      setClass(parsedData);
    };
    reader.readAsText(file);
  };

  const onSearch = (value) => {
    console.log("search:", value);
  };
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  const onSelectGradeChange = (value) => {
    setClass({ ..._class, grade_id: value });
    setSelectGrade(value);
  };
  const onSchoolyearChange = (value) => {
    setClass({ ..._class, schoolyear_id: value });
    setSelectSchoolyear(value);
  };
  const onGVCNChange = (value) => {
    setClass({ ..._class, gvcn_id: value });
  };
  return (
    <>
      <Modal
        title="Tạo lớp học"
        open={openEdit}
        onCancel={handleCancel}
        footer={[
          <input
            key="file"
            type="file"
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            style={{ display: "none" }}
            onChange={handleFileChange}
            ref={fileInputRef} // Assign the ref to the file input
          />,
          <Button
            key="import"
            onClick={() => fileInputRef.current.click()} // Trigger click event of the file input when "Import" button is clicked
            icon={<UploadOutlined />}
          >
            Import
          </Button>,
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleOk}
            loading={confirmLoading}
          >
            Submit
          </Button>,
        ]}
        width={400}
      >
        {confirmLoading ? (
          <p>{modalText}</p>
        ) : (
          _class && (
            <div className="space-y-3">
              <div className="flex flex-col space-y-1">
                <p className="font-medium">Tên lớp</p>
                <Input
                  placeholder="Tên lớp"
                  name="name"
                  value={_class.name}
                  onChange={(e) => handleChange(e)}
                ></Input>
              </div>
              <div className="flex flex-col space-y-1">
                <p className="font-medium">Tên giáo viên chủ nhiệm</p>
                <Select
                  showSearch
                  placeholder="Chọn giáo viên chủ nhiệm"
                  optionFilterProp="children"
                  value={+_class.gvcn_id}
                  onChange={(value) => onGVCNChange(value)}
                  onSearch={onSearch}
                  filterOption={filterOption}
                  options={[
                    {
                      value: _class.GVCN.id,
                      label:
                        _class.GVCN.Profile.firstName +
                        " " +
                        _class.GVCN.Profile.lastName,
                    },
                    ...(allteachers?.map((item) => ({
                      value: item.id,
                      label:
                        item.Profile.firstName + " " + item.Profile.lastName,
                    })) || []),
                  ]}
                  className="w-full"
                />
              </div>

              <div className="flex space-x-2">
                <div className="w-1/2 flex flex-col space-y-1">
                  <p className="font-medium">Khối lớp</p>
                  <Select
                    showSearch
                    placeholder="Chọn khối"
                    optionFilterProp="children"
                    value={_class.grade_id}
                    onChange={(value) => onSelectGradeChange(value)}
                    onSearch={onSearch}
                    filterOption={filterOption}
                    options={grade?.map((item) => ({
                      value: item.id,
                      label: item.name,
                    }))}
                    className="w-full"
                  />
                </div>
                <div className="w-1/2 flex flex-col space-y-1">
                  <p className="font-medium">Năm học</p>
                  <Select
                    showSearch
                    placeholder="Chọn năm học"
                    value={_class.schoolyear_id}
                    optionFilterProp="children"
                    onChange={(value) => onSchoolyearChange(value)}
                    onSearch={onSearch}
                    filterOption={filterOption}
                    options={allSchoolyear?.map((item) => ({
                      value: item.id,
                      label: item.name,
                    }))}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          )
        )}
      </Modal>
    </>
  );
};

export default App;
