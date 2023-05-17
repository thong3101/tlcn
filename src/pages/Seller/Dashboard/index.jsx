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
import * as React from "react";
import { Bar } from "react-chartjs-2";
import { numWithCommas } from "../../../constraints/Util";
import "./Dashboard.scss";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const labels = ["January", "February", "March", "April", "May", "June", "July"];
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
export const data = {
  labels,
  datasets: [
    {
      label: "Khách hàng",
      data: [35, 65, 95, 35, 67, 70, 40],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Doanh thu",
      data: [350, 450, 750, 650, 470, 769, 570],
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

function Dashboard() {
  return (
    <Box>
      <Stack spacing={6} pl="2rem" mt="2rem">
        <Typography variant="h6">Danh sách cần làm</Typography>
        <Stack
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
        </Stack>
        <Stack
          direction="row"
          spacing={4}
          divider={<Divider orientation="vertical" flexItem />}
          justifyContent="space-around"
        >
          <Stack className="dashboard__item" direction="row">
            <Stack alignItems="center" justifyContent="center">
              <Typography className="dashboard__title">Sản phẩm bị khóa</Typography>
              <Typography color="#2a2a2a" fontWeight={500}>
                0
              </Typography>
            </Stack>
          </Stack>
          <Stack className="dashboard__item" direction="row">
            <Stack alignItems="center" justifyContent="center">
              <Typography className="dashboard__title">Sản phẩm hết hàng</Typography>
              <Typography color="#2a2a2a" fontWeight={500}>
                0
              </Typography>
            </Stack>
          </Stack>
        </Stack>
        <Divider />
        <Typography variant="h6">Phân tích bán hàng</Typography>
        <Box width="100%" height="100%">
          <Stack alignItems="center" justifyContent="center">
            <Typography sx={{ fontSize: "18px", fontWeight: "500" }}>
              Thống kê doanh thu
            </Typography>
          </Stack>
          <Bar options={options} data={data} />
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
