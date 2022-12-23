import { useState, memo } from "react";
import { useTheme } from "@mui/material/styles";
import { Box, Tabs, Tab, Typography, Pagination, Stack } from "@mui/material";
import "./Orders.scss";
import SearchIcon from "@mui/icons-material/Search";
import OrderItem from "../../../components/OrderItem/index.jsx";
import { orderTabs } from "../../../constraints/OrderItem";
import { useEffect } from "react";
import apiCart from "../../../apis/apiCart";
import { useSelector } from "react-redux";
import LoadingPage from "../../../components/LoadingPage";

import {
  formatJavaLocalDateTime,
  convertDate,
} from "../../../constraints/Util";

function Orders() {
  const [orders, setOrders] = useState([]);
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(5);
  const user = useSelector((state) => state.auth.user);

  const [loadingData, setLoadingData] = useState(false);

  const size = 6;
  useEffect(() => {
    // let params = {
    //   page: page,
    //   size: size,
    // };
    setLoadingData(true);
    const getData = async () => {
      apiCart
        .getOrders()
        .then((response) => {
          setOrders(
            response.data.orders.sort((a, b) => {
              return convertDate(b?.createdAt) - convertDate(a?.createdAt);
            })
          );
          setTotalPage(Math.round(response.data.orders.length / size));
        })
        .catch(setOrders([]))
        .finally(() => {
          setLoadingData(false);
        });
    };
    getData();
  }, [page, user]);

  console.log("222", totalPage);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangePage = (event, newValue) => {
    console.log(newValue);
    setPage(newValue);
  };

  const lastPostIndex = page * size;
  const firstPostIndex = lastPostIndex - size;

  return (
    <>
      <Typography variant="h6">Đơn hàng của tôi</Typography>
      <Box className="myorder" sx={{ width: "100%" }}>
        <Box className="myorder__tabs">
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="primary"
            indicatorColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            {orderTabs.map((item) => (
              <Tab
                key={item.id}
                label={item.type}
                sx={{
                  fontSize: "12px",
                  textTransform: "none",
                  fontWeight: "400",
                }}
                {...a11yProps(item.id)}
              />
            ))}
          </Tabs>
        </Box>

        {loadingData ? (
          <LoadingPage />
        ) : (
          <Box>
            {orderTabs.map((item) => {
              const tmp = getOrderByType(orders, item.slug);
              if (tmp.length === 0)
                return (
                  <TabPanel
                    key={item.id}
                    value={value}
                    index={item.id}
                    dir={theme.direction}
                  >
                    <Box className="myorder__none">
                      <img
                        height="200px"
                        width="200px"
                        src="https://frontend.tikicdn.com/_desktop-next/static/img/account/empty-order.png"
                        alt=""
                      />
                      <Typography>Chưa có đơn hàng</Typography>
                    </Box>
                  </TabPanel>
                );
              else
                return (
                  <TabPanel
                    key={item.id}
                    value={value}
                    index={item.id}
                    dir={theme.direction}
                  >
                    {tmp.slice(firstPostIndex, lastPostIndex).map((item) => (
                      <OrderItem key={item.id} order={item} />
                    ))}

                    {totalPage > 1 ? (
                      <Stack spacing={2}>
                        <Pagination
                          sx={{ justifyContent: "center" }}
                          count={totalPage}
                          page={page}
                          onChange={handleChangePage}
                        />
                      </Stack>
                    ) : (
                      <></>
                    )}
                  </TabPanel>
                );
            })}
          </Box>
        )}
      </Box>
    </>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

const getOrderByType = (orders, slug) =>
  orders.filter((item) => item.status === slug);

export default memo(Orders);
