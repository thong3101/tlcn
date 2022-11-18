import React from "react";
import "./CardProduct.scss";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { numWithCommas, roundPrice } from "../../constraints/Util";


function CardProduct({ data }) {
  return (
    <Box>
      <Link
        className="card__wrap"
        to={`/product-detail/${data?.id}`}
        style={{
          width: "270px",
        }}
      >
        <Card className="card" sx={{ boxShadow: "none" }}>
          {/* {data.discount ? (<div className="card__discount">
            <div className="card__discount_badge">
              <div
                style={{
                  width: "36px",
                  height: "30px",
                  background: "#F4BA36",
                  padding: "2px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span>{data.discount}</span>
              </div>
            </div>
          </div>):(<></>)} */}
          <CardMedia
            component="img"
            width="270px"
            height="270px"
            image={data?.imageList[0]?.url}
            //   sx={{ position: "absolute" }}
          />
          <CardContent className="card__content">
            {/* <Typography className="card__price" color={`${data?.discount!==0 ? "#ff0000" : "#000000"}`} variant="h5" component="div">
                    {
                        data?.discount!==0 ?
                        <>{numWithCommas(Math.round(data?.price*(1-0.01*data.discount)))} ₫ <Box className="card__sale">{data?.discount}%</Box>
                        </>
                        :
                        <>{numWithCommas(data?.price)} ₫ </>
                    } 
                    </Typography> */}
            <Typography>{data?.name}</Typography>
            {/* <Typography>{numWithCommas(data?.price)} đ</Typography> */}
            <Typography>{data?.price} đ</Typography>
          </CardContent>
        </Card>
      </Link>
    </Box>
  );
}

export default CardProduct;
