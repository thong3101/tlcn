import { Button, Modal, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import apiProfile from "../../../apis/apiProfile";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { toast } from "react-toastify";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SearchIcon from "@mui/icons-material/Search";

import {
  formatJavaLocalDateTime
} from "../../../constraints/Util";

function User() {

  const [users, setUsers] = useState([]);

  const [query, setQuery] = useState("");

  const [itemdelete, setItemdelete] = React.useState(null);
  const [modalDelete, setModalDelete] = React.useState(false);
  const openModalDelete = (itemdelete) => {
    setItemdelete(itemdelete)
    console.log(itemdelete)
    setModalDelete(true)
  }
  const closeModalDelete = () => {
    setModalDelete(false)
  }

  useEffect(() => {
    const getData = async () => {
      apiProfile
        .getAllUser()
        .then((res) => {
          setUsers(res.data.users);
        })
        .catch((error) => {
          toast.error("không có user");
          // setUsers(data)
        });
    };
    getData();
  }, []);

  const handleDeleteUser = () => {
    const user = users.filter(item => {
      return itemdelete.id !== item.id
    }
    )
    setUsers(user);
    closeModalDelete();
    apiProfile.deleteUser(itemdelete.id)
      .then(res => {
        toast.success("Xóa thành công")
      })
      .catch(error => {
        toast.error("Xóa không thành công!")
      })
  }

  

  return (
    <Stack direction="row" sx={{ backgroundColor: "#fff" }} p={3}>
      <Stack spacing={2}>
        <Stack direction="row" justifyContent="space-between">
          <Typography>Danh sách người dùng</Typography>
        </Stack>

        <Stack direction="row" justifyContent="flex-end"></Stack>

        <Stack direction="row" sx={{ width: "100%", position: "relative" }}>
          <TextField
            id="outlined-basic"
            placeholder="Tìm theo tên hoặc email"
            variant="outlined"
            sx={{ width: "100%" }}
            onChange={(event) => setQuery(event.target.value)}
          />
          <span className="brand__iconSearch">
            <SearchIcon sx={{ fontSize: "28px" }} />
          </span>
        </Stack>

        <Table
          className="tableBrand"
          sx={{ minWidth: "50rem" }}
          stickyHeader
          size="small"
        >
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ width: "20%", top: "64px" }}>
                ID
              </TableCell>
              <TableCell align="center" sx={{ width: "20%", top: "64px" }}>
                Tên khách hàng
              </TableCell>
              <TableCell align="center" sx={{ width: "20%", top: "64px" }}>
                Ngày đăng ký
              </TableCell>
              <TableCell align="center" sx={{ width: "20%", top: "64px" }}>
                Email
              </TableCell>
              <TableCell align="center" sx={{ width: "20%", top: "64px" }}>
                Thao tác
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users
              ?.filter(
                (user) =>
                  user.fullName?.toLowerCase().includes(query.toLowerCase()) ||
                  user.email?.toLowerCase().includes(query.toLowerCase())
              )
              .map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{item?.id}</TableCell>

                  <TableCell align="center">{item?.fullName}</TableCell>

                  <TableCell align="center">
                    {formatJavaLocalDateTime(item?.createAt)}
                  </TableCell>

                  <TableCell align="center">
                    <Typography>{item?.email}</Typography>
                  </TableCell>

                  <TableCell align="center">
                    <Stack spacing={1} justifyContent="center" py={1}>
                      {/* <Link to={`/admin/user/detail/${item.id}`}>
                      <Button variant="contained">Xem</Button>
                    </Link> */}
                      <Button
                        onClick={() => openModalDelete(item)}
                        variant="outlined"
                        color="error"
                      >
                        Xóa
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Stack>

      <Modal
        sx={{ overflowY: "scroll" }}
        open={modalDelete}
        onClose={closeModalDelete}
        className="!flex !justify-center !items-center "
      >
        <Stack
          className="modal-info  !bg-white !h-36 !rounded-md"
          direction="row"
          spacing={2}
          justifyContent="center"
          width="24rem"
        >
          <Stack className="!mt-5">
            <InfoOutlinedIcon color="primary" />
          </Stack>

          <Stack spacing={3}>
            <Stack className="!mt-5">
              <Typography sx={{ fontWeight: "bold" }}>
                Bạn có chắc muốn xoá người dùng này?
              </Typography>
            
            </Stack>

            <Stack direction="row" justifyContent="flex-end" spacing={1}>
              <Button onClick={closeModalDelete} variant="outlined">
                Hủy
              </Button>
              <Button variant="contained" onClick={handleDeleteUser} >Xóa bỏ</Button>
            </Stack>
          </Stack>
        </Stack>
      </Modal>
    </Stack>
  );
}

export default User;
