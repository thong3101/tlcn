import "./Footer.scss";
import { Link } from "react-router-dom";
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";

import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import { toast } from "react-toastify";

const { Stack } = require("@mui/system");


function Header() {

  const currentUser = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const handleMessage = async () => {
    //check whether the group(chats in firestore) exists, if not create
    if(!currentUser) {
      toast.error("Vui lòng đăng nhập để chat");
      return ;
    }
    const combinedId = currentUser.id + "ba8f70b4-ecaa-459b-895a-daceb3c3558d";
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.id), {
          [combinedId + ".userInfo"]: {
            uid: "ba8f70b4-ecaa-459b-895a-daceb3c3558d",
            displayName: "Chatbox",
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", "ba8f70b4-ecaa-459b-895a-daceb3c3558d"), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.id,
            displayName: currentUser.nickName,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
      navigate("/chat");
    } catch (err) {}
  };

  return (
    <header id="footer" className="footer">
      <Stack
        className="footer__container"
        justifyContent="space-between"
        direction="row"
        alignItems="flex-start"
        sx={{
          height: "100%",
          width: "100%",
          maxWidth: "1170px",
          margin: "0 175px",
          paddingTop: "30px",
        }}
      >
        <div style={{ padding: "0px 15px" }} className="footer__item">
          <span className="footer_title">Hỗ trợ khách hàng</span>
          <div className="footer_divier"></div>
          <div>
            <ul style={{ listStyle: "none" }}>
              <li>
                <Link className="footer_content" to={"/"}>
                  Hướng dẫn đặt hàng trực tuyến
                </Link>
              </li>
              <li>
                <Link className="footer_content" to={"/"}>
                  FAQ - Câu hỏi thường gặp
                </Link>
              </li>
              <li>
                <Link className="footer_content" to={"/"}>
                  Hướng dẫn mua đàn guitar cho người mới tập
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div style={{ padding: "0px 15px" }} className="footer__item">
          <span className="footer_title">Danh mục sản phẩm</span>
          <div className="footer_divier"></div>
          <div>
            <ul style={{ listStyle: "none" }}>
              <li>
                <Link className="footer_content" to={"/"}>
                  Đàn Guitar Acoustic
                </Link>
              </li>
              <li>
                <Link className="footer_content" to={"/"}>
                  Đàn Guitar Epiphone DR-100
                </Link>
              </li>
              <li>
                <Link className="footer_content" to={"/"}>
                  Capo Guitar Giá Rẻ
                </Link>
              </li>
              <li>
                <Link className="footer_content" to={"/"}>
                  Dây Đàn Guitar
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div style={{ padding: "0px 15px" }} className="footer__item">
          <span className="footer_title">Kết Nối Với Senki</span>
          <div className="footer_divier"></div>
          <div>
            <ul style={{ listStyle: "none" }}>
              <li>
                <a href="">
                  <FacebookOutlinedIcon
                    sx={{ color: "#fff" }}
                  ></FacebookOutlinedIcon>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div style={{ padding: "0px 15px" }} className="footer__item">
          <span className="footer_title">Địa Chỉ Liên Hệ</span>
          <div className="footer_divier"></div>
          <div>
            <ul style={{ listStyle: "none" }}>
              <li>64/2C, Đường số 11, Tăng Nhơn Phú B, Thành Phố Thủ Đức</li>
              <li>Làm việc kể cả Thứ 7 - Chủ Nhật</li>
              <li>Hotline: 094 548 4310</li>
              <li>
                <div className="seller">
                  <div className="seller__info">
                    <div className="seller__info-item1"> Chatbox</div>
                    <div className="seller__info-item2">
                      <button
                        className="detailProduct__add-to-cart"
                        onClick={handleMessage}
                        style={{
                          fontWeight: 600,
                          textTransform: "uppercase",
                        }}
                      >
                        <ChatOutlinedIcon sx={{ marginRight: "6px" }} />
                        Chat ngay
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </Stack>
    </header>
  );
}

export default Header;
