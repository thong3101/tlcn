import DescriptionIcon from "@mui/icons-material/Description";
import GroupsIcon from "@mui/icons-material/Groups";
import InventoryIcon from "@mui/icons-material/Inventory";
import PaidIcon from "@mui/icons-material/Paid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Grid, Divider } from "@mui/material";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
// import * as React from "react";
import { Bar } from "react-chartjs-2";
import { numWithCommas } from "../../../constraints/Util";
import "./Dashboard.scss";

import apiProductSeller from "../../../apis/apiProductSeller";
import React, { useEffect, useState, useCallback } from "react";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false,
      text: "Biểu đồ doanh thu",
    },
  },
};

function Dashboard() {
  const [statics, setStatics] = useState([]);
  const [year, setYear] = useState();

  useEffect(() => {
    // setLoadingData(true);
    const getData = async () => {
      apiProductSeller
        .getStatics(2023)
        .then((response) => {
          setStatics(response.data);
        })
        .catch(setStatics([]));
      // .finally(() => {
      //   setLoadingData(false);
      // });
    };
    getData();
  }, []);

  console.log("st", statics);

  const total = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const revenue = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  // let year = 2023;
  console.log(year?.$y + "-01");

  statics.map((item) => {
    if (item.dtime.includes(year?.$y + "-01")) {
      total[0] = item.totalOrder;
      revenue[0] = item.revenue;
    }

    if (item.dtime.includes(year?.$y + "-02")) {
      total[1] = item.totalOrder;
      revenue[1] = item.revenue;
    }

    if (item.dtime.includes(year?.$y + "-03")) {
      total[2] = item.totalOrder;
      revenue[2] = item.revenue;
    }

    if (item.dtime.includes(year?.$y + "-04")) {
      total[3] = item.totalOrder;
      revenue[3] = item.revenue;
    }

    if (item.dtime.includes(year?.$y + "-05")) {
      total[4] = item.totalOrder;
      revenue[4] = item.revenue;
    }

    if (item.dtime.includes(year?.$y + "-06")) {
      total[5] = item.totalOrder;
      revenue[5] = item.revenue;
    }

    if (item.dtime.includes(year?.$y + "-07")) {
      total[6] = item.totalOrder;
      revenue[6] = item.revenue;
    }

    if (item.dtime.includes(year?.$y + "-08")) {
      total[7] = item.totalOrder;
      revenue[7] = item.revenue;
    }

    if (item.dtime.includes(year?.$y + "-09")) {
      total[8] = item.totalOrder;
      revenue[8] = item.revenue;
    }

    if (item.dtime.includes(year?.$y + "-10")) {
      total[9] = item.totalOrder;
      revenue[9] = item.revenue;
    }

    if (item.dtime.includes(year?.$y + "-11")) {
      total[10] = item.totalOrder;
      revenue[10] = item.revenue;
    }

    if (item.dtime.includes(year?.$y + "-12")) {
      total[11] = item.totalOrder;
      revenue[11] = item.revenue;
    }
  });
  console.log("22", total);
  console.log("23", revenue);
  const dataTotal = {
    labels,
    datasets: [
      {
        label: "Tổng đơn hàng",
        data: total,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const dataRevenue = {
    labels,
    datasets: [
      {
        label: "Doanh thu",
        data: revenue,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <Box>
      <Stack spacing={6} pl="2rem" mt="2rem">
        {/* <Typography variant="h6">Danh sách cần làm</Typography> */}
        {/* <Stack
          direction="row"
          spacing={4}
          divider={<Divider orientation="vertical" flexItem />}
          justifyContent="space-around"
        >
          {items.map((item) => {
            let iconColor = item.iconColor;
            return (
              <Stack className="dashboard__item" key={item.id} direction="row">
                <Stack alignItems="center" justifyContent="center">
                  <Typography className="dashboard__title">
                    {item.title}
                  </Typography>
                  <Typography color="#2a2a2a" fontWeight={500}>
                    {`${numWithCommas(item.value)}`}
                  </Typography>
                </Stack>
              </Stack>
            );
          })}
        </Stack> */}
        {/* <Stack
          direction="row"
          spacing={4}
          divider={<Divider orientation="vertical" flexItem />}
          justifyContent="space-around"
        >
          <Stack className="dashboard__item" direction="row">
            <Stack alignItems="center" justifyContent="center">
              <Typography className="dashboard__title">
                Sản phẩm bị khóa
              </Typography>
              <Typography color="#2a2a2a" fontWeight={500}>
                0
              </Typography>
            </Stack>
          </Stack>
          <Stack className="dashboard__item" direction="row">
            <Stack alignItems="center" justifyContent="center">
              <Typography className="dashboard__title">
                Sản phẩm hết hàng
              </Typography>
              <Typography color="#2a2a2a" fontWeight={500}>
                0
              </Typography>
            </Stack>
          </Stack>
        </Stack> */}
        {/* <Divider /> */}
        <Typography variant="h6">Phân tích bán hàng</Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              label={'"year"'}
              views={["year"]}
              value={year}
              onChange={(newValue) => setYear(newValue)}
            />
          </DemoContainer>
        </LocalizationProvider>
        <Box width="100%" height="100%">
          <Stack alignItems="center" justifyContent="center">
            <Typography sx={{ fontSize: "18px", fontWeight: "500" }}>
              Thống kê trong 1 năm
            </Typography>
          </Stack>
          <Bar options={options} data={dataTotal} />
          <Bar options={options} data={dataRevenue} />
        </Box>
      </Stack>
    </Box>
  );
}

const items = [
  {
    id: 1,
    title: "Chờ xác nhận",
    value: "0",
    icon: GroupsIcon,
    iconColor: "#22ad56",
    bgcolor: "#b9ffd3",
  },
  {
    id: 2,
    title: "Chờ lấy hàng",
    value: "0",
    icon: InventoryIcon,
    iconColor: "#1d5aab",
    bgcolor: "#adcbf3",
  },
  {
    id: 1,
    title: "Đã xử lý",
    value: "0",
    icon: DescriptionIcon,
    iconColor: "#ff8b07",
    bgcolor: "#fde1c3",
  },
  {
    id: 1,
    title: "Đơn hủy",
    value: "0",
    icon: PaidIcon,
    iconColor: "#de2222",
    bgcolor: "#f9baba",
  },
];

export default Dashboard;
