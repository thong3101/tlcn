/* eslint-disable */
import {
  Box,
  Button,
  InputBase,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import apiAddress from "../../../../apis/apiAddress";
import apiProfile from "../../../../apis/apiProfile";
import SelectBoxAddress from "../../../../components/SelectBoxAddress";
import "./CreateAddress.scss";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { loginSuccess } from "../../../../slices/authSlice";

import { useForm } from "react-hook-form";

import { toast } from "react-toastify";

function CreateAddress(props) {
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [phone, setPhone] = useState("");
  const [addressDetail, setAddressDetail] = useState("");

  const [edit, setEdit] = useState(props.edit);
  const [province, setProvince] = React.useState("");
  const [district, setDistrict] = React.useState("");
  const [commune, setCommune] = React.useState("");
  const navigate = useNavigate();
  const params = useParams();

  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [address, setAddress] = useState(user.address);

  const [message, setMessage] = React.useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const loaddata = () => {
      if (edit === true) {
        if (address) {
          setFullName(address.fullName);
          setCompanyName(address.companyName);
          setPhone(address.phoneNumber);
          setAddressDetail(address.addressDetail);
          setCommune(address.commune.id);
          setDistrict(address.district.id);
          setProvince(address.province.id);
        } else {
          navigate("/my-account/address/create");
          toast.error("Địa chỉ này không tồn tại!");
        }
      }
    };
    loaddata();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [edit]);

  const handleChangeProvince = (value) => {
    setProvince(value);
  };

  const handleChangeDistrict = (value) => {
    setDistrict(value);
  };

  const handleChangeCommune = (value) => {
    setCommune(value);
  };
  const handleSave = () => {
    //Check phone if contain alphabet
    if (phone.match(/[a-z]/i)) {
      toast.error("Số điện thoại không được chứa chữ cái!");
      return;
    }
    const params = {
      addressDetail: addressDetail,
      // addressType: Number(addressType),
      commune: commune,
      companyName: companyName,
      district: district,
      fullName: fullName,
      phone: phone,
      province: province,
    };
    if (
      !(
        addressDetail &&
        // addressType &&
        commune &&
        // companyName &&
        district &&
        fullName &&
        phone &&
        province
      )
    ) {
      toast.warning("Vui lòng nhập đầy đủ thông tin !!");
      return;
    } else {
      apiAddress
        .saveAddress(params)
        .then((res) => {
          toast.success("Thêm địa chỉ thành công");
          getUserProfile();

          setFullName("");
          setCompanyName("");
          setPhone("");
          setAddressDetail("");
          // setAddressType(1);
          setCommune("");
          setDistrict("");
          setProvince("");
        })
        .catch((error) => {
          toast.error("Thêm địa chỉ thất bại!");
        });
    }
  };

  const handleUpdate = () => {
    if (phone.match(/[a-z]/i)) {
      toast.error("Số điện thoại không được chứa chữ cái!");
      return;
    }
    const params = {
      addressDetail: addressDetail,
      // addressType: Number(addressType),
      commune: commune,
      companyName: companyName,
      district: district,
      fullName: fullName,
      phone: phone,
      province: province,
    };

    console.log(params);
    if (
      !(
        addressDetail &&
        // addressType &&
        commune &&
        // companyName &&
        district &&
        fullName &&
        phone &&
        province
      )
    ) {
      toast.warning("Vui lòng nhập đầy đủ thông tin !!");
      return;
    }
    apiAddress
      .saveAddress(params)
      .then((res) => {
        toast.success("Cập nhật thành công");
        getUserProfile();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Cập nhật thất bại!");
      });
  };
  const getUserProfile = () => {
    apiProfile.getUserProfile().then((res) => {
      let newUser = res.data.user;
      dispatch(loginSuccess({ ...user, ...newUser }));
    });
  };

  const onChangePhone = (event) => {
    setPhone(event.target.value);
    const regex = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;
    if (regex.test(event.target.value)) {
      setMessage("");
    } else {
      setMessage("*Số điện thoại không hợp lệ");
    }
  };

  return (
    <Box className="create-address" p={2} m={2}>
      <Typography variant="h6">Địa chỉ nhận hàng</Typography>

      <Stack p="2rem" spacing={1.875} width="80%">
        <SelectBoxAddress
          province={province}
          district={district}
          commune={commune}
          onChangeProvince={handleChangeProvince}
          onChangeDistrict={handleChangeDistrict}
          onChangeCommune={handleChangeCommune}
        />

        <Stack direction="row">
          <Typography className="create-address__label">
            Tên người nhận:
          </Typography>
          <Stack className="create-address__input">
            <InputCustom
              value={fullName}
              onChange={(event) => {
                setFullName(event.target.value);
              }}
              placeholder="Nhập họ và tên"
              size="small"
            ></InputCustom>
          </Stack>
        </Stack>

        <Stack direction="row">
          <Typography className="create-address__label ">
            Số nhà, tên đường
          </Typography>
          <Stack className="create-address__input">
            <TextField
              value={addressDetail}
              onChange={(event) => {
                setAddressDetail(event.target.value);
              }}
              multiline
              rows={4}
              placeholder="Nhập địa chỉ"
            ></TextField>
          </Stack>
        </Stack>

        {/* <Stack direction="row">
          <Typography className="create-address__label">
            Số điện thoại nhận hàng:
          </Typography>
          <Stack className="create-address__input">
            <InputCustom
              value={phone}
              onChange={onChangePhone}
              size="small"
              placeholder="Nhập số điện thoại"
            >
              <Box height="25px">
                <Typography color={"#ee0033"} fontSize="14px">
                  {message}
                </Typography>
              </Box>
            </InputCustom>
          </Stack>
        </Stack> */}

        <Stack direction="row">
          <Typography className="create-address__label">
            Số điện thoại nhận hàng:
          </Typography>
          <Stack className="create-address__input">
            <InputCustom
              placeholder="Nhập số điện thoại"
              value={phone}
              onChange={onChangePhone}
            />
          </Stack>
        </Stack>
        <Box height="25px">
          <Typography color={"#ee0033"} fontSize="14px">
            {message}
          </Typography>
        </Box>

        <Stack
          direction="row"
          justifyContent="flex-start"
          className="!flex !justify-center"
        >
          {/* <Typography className="create-address__label"></Typography> */}
          <Button
            onClick={edit ? handleUpdate : handleSave}
            className="btn__Update"
            variant="contained"
          >
            Lưu địa chỉ
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

export default CreateAddress;
