import {
  Box,
  Button,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import React from "react";
import apiProduct from "../../../../apis/apiProduct";
import apiProductSeller from "../../../../apis/apiProductSeller";
import "./SettingProduct.scss";

import { toast } from "react-toastify";
import apiSeller from "../../../../apis/apiSeller";

function SettingProduct() {
  const [price, setPrice] = React.useState("");
  const [products, setProducts] = React.useState();
  const [page, setPage] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(10);

  const [searchText, setSearchText] = React.useState("");


  const size = 4;
  const handleChangePrice = (event) => {
    setPrice(event.target.value);
  };


  const handleEnable = async (productId) => {
    apiSeller
      .EnableProduct(productId)
      .then((res) => {
        // navigate("/admin/product");
        toast.success("Kích hoạt sản phẩm thành công");
        window.location.reload();
      })
      .catch((error) => {
        toast.error("Kích hoạt sản phẩm thất bại");
        window.location.reload();
      });
  };

  const handleDisable = async (productId) => {
    apiSeller
      .DisableProduct(productId)
      .then((res) => {
        // navigate("/admin/product");
        toast.success("Kích hoạt sản phẩm thành công");
      })
      .catch((error) => {
        toast.error("Kích hoạt sản phẩm thất bại");
      });
  };

  React.useEffect(() => {
    const getData = async () => {
      let param = {
        size: "100",
        sort: "",
      };

      switch (price) {
        case 1: {
          param = { ...param, sort: "price_asc" };
          break;
        }
        case 2: {
          param = { ...param, sort: "price_desc" };
          break;
        }
        default: {
          break;
        }
      }

      if (searchText == "") {
        apiProductSeller
          .getSellerProduct(param)
          .then((res) => {
            setProducts(res.data.list);
            setTotalPage(Math.ceil(res.data.list.length / size));
          })
          .catch((error) => {
            setProducts(null);
          });
      } else {
        apiProductSeller
          .getSellerProduct(param, searchText)
          .then((res) => {
            setProducts(res.data.list);
            setTotalPage(Math.ceil(res.data.list.length / size));
          })
          .catch((error) => {
            setProducts(null);
          });
      }

      console.log("pp", param);
    };
    getData();
  }, [price, searchText]);

  const lastPostIndex = page * size;
  const firstPostIndex = lastPostIndex - size;

  const handleChangePage = (event, newValue) => {
    setPage(newValue);
  };

  const [itemdelete, setItemdelete] = React.useState(null);
  const [modalDelete, setModalDelete] = React.useState(false);
  const openModalDelete = (itemdelete) => {
    setItemdelete(itemdelete);
    console.log(itemdelete);
    setModalDelete(true);
  };
  const closeModalDelete = () => {
    setModalDelete(false);
  };

  const handleDeleteProduct = () => {
    const product = products.filter((item) => {
      return itemdelete.id !== item.id;
    });
    setProducts(product);
    closeModalDelete();
    apiProduct
      .deleteProduct(itemdelete.id)
      .then((res) => {
        toast.success("Xóa thành công");
      })
      .catch((error) => {
        toast.error("Xóa không thành công!");
      });
  };

  return (
    <>
      <Box className="productAdmin">
        <Box sx={{ backgroundColor: "#fff" }} p={2}>
          <Typography
            sx={{ fontSize: "20px", fontWeight: "bold", paddingBottom: "20px" }}
          >
            Cài đặt sản phẩm
          </Typography>
          <Table
            className="productTable"
            sx={{ minWidth: 650 }}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Tên sản phẩm</TableCell>
                <TableCell>Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products?.length >= 1 ? (
                products.slice(firstPostIndex, lastPostIndex).map((item) => (
                  <TableRow
                    key={item.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>
                      <Stack>
                        <Typography>{item?.id}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Stack>
                        <Typography sx={{ color: "#1890ff" }}>
                          {item?.name}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell align="center">
                      <Stack direction="row" spacing={1} alignItems="center">
                        {/* <Switch
                          checked={item?.status ? true : false}
                          onChange={(e) => {
                            setChecked(e.target.checked);
                          }}
                          inputProps={{ "aria-label": "controlled" }}
                        />
                        <Typography>Kích hoạt</Typography> */}
                        {item?.status ? (
                          <>
                            <Button
                              sx={{ width: "100px" }}
                              variant="outlined"
                              onClick={() => {
                                handleDisable(item?.id);
                              }}
                            >
                              Hủy
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              variant="outlined"
                              sx={{ width: "100px" }}
                              onClick={() => {
                                handleEnable(item?.id);
                              }}
                            >
                              Kích hoạt
                            </Button>
                          </>
                        )}
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <></>
              )}
            </TableBody>
          </Table>
          {totalPage >= 1 ? (
            <Stack spacing={2} mt="10px">
              <Pagination
                count={totalPage}
                page={page}
                defaultPage={1}
                onChange={handleChangePage}
                color="primary"
              />
            </Stack>
          ) : (
            <></>
          )}
        </Box>
      </Box>
    </>
  );
}

export default SettingProduct;
