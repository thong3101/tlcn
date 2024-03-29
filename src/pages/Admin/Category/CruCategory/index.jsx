/* eslint-disable */
import React from "react";
import { useEffect, useState } from "react";
import "./CruCategory.scss";
import apiCategory from "../../../../apis/apiCategory";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";

import {
  Box,
  Typography,
  Stack,
  TextField,
  MenuItem,
  Select,
  FormControl,
  Button,
  InputBase,
  styled,
} from "@mui/material";

function CrudCategory(props) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [parent, setParent] = useState();
  const [listType, setListType] = useState([]);
  const [edit, setEdit] = useState(props.edit);
  const idCate = useParams().id;
  const navigate = useNavigate();


  useEffect(() => {
    const getDataParent = async () => {
      apiCategory.showAllCategoryHeader().then((res) => {
        setListType(res.data.category);
      });
    };
    getDataParent();
  }, []);

  useEffect(() => {
    const loaddata = () => {
      if (edit === true) {
        apiCategory.findCategoryById(idCate).then((res) => {
          const category = res.data.cate;
          if (category) {
            setName(category.name);
            setParent(listType.filter((item)=> item.subCategories.id==idCate))
          } else {
            navigate("/admin/category");
            toast.error("Danh mục này không tồn tại!");
          }
        });
        setId(idCate);
      }
    };
    loaddata();
  }, [edit]);

  console.log("n", name);
  console.log("p", parent);

  

  const handleChangeType = (event) => {
    setParent(event.target.value);
  };
  const handleUpdate = () => {
    const params = {
      name: name,
      parentCateId: parent,
    };
    if (!(name && parent)) {
      toast.warning("Vui lòng nhập đầy đủ thông tin !!");
      return;
    }
    apiCategory
      .updateCategory(params, id)
      .then((res) => {
        toast.success("Cập nhật thành công");
      })
      .catch((error) => {
        toast.error("Cập nhật thất bại!");
      });
  };
  const handleSave = () => {
    const params = {
      name: name,
      parentId: parent||null,
    };
    if (!(name)) {
      toast.warning("Vui lòng nhập đầy đủ thông tin !!");
      return;
    } else {
      apiCategory
        .insertCategory(params)
        .then((res) => {
          toast.success("Thêm danh mục thành công");
          setName("");
          setParent("");
        })
        .catch((error) => {
          toast.error("Thêm danh mục thất bại!");
        });
    }
  };
  return (
    <Box>
      <Stack p={3} justifyContent="center" sx={{ width: "700px" }} spacing={3}>
        <Stack direction="row" p={2}>
          <Typography sx={{ width: "200px" }}>Danh mục cha</Typography>
          <FormControl className="create-address__input" sx={{ flex: 1 }}>
            <Select
              size="small"
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={parent}
              onChange={handleChangeType}
              input={<InputCustom placeholder="Chọn Loại" />}
            >
              {listType.map(
                (item) =>
                  item.name !== name && (
                    <MenuItem value={item.id}>{item.name}</MenuItem>
                  )
              )}
            </Select>
          </FormControl>
        </Stack>
        <Stack direction="row" p={2}>
          <Typography sx={{ width: "200px" }}>Tên danh mục</Typography>
          <TextField
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
            size="small"
            id="outlined-basic"
            variant="outlined"
            sx={{ flex: 1 }}
          />
        </Stack>
        <Stack justifyContent="center" alignItems="center">
          <Button
            onClick={edit ? handleUpdate : handleSave}
            sx={{ width: "30%" }}
            variant="contained"
          >
            {edit ? "Cập nhật" : "Thêm"}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
const InputCustom = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    boxSizing: "border-box",
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    display: "flex",
    height: "40px !important",
    padding: "0px 26px 0px 12px",
    alignItems: "center",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#1890ff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}));

export default CrudCategory;
