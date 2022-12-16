import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import AutoModeIcon from '@mui/icons-material/AutoMode';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import CancelIcon from '@mui/icons-material/Cancel';



export const orderTabs = [
    {
        id: 0,
        type: "Chưa thanh toán",
        slug: "pending",
        icon: AutoModeIcon
    },
    // {
    //     id: 3,
    //     type: "Đang vận chuyển",
    //     icon: RocketLaunchIcon
    // },
    {
        id: 1,
        type: "Chờ lấy hàng",
        slug: "processing",
        icon: AutoModeIcon
    },
   
    {
        id: 2,
        type: "Đang giao",
        slug: "shipping",
        icon: HourglassBottomIcon
    },
    {
        id: 3,
        type: "Hoàn thành",
        slug: "delivered",
        icon: LocalShippingIcon
    },
    {
        id: 4,
        type: "Đã huỷ",
        icon: CancelIcon
    },
]