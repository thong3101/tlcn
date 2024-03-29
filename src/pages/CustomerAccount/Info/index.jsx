import { useState } from "react";
import ImageUploading from "react-images-uploading";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { loginSuccess } from "../../../slices/authSlice";

import avatar from "../../../assets/img/logo.png";
import "./Info.scss";

import {
  Avatar, Badge, Box, Button, ClickAwayListener, Divider, FormControlLabel, IconButton, ListItemText, MenuItem, Modal, Radio, RadioGroup, Stack, Typography
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import Edit from "@mui/icons-material/Edit";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import WallpaperIcon from "@mui/icons-material/Wallpaper";
import { useSelector } from "react-redux";

import apiProfile from "../../../apis/apiProfile";
import Loading from "../../../components/Loading";

function Info() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [image, setImage] = useState([]);
  const [gender, setGender] = useState(user.gender);
  const [fullname, setFullName] = useState(user.fullName);
  const [nickname, setNickName] = useState(user.nickName);
  const [modalDeleteAvatar, setModalDeleteAvatar] = useState(false);
  const [modalViewAvatar, setModalViewAvatar] = useState(false);
  const [modalNational, setModalNational] = useState(false);
  const [modalUploadAvatar, setModalUploadAvatar] = useState(false);
  const [openAvatar, setOpenAvatar] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [updating, setUpdating] = useState(false);

  const openModalNational = () => setModalNational(true);
  const closeModalNational = () => setModalNational(false);

  const openModalViewAvatar = () => setModalViewAvatar(true);
  const closeModalViewAvatar = () => setModalViewAvatar(false);

  const openModalUploadAvatar = () => setModalUploadAvatar(true);
  const closeModalUploadAvatar = () => setModalUploadAvatar(false);

  const openModalDeleteAvatar = () => setModalDeleteAvatar(true);
  const closeModalDeleteAvatar = () => setModalDeleteAvatar(false);

  const handleClickAvatar = () => {
    setOpenAvatar((prev) => !prev);
  };
  const handleClickAwayAvatar = () => {
    setOpenAvatar(false);
  };
  const onChange = (imageList, addUpdateIndex) => {
    setImage(imageList);
    imageList = null;
  };

  const handleUploadAvatar = () => {
    if (image.length === 0) {
      toast.warning("Vui lòng chọn ảnh");
      return;
    }
    if (uploading) {
      toast.warning(
        "Hình ảnh đang được cập nhật, vui lòng không thao tác quá nhiều lần"
      );
      return;
    }
    setUploading(true);
    let param = { file: image[0].file };
    apiProfile
      .putUploadAvatar(param)
      .then((res) => {
        toast.success("Cập nhật ảnh đại diện thành công");
        getUserProfile();
      })
      .catch((error) => {
        toast.error("Cập nhật ảnh đại diện thất bại");
      })
      .finally((res) => {
        setModalUploadAvatar(false);
        setUploading(false);
      });
  };

  const handleDeleteAvatar = () => {
    let imgDefault = {
      data_url: avatar,
      file: new File([avatar], "avatar", {
        type: "image/png",
      }),
    };

    let param = { file: imgDefault.file };
    apiProfile
      .putUploadAvatar(param)
      .then((res) => {
        toast.success("Xoá ảnh đại diện thành công");
        getUserProfile();
      })
      .catch((error) => {
        toast.error("Xoá ảnh đại diện thất bại");
      });
    setModalDeleteAvatar(false);
  };

  const maxDayofmonth = (month, year) => {
    if (month === 2) {
      if (
        (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
        (year % 100 === 0 && year % 400 === 0)
      ) {
        return 29;
      } else return 28;
    } else if ([4, 6, 9, 11].includes(month)) return 30;
    else return 31;
  };
  const onChangeFullName = (event) => {
    setFullName(event.target.value);
  };
  const onChangeNickName = (event) => {
    setNickName(event.target.value);
  };
  const onChangeGender = (event) => {
    setGender(event.target.value);
  };

  const onSaveChange = () => {
    if (!(fullname && gender && nickname)) {
      toast.warning("Vui lòng nhập đầy đủ thông tin !!");
      return;
    }
    const params = {
      fullName: fullname,
      gender: gender,
      nickName: nickname,
    };
    setUpdating(true);
    apiProfile
      .putChangeInfo(params)
      .then((response) => {
        toast.success("Thay đổi thành công");
        getUserProfile();
      })
      .catch((error) => {
        toast.error("Thay đổi không thành công");
        console.log(error);
      })
      .finally(() => setUpdating(false));
  };
  const getUserProfile = () => {
    apiProfile.getUserProfile().then((res) => {
      let newUser = res.data.user;
      dispatch(loginSuccess({ ...user, ...newUser }));
    });
  };
  return (
    <Stack className="customer-info" spacing={3}>
      <Stack direction="row" spacing={8}>
        <Stack spacing={3}>
          <Typography variant="h6">Thông tin tài khoản</Typography>

          <Stack direction="row" spacing={4}>
            <ClickAwayListener onClickAway={handleClickAwayAvatar}>
              <Box sx={{ position: "relative" }} onClick={handleClickAvatar}>
                <Badge
                  badgeContent={
                    <Edit
                      color="white"
                      className="!h-[10px] !w-[10px] !rounded-full"
                    />
                  }
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  color="primary"
                >
                  <Avatar
                    sx={{
                      width: 110,
                      height: 110,
                      // border: "3px solid aquamarine",
                    }}
                    // width={110}
                    // height={110}
                    alt="avatar"
                    style={{
                      border: "4px solid",
                      borderRadius: "50%",
                    }}
                    className="!border-cyan-200"
                    src={image.length === 0 ? user.img : image[0].data_url}
                  />
                </Badge>
                {openAvatar ? (
                  <Stack className="avatar-control">
                    <Stack autofocusitem={openAvatar.toString()}>
                      <MenuItem onClick={openModalViewAvatar}>
                        <WallpaperIcon sx={{ mr: 2 }} color="disabled" />
                        Xem ảnh đại diện
                      </MenuItem>

                      <MenuItem onClick={openModalUploadAvatar}>
                        <VisibilityOutlinedIcon
                          sx={{ mr: 2 }}
                          color="disabled"
                        />
                        Cập nhật ảnh đại diện
                      </MenuItem>

                      {/* <MenuItem onClick={openModalDeleteAvatar}>
                        <DeleteIcon sx={{ mr: 2 }} color="disabled" />
                        Xóa ảnh đại diện hiện tại
                      </MenuItem> */}
                    </Stack>
                  </Stack>
                ) : null}
              </Box>
            </ClickAwayListener>

            <Stack spacing={3} justifyContent="space-around">
              <Stack
                direction="column"
                spacing={2}
                alignItems="flex-start"
                justifyContent="space-between"
              >
                <label>Họ & tên</label>
                <input
                  id="input-name"
                  placeholder="Thêm họ tên"
                  type="text"
                  value={fullname}
                  onChange={onChangeFullName}
                />
              </Stack>

              <Stack
                direction="column"
                spacing={2}
                alignItems="flex-star"
                justifyContent="space-between"
              >
                <label>Nickname</label>
                <input
                  id="input-nickname"
                  placeholder="Thêm nickname"
                  type="text"
                  value={nickname}
                  onChange={onChangeNickName}
                />
              </Stack>
            </Stack>
          </Stack>

          <Stack direction="row" spacing={5} alignItems="center">
            <label>Giới tính</label>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={gender}
              onChange={onChangeGender}
            >
              <FormControlLabel value="Nam" control={<Radio />} label="Nam" />
              <FormControlLabel value="Nữ" control={<Radio />} label="Nữ" />
            </RadioGroup>
          </Stack>

          <Button
            variant="contained"
            sx={{ width: 200, alignSelf: "center" }}
            onClick={onSaveChange}
          >
            {updating && <Loading color="#fff" />}Lưu thay đổi
          </Button>
        </Stack>

        <Divider orientation="vertical" flexItem />

        <Stack spacing={4}>
          <Typography variant="h6">Số điện thoại và Email</Typography>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack direction="row" spacing={1}>
              <LocalPhoneOutlinedIcon color="disabled" />
              <ListItemText primary="Số điện thoại" secondary={user.phone} />
            </Stack>
            <Link to="/my-account/edit-account/phone">
              <Button size="small" variant="outlined">
                Cập nhật
              </Button>
            </Link>
          </Stack>

          <Stack
            direction="row"
            spacing={15}
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack direction="row" spacing={1}>
              <EmailOutlinedIcon color="disabled" />

              <ListItemText primary="Địa chỉ email" secondary={user.email} />
            </Stack>

            <Link to="/my-account/edit-account/email">
              <Button
                size="small"
                sx={{ minWidth: "auto", whiteSpace: "nowrap" }}
                variant="outlined"
              >
                Cập nhật
              </Button>
            </Link>
          </Stack>

          <Typography>Bảo mật</Typography>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack direction="row" spacing={1}>
              <LockIcon color="disabled" />
              <ListItemText primary="Đổi mật khẩu" />
            </Stack>
            <Link to="/my-account/edit-account/pass">
              <Button size="small" variant="outlined">
                Đổi mật khẩu
              </Button>
            </Link>
          </Stack>
        </Stack>
      </Stack>

      {/* Modal view avatar */}
      <Modal
        sx={{ overflowY: "scroll" }}
        open={modalViewAvatar}
        onClose={closeModalViewAvatar}
        onClick={closeModalViewAvatar}
      >
        <Stack className="modal-info" spacing={2}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h6" component="h2">
              Xem ảnh đại diện
            </Typography>
            <IconButton onClick={closeModalViewAvatar}>
              <CloseIcon />
            </IconButton>
          </Stack>
          <Divider />
          <img
            style={{ width: "24rem", height: "24rem", alignSelf: "center",transform: "translateY(4rem)" }}
            src={user.img}
            alt="ảnh đại diện"
          />
        </Stack>
      </Modal>

      {/* Modal upload avatar */}
      <Modal
        sx={{ overflowY: "scroll" }}
        open={modalUploadAvatar}
        onClose={closeModalUploadAvatar}
      >
        <Stack sx={{ padding: "2rem" }} className="modal-info" spacing={2}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h6" component="h2">
              Cập nhật ảnh đại diện
            </Typography>

            <IconButton onClick={closeModalUploadAvatar}>
              <CloseIcon />
            </IconButton>
          </Stack>

          <Divider />

          <Box>
            <ImageUploading
              value={image}
              onChange={onChange}
              dataURLKey="data_url"
              acceptType={["jpg", "png", "jpeg"]}
            >
              {({
                imageList,
                onImageUpload,
                onImageUpdate,
                onImageRemove,
                isDragging,
                dragProps,
              }) => (
                // write your building UI
                <Box
                  className="upload__image-wrapper "
                  sx={{ display: "flex" }}
                  justifyContent="center"
                  alignItems="center"
                  flexDirection="column"
                >
                  {/* <Button className="!mb-2" startIcon={<CloseIcon className="!bg-white !rounded-full"/>}
                  onClick={closeModalUploadAvatar}
                  size="large"
                  >

                  </Button> */}
                  {imageList.length === 0 ? (
                    <IconButton
                      size="medium"
                      className="!bg-rose-400 !-translate-y-5 !text-white"
                      onClick={closeModalUploadAvatar}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  ) : null}

                  {imageList.length === 0 ? (
                    <Stack
                      className="!bg-white"
                      sx={{
                        width: "50%",
                        height: "25rem",
                        border: "2px dashed black",
                        zIndex: 999,
                        borderRadius: "5px",
                      }}
                      style={isDragging ? { color: "red" } : null}
                      justifyContent="center"
                      alignItems="center"
                      onClick={onImageUpload}
                      {...dragProps}
                    >
                      <Typography
                        flexWrap={{ xs: "wrap", sm: "nowrap" }}
                        sx={{
                          ml: "auto",
                          mr: "auto",
                          color: "black",
                          textAlign: "center",
                        }}
                      >
                        Nhấn để chọn hoặc kéo thả hình ảnh vào khung này.
                      </Typography>
                    </Stack>
                  ) : null}

                  {imageList.map((image, i) => (
                    <Stack
                      key={i}
                      sx={{
                        width: "100%",
                        height: "30rem",
                        borderRadius: "5px",
                      }}
                      spacing={3}
                      className="image-item"
                    >
                      <img
                        style={{
                          width: "25rem",
                          height: "25rem",
                          alignSelf: "center",
                        }}
                        src={image.data_url}
                        alt=""
                      />
                      <Stack
                        direction="row"
                        className="image-item__btn-wrapper"
                        justifyContent="center"
                        spacing={5}
                      >
                        <Button
                          variant="contained"
                          onClick={() => {
                            onImageRemove(0);
                            closeModalUploadAvatar();
                          }}
                          className="!bg-rose-500"
                        >
                          Hủy
                        </Button>
                        <Button
                          variant="contained"
                          onClick={handleUploadAvatar}
                        >
                          {uploading && <Loading color="#fff" />} Lưu thay đổi
                        </Button>
                      </Stack>
                    </Stack>
                  ))}
                </Box>
              )}
            </ImageUploading>
          </Box>
        </Stack>
      </Modal>

      {/* Modal delete avatar */}
      <Modal
        className="!flex !justify-center !items-center  "
        sx={{ overflowY: "scroll" }}
        open={modalDeleteAvatar}
        onClose={closeModalDeleteAvatar}
      >
        <Stack
          className="modal-info !bg-white !h-36 !rounded-md "
          direction="row"
          spacing={2}
          justifyContent="center"
          alignItems="center"
          width="20rem"
        >
         
          <Stack spacing={3}>
            <Stack>
              <Typography sx={{ fontWeight: "bold" }}>
                Bạn có chắc muốn xoá ảnh đại diện ?
              </Typography>
             
            </Stack>

            <Stack direction="row" justifyContent="flex-end" spacing={1}>
              <Button onClick={closeModalDeleteAvatar} variant="outlined">
                Hủy
              </Button>
              <Button onClick={handleDeleteAvatar} variant="contained">
                Xóa bỏ
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Modal>
    </Stack>
  );
}
export default Info;
